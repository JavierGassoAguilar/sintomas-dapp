var SintomasDapp = artifacts.require("./SintomasDapp.sol");

module.exports = function(deployer) {
  deployer.deploy(SintomasDapp);
};
