const hre = require("hardhat");

const tokens = (_number) => {
    return ethers.utils.parseUnits(_number.toString(),"ether");

}

async function main(){
    const _tokenName = "";
    const _tokenSymbol = "";
    const _initialSupply = tokens(1000);
    const ERC20Generator = await hre.ethers.getContractFactory("ERC20Generator");
    const erc20Generator = await ERC20Generator.deploy(
        _initialSupply,
        _tokenName,
        _tokenSymbol
    );

    await erc20Generator.deployed();
    console.log(`erc20Generator: ${erc20Generator.address}`);

    const LookUpContract = await hre.ethers.getContractFactory("LookUpContract");
    const lookUpContract = await LookUpContract.deploy();

    await lookUpContract.deployed()
    console.log(`LookUpContract: ${lookUpContract.address}`);

    main().catch((error)=> {
        console.error(error);
        process.exitCode = 1;
    })
}

