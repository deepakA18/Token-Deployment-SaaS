import React, { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  CheckIfWalletConnected,
  connectingWithContract,
  getBalance,
  connectingNativeTokenContract
} from "../Utils/index";
import { ERC20Generator_ABI, ERC20Generator_BYTECODE } from "./constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [getAllTokenListed, setGetAllTokenListed] = useState([]);
  const [getUserTokens, setGetUserTokens] = useState([]);
  const [getAllDonation, setGetAllDonation] = useState([]);
  const [fee, setFee] = useState();
  const [balance, setBalance] = useState();
  const [mainBalance, setMainBalance] = useState();
  const [nativeTokens, setNativeTokens] = useState();

  const fetchInitialData = async () => {
    try {
      //Get User Account
      const account = await CheckIfWalletConnected();
    //  console.log(account)
        
        //Get user balance
        const balance = await getBalance();
        setBalance(ethers.utils.formatEther(balance.toString()));
        setAddress(account);
        //Native Token
        const nativeContract = await connectingNativeTokenContract();
        // console.log(nativeContract);

        if (account) {
        const nativeBalance = await nativeContract.balanceOf(account);
        const nativeName = await nativeContract.name();
        const nativeSymbol = await nativeContract.symbol();
        const nativeDecimal = await nativeContract.decimals();
        const nativeTotalSupply = await nativeContract.totalSupply();
        const nativeTotalAddress =  nativeContract.address;
        const nativeToken = {
          balance: ethers.utils.formatUnits(nativeBalance.toString(), nativeDecimal),  //"ether"
          name: nativeName,
          address: nativeTotalAddress,
          symbol: nativeSymbol,
          decimals: nativeDecimal,
          totalSupply: ethers.utils.formatUnits(nativeTotalSupply.toString(), nativeDecimal),  //"ether"
        };
        setNativeTokens(nativeToken);
        console.log(nativeToken)
        // console.log(nativeContract);
      } //close if block

      //Get contract
        const lookUpContract = await connectingWithContract();
        // console.log("lookUP", lookUpContract);
        //Get contract balance
        if (account === "0x88447cCd5095e37243B4A47401019fb9A085b1a9".toLowerCase()) {
          const contractBalance = await lookUpContract.getContractBalance();
          const mainBal = ethers.utils.formatUnits(contractBalance.toString(), "ether");
          setMainBalance(mainBal);
          
        }

        //Get All ERC20 Token(recheck 1hr)
        const allTokens = await lookUpContract.getAllTokenListed();
        const parsedTokens = allTokens.map((token,i) => ({
          tokenId: token.tokenId.toNumber(),
          owner: token.owner,
          tokenSupply: token.tokenSupply,
          tokenName: token.tokenName,
          tokenSymbol: token.tokenSymbol,
          tokenAddress: token.tokenAddress,
          tokenTransactionHash: token.tokenTransactionHash,
          tokenCreatedDate: token.tokenCreatedDate,
        }));
        setGetAllTokenListed(parsedTokens);

        //Get user ERC20 Token
        if(account){
        const userTokens = await lookUpContract.getUserTokens(account);
        const parsedUserTokens = userTokens.map((token,i) => ({
          tokenId: token.tokenId.toNumber(),
          owner: token.owner,
          tokenSupply: token.tokenSupply,
          tokenName: token.tokenName,
          tokenSymbol: token.tokenSymbol,
          tokenAddress: token.tokenAddress,
          tokenTransactionHash: token.tokenTransactionHash,
          tokenCreatedDate: token.tokenCreatedDate,
        }));
        setGetUserTokens(parsedUserTokens);
      }

      //Listing Fee
        const listingPrice = await lookUpContract.getTokenListedPricing();
        const price = ethers.utils.formatUnits(listingPrice.toString());
        setFee(price);
      //Donation
        const allDonations = await lookUpContract.getAllDonation();
        const parsedDonations = allDonations.map((donation) => ({
          donationId: donation.donationId.toNumber(),
          donor: donation.donor,
          fund: ethers.utils.formatUnits(donation.fund.toString(), "ether"),
        }));
        setGetAllDonation(parsedDonations);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const _deployContract = async (signer, account, name, symbol, supply) => {
    try {
      const factory = new ethers.ContractFactory(ERC20Generator_ABI, ERC20Generator_BYTECODE, signer);
      const totalSupply = Number(supply);
      const _initialSupply = ethers.utils.parseEther(totalSupply.toString(), "ether");
      let contract = await factory.deploy(_initialSupply, name, symbol);
      const transaction = await contract.deployed();
     
      const today = Date.now();
      let date = new Date(today);
      const _tokenCreatedData = date.toLocaleDateString("en-US");

      if (contract.address) {
        await _createToken(
          account,
          supply.toString(),
          name,
          symbol,
          contract.address,
          contract.deployTransaction.hash,
          _tokenCreatedData
        );
      }
      console.log("_deployContract",contract.address);
      console.log("deploy transaction hash:",contract.deployTransaction.hash);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  const _createToken = async (_owner, _tokenSupply, _tokenName, _tokenSymbol, _tokenAddress, _tokenTransactionHash, _tokenCreatedData) => {
    try {
      const contract = await connectingWithContract();
      const listingPrice = await contract.getTokenListedPricing();
      const transaction = await contract.createToken(
        _owner,
        _tokenSupply,
        _tokenName,
        _tokenSymbol,
        _tokenAddress,
        _tokenTransactionHash,
        _tokenCreatedData,
        {
          value: listingPrice.toString(),
        }
      );
      await transaction.wait();
      console.log(transaction);
      window.location.reload();
    } catch (error) {
      console.error("Error creating token:", error);
    }
  };

  const createERC20 = async (token) => {
    const { name, symbol, supply } = token;

    console.log(name,symbol,Number(supply));
    try {
      if (!name || !symbol || !supply) {
        console.error("Token data is missing", token);
        return;
      }
      else{
      const account = await CheckIfWalletConnected();
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      _deployContract(signer, account, name, symbol, supply);
    }
  } catch (error) {
      console.error("Error creating ERC20 token:", error);
    }
  };

  const withdrawFund = async () => {
    try {
      const contract = await connectingWithContract();
      const withdraw = await contract.withdraw();

      await withdraw.wait();
      console.log(withdraw);
      window.location.reload();
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  };

  const donateFund = async () => {
    try {
      const donateAmount = ethers.utils.parseEther("1");
      const contract = await connectingWithContract();
      const donate = await contract.donate({ value: donateAmount.toString() });
      await donate.wait();
      console.log(donate);
      window.location.reload();
    } catch (error) {
      console.error("Error donating funds:", error);
    }
  };

  // const transferNativeToken = async (token) => {
  //   try {
  //     const { address, tokenNo } = token;
  //     console.log("addres tokenNo", address, token);
  //     const transferAmount = ethers.utils.parseEther(tokenNo);
  //     const contract = await connectingNativeTokenContract();
  //     const transaction = await contract.transfer(address, transferAmount);
  //     await transaction.wait();
  //     console.log(transaction);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error transferring native token:", error);
  //   }
  // };

  const transferNativeToken = async (token) => {
    try {
      const { address, tokenNo } = token;
      console.log("address tokenNo", address, tokenNo);
      const transferAmount = ethers.utils.parseUnits(tokenNo, 18); // Assuming 18 decimals
  
      const contract = await connectingNativeTokenContract();
  
      // Check balance before attempting transfer
      const balance = await contract.balanceOf(address);
      console.log("Balance in wei:", balance.toString());
      console.log("Balance in ether:", ethers.utils.formatEther(balance));
  
      // Ensure the address has enough balance to transfer the specified amount
      if (balance.lt(transferAmount)) {
        console.error("Insufficient balance for the transfer.");
        return;
      }
  
      // Optional: Estimate gas
      const gasEstimate = await contract.estimateGas.transfer(address, transferAmount);
      console.log("Gas Estimate:", gasEstimate.toString());
  
      const transaction = await contract.transfer(address, transferAmount, {
        gasLimit: gasEstimate,
      });
  
      await transaction.wait();
      console.log(transaction);
      window.location.reload();
    } catch (error) {
      console.error("Error transferring native token:", error);
  
      // Specific error handling
      if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
        console.error("Transaction may fail or may require a manual gas limit. Error details:", error);
      } else if (error.code === ethers.errors.INSUFFICIENT_FUNDS) {
        console.error("Insufficient funds for the transaction.");
      } else if (error.code === ethers.errors.NONCE_EXPIRED) {
        console.error("The transaction nonce is too low.");
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };
  

  return (
    <StateContext.Provider
      value={{
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
