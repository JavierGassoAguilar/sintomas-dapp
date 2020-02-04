import React, { Component } from "react";
import SintomasDappContract from "./contracts/SintomasDapp.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { 
    storageValue: null, 
    web3: null, 
    accounts: null, 
    contract: null,
    cajaTexto: '',
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SintomasDappContract.networks[networkId];
      const contract = new web3.eth.Contract(
        SintomasDappContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ 
        web3, 
        accounts, 
        contract 
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {

    const response = await this.state.contract
      .methods.tengoUnSintoma("Me duele la cabeza")
      .send({ from: this.state.accounts[0] });

    const ultimoSintomaId = await this.state.contract.methods.ultimoSintomaId().call();
    console.log("El ultimo sintoma tiene el ID: " + ultimoSintomaId);

    // Hacer un bucle para pintar TODOS LOS sintomas (desde 1 hasta el ultimo)

    const resultado = await this.state.contract.methods.sintomas(1).call();
    console.log(resultado);

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  cambiarNombre = (nombre) => {
    this.setState({
      storageValue: nombre
    })
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>The stored value is: {this.state.storageValue}</div>
        <hr></hr>

        <input 
          class="input is-primary"
          type="text" 
          value={this.state.cajaTexto} 
          onChange={e => this.setState({ cajaTexto: e.target.value })} 
        />

        <button class="button is-danger" onClick={() => this.cambiarNombre(this.state.cajaTexto)}>Cambiar valor de storage</button>

        <button class="button is-primary" onClick={() => this.runExample()}>Ejecutar runExample</button>

        <hr></hr>

        <select class="select">
          <option>Selecciona un tipo de remedio</option>
          <option value="1">Posturas de Yoga</option>
          <option value="2">Infusión</option>
          <option value="3">Homeopatía</option>
          <option value="4">Otros</option>
        </select>

      </div>
    );
  }
}

export default App;
