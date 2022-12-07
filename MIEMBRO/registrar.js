var isbn,titulo,facultad,autor,resumen;

var db = null;

addEventListener("load", beginCreateDB);
function beginCreateDB() {
	db = openDatabase('libros', '1.0', 'Libro', 2 * 1024 * 1024);
	
}

    function guardarDatos(){
      isbn=document.getElementById("numeroSerie").value;
      titulo=document.getElementById("nombreLibro").value;
      facultad=document.getElementById("categoria").value;
      autor=document.getElementById("autorLibro").value;
      resumen=document.getElementById("resumenLibro").value;
      alert("Guardado Correctamente "+titulo);
      db.transaction(registroDB,errorCDB,exitCDB);
    }


function registroDB(tx) {
  //Crear la tabla contactos si no esta creada
  tx.executeSql('CREATE TABLE IF NOT EXISTS Libro (isbn, titulo, facultad, autor,resumen)');
  //Insertar datos en la tabla
  tx.executeSql('INSERT INTO Libro (isbn, titulo, facultad, autor,resumen) VALUES ("'+isbn+'", "'+titulo+'", "'+facultad+'", "'+autor+'","'+resumen+'")');
}

  function errorCDB(error) {
	alert("Error en el registro SQL: "+error.code);
}
function exitCDB() {
	alert("Consulta exitosa!");
}