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
    textoSintoma: '',
    ultimoSintomaId: 0,
    sintomas: []
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
      const ultimoSintomaId = await contract.methods.ultimoSintomaId().call();
      this.setState({ 
        web3, 
        accounts, 
        contract,
        ultimoSintomaId
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

    // Hacer un bucle para pintar TODOS LOS sintomas (desde 1 hasta el ultimo)



    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  registrarSintoma = async (sintoma) => {
    const response = await this.state.contract
      .methods.tengoUnSintoma(sintoma)
      .send({ from: this.state.accounts[0] });
  };

  obtenerSintomasDapp = async () => {
    let sintomas = [];
    for (let i = 1; i <= this.state.ultimoSintomaId; i++) {
      const resultado = await this.state.contract.methods.sintomas(i).call();
      sintomas.push(resultado.sintoma);
    }
    this.setState({ sintomas });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>The stored value is: {this.state.storageValue}</div>
        <hr></hr>

        <button class="button is-primary" onClick={() => this.runExample()}>Ejecutar runExample</button>

        <select class="select">
          <option>Selecciona un tipo de remedio</option>
          <option value="1">Posturas de Yoga</option>
          <option value="2">Infusión</option>
          <option value="3">Homeopatía</option>
          <option value="4">Otros</option>
        </select>

        <hr></hr>

        <article class="message cajita">
          <div class="message-header">
            <p>Registrar síntoma</p>
          </div>
          <div class="message-body">
            <input 
              class="input is-warning separado-abajo"
              type="text" 
              value={this.state.textoSintoma} 
              onChange={e => this.setState({ textoSintoma: e.target.value })} 
            />
            <button class="button is-success" onClick={() => this.registrarSintoma(this.state.textoSintoma)}>Registrar síntoma</button>
          </div>
        </article>

        <article class="message cajita">
          <div class="message-header">
            <p>Lista de sintomas registrados</p>
            <button class="button is-success" onClick={() => this.obtenerSintomasDapp()}>Buscar</button>
          </div>
          <div class="message-body">

          <strong>{this.state.sintomas}</strong>

          <ul>
            {this.state.sintomas.map((item, key) =>
              <li>- {item}</li>
            )}
          </ul>

          </div>
        </article>

      </div>
    );
  }
}

export default App;
