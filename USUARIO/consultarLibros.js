var db = null;
var titulo;

addEventListener("load", beginCreateDB);
function beginCreateDB() {
	db = openDatabase('libros', '1.0', 'Libro', 2 * 1024 * 1024);
	db.transaction(consultaDB, errorCDB,exitCDB);
}

function consultaDB(tx) {
  //Crear la tabla contactos si no esta creada
	tx.executeSql('CREATE TABLE IF NOT EXISTS Libro (isbn, titulo, facultad, autor,resumen)');
	tx.executeSql('SELECT isbn, titulo, facultad, autor,resumen FROM Libro',[],(tx, results) => {
		var lista = [];
		for(var i =0; i < results.rows.length; i++){
			lista.push('<tr><th>'+results.rows.item(i).isbn+'</th><th>' + results.rows.item(i).titulo  +'</th><th>' +results.rows.item(i).facultad+'</th><th>'+results.rows.item(i).autor+'</th><th>'+results.rows.item(i).resumen+'</th></tr>');
		}
		document.getElementById('resultados').innerHTML = lista.join('');
	});
}

// función para capturar el error en la transacción
function errorCDB(error) {
	alert("Error en la consulta SQL: "+error.code);
}

// Funcion para mostrar un mensaje de exito
function exitCDB() {
	alert("Consulta exitosa!");
}