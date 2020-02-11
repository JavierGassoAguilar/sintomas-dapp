import React, { Component } from "react";
import SintomasDappContract from "./contracts/SintomasDapp.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    contract: null,
    textoSintoma: '',
    textoRemedio: '',
    tipoRemedioSeleccionado: '',
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

  registrarSintoma = async (sintoma) => {
    const response = await this.state.contract.methods.tengoUnSintoma(sintoma).send({from: this.state.accounts[0]});
    console.log(response);
  };

  obtenerSintomasDapp = async () => {
    const ultimoSintomaId = await this.state.contract.methods.ultimoSintomaId().call();
    this.setState({ ultimoSintomaId });
    let sintomas = [];
    for (let i = 1; i <= this.state.ultimoSintomaId; i++) {
      const resultado = await this.state.contract.methods.sintomas(i).call();
      sintomas.push({
        idSintoma: resultado.idSintoma,
        sintoma: resultado.sintoma,
      });
    }
    this.setState({ sintomas });
  };

  hintertarremedio = async (sintoma) => {
    const response = await this.state.contract.methods.tengoRemedio(sintoma, this.state.tipoRemedioSeleccionado, this.state.textoRemedio).send({from: this.state.accounts[0]});
    console.log(response);
  };

  listarRemedios = async () => {
    const ultimoRemedioId = await this.state.contract.methods.ultimoRemedioId().call();
    alert("El ultimo remedio ID es: " + ultimoRemedioId);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

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

            {this.state.sintomas.map(item =>
              <div class="contenedor-sintoma">
                <p><strong>Sintoma: </strong> {item.sintoma} </p>
                
                <hr />
                <select onChange={e => this.setState({ tipoRemedioSeleccionado: e.target.value })} value={this.state.tipoRemedioSeleccionado} class="select">
                  <option>Selecciona un tipo de remedio</option>
                  <option value="1">Posturas de Yoga</option>
                  <option value="2">Infusión</option>
                  <option value="3">Homeopatía</option>
                  <option value="4">Otros</option>
                </select>
                <input 
                  class="input"
                  type="text" 
                  value={this.state.textoRemedio} 
                  onChange={e => this.setState({ textoRemedio: e.target.value })} 
                />
                <button class="button boton-sintoma" onClick={() => this.hintertarremedio(item.idSintoma)}>Insertar remedio</button>

                <hr />
                <button class="button boton-sintoma" onClick={() => this.listarRemedios()}>Consultar remedios</button>

              </div>
            )}



          </div>
        </article>

      </div>
    );
  }
}

export default App;
