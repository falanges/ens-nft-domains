require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/EbKxIYCk9wTenRJfaxMfhXxGsgyDtd8H",
      accounts: [
        "c63db25402116908299fddd35c27e84b029c7d798166933a90ab8685ee05164c",
      ],
    },
  },
};
