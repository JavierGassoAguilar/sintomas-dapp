pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SintomasDapp.sol";

contract TestSintomasDapp {

  function testItStoresAValue() public {
    SintomasDapp sintomasDapp = SintomasDapp(DeployedAddresses.SintomasDapp());

    sintomasDapp.set(89);

    uint expected = 89;

    Assert.equal(sintomasDapp.get(), expected, "It should store the value 89.");
  }

}
