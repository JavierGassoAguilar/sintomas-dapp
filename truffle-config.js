const path = require("path");

module.exports = {
  compilers: {
    solc: {
      version: "^0.6.0"
    }
  },
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4"
    }
  }
};
