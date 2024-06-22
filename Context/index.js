import React, {useState,useEffect,useContext,createContext} from "react";
import {ethers} from "ethers";
import Web3Modal from "web3modal";

import {
    CheckIfWalletConnected,
    connectWallet,
    connectingWithContract,
    getBalance,
    connectingNativeTokenContract
} from "../Utils/index";
import { ERC20Generator_ABI,ERC20Generator_BYTECODE } from "./constants";



const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const [address,setAddress] = useState("");
    const [getAllTokenListed, setGetAllTokenListed] = useState([]);
    const [getUserTokens,setGetUserTokens] = useState([]);
    const [getAllDonation,setGetAllDonation] = useState([]);
    const [fee,setFee] = useState();
    const [balance, setBalance] = useState();
    const [mainBalance, setMainBalance] = useState();
    const [nativeTokens, setNativeTokens] = useState();


    const fetchInitialData = async () => {
        try {
            const account = await CheckIfWalletConnected();
            const balance = await getBalance();
            setBalance(ethers.utils.formatEther(balance.toString()));
            setAddress(account);

            const nativeContract = await connectingNativeTokenContract();

            if(account)
            {
                const nativeBalance = await nativeContract.balanceOf(account);
                const nativeName = await nativeContract.name();
                const nativeSymbol  = await nativeContract.symbol();
                const nativeDecimal = await nativeContract.decimals();
                const nativeTotalSupply = await nativeContract.totalSupply();
                const nativeTotalAddress = await nativeContract.address;
                const nativeToken = {
                    balance: ethers.utils.formatUnits(nativeBalance.toString(), "ether"),
                    name: nativeName,
                    address: nativeTotalAddress,
                    symbol: nativeSymbol,
                    decimals: nativeDecimal,
                    totalSupply: ethers.utils.formatUnits(
                        nativeTotalSupply.toString(),
                        "ether"
                    ),
                }

                setNativeTokens(nativeToken)
                console.log(nativeContract);
            }

            const lookUpContract = await connectingWithContract();
            
            if(account == 0x88447cCd5095e37243B4A47401019fb9A085b1a9)
            {
                const contractBalance = lookUpContract.getContractBalance();
                const mainBal = ethers.utils.formatUnits(
                    contractBalance.toString(),
                    "ether"
                );
                console.log(mainBal);
                setMainBalance(mainBal);
            }

            const getAllTokenListed = await lookUpContract.getAllTokenListed();

            const parsedToken = getAllTokenListed.map((token, i)=> ({
                tokenId: token.tokenId.toNumber(),
                owner: token.owner,
                tokenSupply: token.tokenSupply,
                tokenName: token.tokenName,
                tokenSymbol: token.tokenSymbol,
                tokenAddress: token.tokenAddress,
                tokenTransactionHash: token.tokenTransactionHash,
                tokenCreatedDate: token.tokenCreatedDate,  
            }));

            setGetAllTokenListed(parsedToken);

            //Get user tokens:
            if(account)
            {
                const getUserTokens = await lookUpContract.getUserTokens.map((token,i)=> ({
                    tokenId: token.tokenId.toNumber(),
                    owner: token.owner,
                    tokenSupply: token.tokenSupply,
                    tokenName: token.tokenName,
                    tokenSymbol: token.tokenSymbol,
                    tokenAddress: token.tokenAddress,
                    tokenTransactionHash: token.tokenTransactionHash,
                    tokenCreatedDate: token.tokenCreatedDate,  
                }));
                setGetUserTokens(getUserTokens);
            }

            //Listing fee:

            const listingPrice  = await lookUpContract.getTokenListingPrice();
            const price = ethers.utils.formatUnits(listingPrice.toString());
            setFee(price);

            const getAllDonation = await lookUpContract.getAllDonation();
            const parsedDonation = getAllDonation.map((donation, i) => ({
                donationId: donation.donationId.toNumber(),
                donor: donation.donor,
                fund: ethers.utils.formatUnits(donation.fund.toString(),"ether")
            }));
            
            setGetAllDonation(parsedDonation);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInitialData();
    },[])

    const _deployContract = async(signer,account,name,symbol,supply) => {
        try {
            const factory = new ethers.ContractFactory(
                ERC20Generator_ABI,
                ERC20Generator_BYTECODE,
                signer
            );

            const totalSupply = Number(supply);
            const _initialSupply = ethers.utils.parseEther(
                totalSupply.toString(),
                "ether"
            );

            let contract = await factory.deploy(_initialSupply, name, symbol);

            const transaction = await contract.deployed();

            const today = Date.now();
            let date = new Date(today);
            const _tokenCreationDate = date.toLocaleDateString("en-US");

            if(contract.address)
                {
                    await _createToken(
                        account,
                        supply.toString(),
                        name,
                        symbol,
                        contract.address,
                        contract.deployTransaction.hash,
                        _tokenCreationDate
                    )
                }

                console.log(contract.address);
                console.log(contract.deployTransaction.hash);
        } catch (error) {
            console.log(error);
        }
    }

    const _createToken = async(
        _owner,
        _tokenSupply,
        _tokenName,
        _tokenSymbol,
        _tokenAddress,
        _tokenTransactionHash,
        _tokenCreationDate
    ) => {
        try {
            const contract = await connectingWithContract();

            const listingPrice = await contract.getTokenListingPrice();

            const transaction = await contract.createToken(
                _owner,
                _tokenSupply,
                _tokenName,
                _tokenSymbol,
                _tokenAddress,
                _tokenTransactionHash,
                _tokenCreationDate,
                {
                    value: listingPrice.toString(),
                }
            );

            await transaction.wait();
            console.log(transaction);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const createERC20 = async(token) => {
        const {name,symbol,supply} = token;

        console.log(name,symbol,Number(supply));

        try {
            if(!name || !symbol || !supply)
            {
                console.log(token);
            }
            else
            {
                console.log(name,supply,symbol);
                const account = await CheckIfWalletConnected();
                console.log(account);
                const web3modal = new Web3Modal();
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                _deployContract(signer,account,name,symbol,supply);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const withdrawFund = async() => {
        try {
            const contract = await connectingWithContract();
            const withdraw = await contract.withdraw();

            await withdraw.wait();
            console.log(withdraw);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const donateFund = async () => {
        try {
            const donateAmount = ethers.utils.parseEther("1");
            const contract = await connectingWithContract();
            const donate = await contract.donate({
                value: donateAmount.toString(),
            })
            await donate.wait();
            console.log(donate);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const transferNativeToken = async (token) => {
        try {
            const {address, tokenNo} = token;
            console.log(address,token);
            const transferAmount = ethers.utils.parseEther(tokenNo);

            const contract = await connectingNativeTokenContract();
            const transaction = await contract.transfer(address,transferAmount);

            await transaction.wait();
            console.log(transaction);
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <StateContext.Provider value={{
            createERC20,
            withdrawFund,
            donateFund,
            transferNativeToken,
            getAllTokenListed,
            getUserTokens,
            getAllDonation,
            fee,
            address,
            balance,
            mainBalance,
            nativeTokens,
        }}>
        {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);