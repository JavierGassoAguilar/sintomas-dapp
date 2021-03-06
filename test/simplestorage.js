const SintomasDapp = artifacts.require("./SintomasDapp.sol");

contract("SintomasDapp", accounts => {
  it("...should store the value 89.", async () => {
    const sintomasDappInstance = await SintomasDapp.deployed();

    // Set value of 89
    await sintomasDappInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await sintomasDappInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
