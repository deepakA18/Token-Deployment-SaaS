import ERC20Generator from "./ERC20Generator.json";
import LookUpContract from "./LookUpContract.json";


export const ERC20Generator_ABI = ERC20Generator.abi; 
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;   
export const ERC20Generator_ADDRESS = "0xB9677672d546E5E1780fE54D4a6B91CB69373797";      

export const LookUpContract_ABI = LookUpContract.abi;
export const LookUpContract_ADDRESS = "0x90452Fd2C91108b680a5f45DFB709A8194f8272c"; 

console.log("ERC20Generator_ABI:", ERC20Generator_ABI);
console.log("ERC20Generator_ADDRESS:", ERC20Generator_ADDRESS);
console.log("LookUpContract_ABI:", LookUpContract_ABI);
console.log("LookUpContract_ADDRESS:", LookUpContract_ADDRESS);