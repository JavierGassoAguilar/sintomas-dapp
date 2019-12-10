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
    uint id;
    string sintoma;
    address remediador;
    string tipoRemedio;
    string remedio;
    uint sumaCalificacionRemedio;
    uint numeroVotosRemedio;
  }

  struct Remediador {
    address remediador;
    uint sumaCalificacionGlobal;
    uint numeroVotosGlobal;
  }
  
  mapping (tipoVariable => nombreEstructura) nombreVariable;
  // Crear mapping para los sintomas
  // Crear mapping para el remediador

  // Crear variable de esto para guardar el id del ultimo sintoma
  uint ultimoId;


  // que funciones hacen falta en el contrato (nombres y parametros)
  // function registro (msg.sender) -> No es necesario
  function tengoUnSintoma (string dolorConccreto)
  //function buscoRemedio (string dolorConccreto) -> Lo vamos a hacer en react
  function tengoRemedio (uint id, string remedio string tipoRemedio)
  function valoroRemedio (uint id, uint8 valoracion(1-10))
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
