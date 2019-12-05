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
    string remedio;
    uint sumaCalificacion;
    uint numeroVotos;
  }
  
  // uint ultimoId;
  // mapping para acceder a los campos de los sintomas

  // que funciones hacen falta en el contrato (nombres y parametros)



  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
