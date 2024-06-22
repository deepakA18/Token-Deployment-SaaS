require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const NEXT_PUBLIC_RPC_URL = "https://bartio.rpc.berachain.com";
const NEXT_PUBLIC_PRIVATE_KEY = "a8809b40c030628d29be1febd1bc3b29a2298837699837d8bb9e97004a93b17f";
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "Berachain Bartio",
  networks: {
    hardhat: {},
    berachain_bartio: {
      url: NEXT_PUBLIC_RPC_URL,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
      chainId: 80084,
    },
  },
};
