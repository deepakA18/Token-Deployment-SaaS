import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
    LookUpContract_ABI,
    LookUpContract_Address,
    ERC20Generator_ABI,
    ERC20Generator_Address
} from "../Context/constants";

export const CheckIfWalletConnected = async () => {
    try {
        if(!window.ethereum)
        {
            return console.log("Install Wallet!");
        }

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })

        const firstAccount = accounts[0]; //fixed
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}


export const connectWallet = async() => {
    try {
        if(!window.ethereum)
        {
            return console.log("Install wallet!");
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}


const  fetchContract = (signedOrProvider) => {
    new ethers.Contract(
        LookUpContract_ABI,
        LookUpContract_Address,
        signedOrProvider
    )
    
}

export const connectingWithContract = async() => {
    try {
        const web3modal = new Web3Modal();
        const connection  = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}

export const getBalance = async() => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        return await signer.getBalance();
    } catch (error) {
        console.log(error);
    }
}

const fetchTokenContract = (signedOrProvider) => {
    new ethers.Contract(
        ERC20Generator_ABI,
        ERC20Generator_Address,
        signedOrProvider
    )
}

export const connectingNativeTokenContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchTokenContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
}