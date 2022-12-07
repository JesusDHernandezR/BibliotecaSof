var db = null;
var idsoli;

addEventListener("load", beginCreateDB);
function beginCreateDB() {
	db = openDatabase('libros', '1.0', 'Libro', 2 * 1024 * 1024);
	db.transaction(consultaDB, errorCDB,exitCDB);
}

function consultaDB(tx) {
  //Crear la tabla contactos si no esta creada
	tx.executeSql('CREATE TABLE IF NOT EXISTS LibrosAceptados (titulo, fecha, idsoli,resumen)');
	tx.executeSql('SELECT titulo, fecha, idsoli,resumen FROM LibrosAceptados',[],(tx, results) => {
		var lista = [];
		for(var i =0; i < results.rows.length; i++){
			lista.push('</th><th>' + results.rows.item(i).idsoli  +'</th><th>' +results.rows.item(i).titulo+'</th><th>'+results.rows.item(i).fecha+'</th><th>'+results.rows.item(i).resumen+'</th><th><button class="btn btn-success" onclick="eliminarLibros()">Listo</button></th></tr>');
            idsoli= results.rows.item(i).idsoli;
        }
		document.getElementById('resultados').innerHTML = lista.join('');
	});
}

function eliminarLibros(){
	db.transaction(eliminarDB);
}

function eliminarDB(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS LibrosAceptados (titulo, fecha, idsoli,resumen)');
	tx.executeSql('DELETE FROM LibrosAceptados WHERE idsoli="'+idsoli+'"')
	alert("Prestamo "+idsoli+" Eliminado Correctamene");
}



// función para capturar el error en la transacción
function errorCDB(error) {
	alert("Error en la consulta SQL: "+error.code);
}

// Funcion para mostrar un mensaje de exito
function exitCDB() {
	alert("Consulta exitosa!");
}