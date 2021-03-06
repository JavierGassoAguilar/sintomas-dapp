pragma solidity ^0.6.0;

contract SintomasDapp {

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
  
  mapping (uint => Sintoma) public sintomas;
  mapping (uint => Remedio) public remedios;
  mapping (address => Remediador) public remediadores;

  uint public ultimoSintomaId;
  uint public ultimoRemedioId;

  function tengoUnSintoma (string memory dolorConcreto) public {
    ultimoSintomaId++;
    sintomas[ultimoSintomaId].idSintoma = ultimoSintomaId;
    sintomas[ultimoSintomaId].sintoma = dolorConcreto;
  }

  function tengoRemedio (uint idSintoma, string memory tipoRemedio, string memory remedio) public {
    require(idSintoma <= ultimoSintomaId, "El sintoma con ese ID no existe");
    ultimoRemedioId++;
    remedios[ultimoRemedioId].idRemedio = ultimoRemedioId;
    remedios[ultimoRemedioId].idSintoma = idSintoma;
    remedios[ultimoRemedioId].tipoRemedio = tipoRemedio;
    remedios[ultimoRemedioId].remedio = remedio;
    remedios[ultimoRemedioId].remediador = msg.sender;
  }

  function valoroRemedio (uint idRemedio, uint8 valoracion) public {
    require(idRemedio <= ultimoRemedioId, "El remedio con ese ID no existe");
    require(valoracion >= 0 && valoracion <= 10, "Tu valoracion tiene que estar entre 0 y 10");
    remedios[idRemedio].sumaCalificacionRemedio += valoracion;
    remedios[idRemedio].numeroVotosRemedio++;
    remediadores[remedios[idRemedio].remediador].sumaCalificacionGlobal += valoracion;
    remediadores[remedios[idRemedio].remediador].numeroVotosGlobal++;
  }
}
