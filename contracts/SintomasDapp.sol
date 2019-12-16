pragma solidity ^0.5.0;

contract SintomasDapp {

  /*
    sintomas
    1. Texto del sintoma
   
    remedios
    2. Direccion del usuario que ha registrado el remedio
    3. Texto del remedio

    puntuaciones del remedio
    4. Acumulador de calificacion
    5. Numero de votos

  */

  struct Sintoma {
    uint idSintoma;
    string sintoma;
  }

  struct Remedio {
    uint idRemedio;
    uint idSintoma;
    string tipoRemedio;
    string remedio;
    address remediador;
    uint sumaCalificacionRemedio;
    uint numeroVotosRemedio;
  }

  struct Remediador {
    address remediador;
    uint sumaCalificacionGlobal;
    uint numeroVotosGlobal;
  }
  
  mapping (uint => Sintoma) sintomas;
  mapping (uint => Remedio) remedios;
  mapping (address => Remediador) remediadores;

  uint ultimoSintomaId;
  uint ultimoRemedioId;

  function tengoUnSintoma (string dolorConccreto) {
    ultimaSintomaId++;
    sintomas[ultimoSintomaId].idSintoma = ultimaSintomaId;
    sintomas[ultimoSintomaId].sintoma = dolorConccreto;
  }
//function buscoRemedio (string dolorConccreto) -> Lo vamos a hacer en react

  function tengoRemedio (uint idSintoma, string tipoRemedio, string remedio) {
    ultimoRemedioId++;
    remedios[ultimoRemedioId].idRemedio = ultimoRemedioId;
    remedios[ultimoRemedioId].idSintoma = idSintoma;
    remedios[ultimoRemedioId].tipoRemedio = tipoRemedio;
    remedios[ultimoRemedioId].remedio = remedio;
    remedios[ultimoRemedioId].remediador = msg.sender;
  }

  function valoroRemedio (uint idRemedio, uint8 valoracion) {
    remedios[idRemedio].sumaCalificacionRemedio += valoracion;
    remedios[idRemedio].numeroVotosRemedio++;
    remediadores[remedios[idRemedio].remediador].sumaCalificacionGlobal += valoracion;
    remediadores[remedios[idRemedio].remediador].numeroVotosGlobal++;
  }
  // function equipararNotaRemedioYnotaMsg.sender -> A la hora de valorarRemedio sumaremos la nota en las dos estructuras

  /*
    tipos de remedio: (Vamos a hacer el selector/menu en React)
    -posturas de yoga.
    -infusiones.
    -homeopatia.
    -otros.
  */

  // Hacer las 3 funciones de arriba


  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
