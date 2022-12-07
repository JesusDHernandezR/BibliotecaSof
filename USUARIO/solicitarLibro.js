var titulo,fecha,resumen,idsoli;

var db = null;

addEventListener("load", beginCreateDB);
function beginCreateDB() {
	db = openDatabase('libros', '1.0', 'Libro', 2 * 1024 * 1024);
	
}

    function guardarDatos(){
      titulo=document.getElementById("nombreLibro").value;
      idsoli=document.getElementById("idsoli").value;
      fecha=document.getElementById("fecha").value;
      resumen=document.getElementById("resumenLibro").value;
      alert("Solicitado Correctamente "+titulo);
      db.transaction(registroDB,errorCDB,exitCDB);
    }


function registroDB(tx) {
  //Crear la tabla contactos si no esta creada
  tx.executeSql('CREATE TABLE IF NOT EXISTS LibroSolicitud (titulo, fecha,idsoli,resumen)');
  //Insertar datos en la tabla
  tx.executeSql('INSERT INTO LibroSolicitud (titulo, fecha,idsoli,resumen) VALUES ("'+titulo+'", "'+fecha+'","'+idsoli+'","'+resumen+'")');
}

  function errorCDB(error) {
	alert("Error en el registro SQL: "+error.code);
}
function exitCDB() {
	alert("Consulta exitosa!");
}