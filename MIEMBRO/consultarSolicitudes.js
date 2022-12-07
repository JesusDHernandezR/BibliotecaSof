var db = null;
var idsoli,titulo,fecha,resumen;

addEventListener("load", beginCreateDB);
function beginCreateDB() {
	db = openDatabase('libros', '1.0', 'Libro', 2 * 1024 * 1024);
	db.transaction(consultaDB, agregarBD,errorCDB,exitCDB);
}

function consultaDB(tx) {
  //Crear la tabla contactos si no esta creada
	tx.executeSql('CREATE TABLE IF NOT EXISTS LibroSolicitud (titulo, fecha, idsoli,resumen)');
	tx.executeSql('SELECT titulo, fecha, idsoli,resumen FROM LibroSolicitud',[],(tx, results) => {
		var lista = [];
		for(var i =0; i < results.rows.length; i++){
			lista.push('</th><th>' + results.rows.item(i).idsoli  +'</th><th>' + results.rows.item(i).titulo  +'</th><th>' +results.rows.item(i).fecha+'</th><th>'+results.rows.item(i).resumen+'</th><th>'+'<button class="btn btn-primary" onclick="aceptar()">Aceptar</button>'+'<button class="btn btn-danger" onclick="rechazar()">Rechazar</button></th></tr>');
            idsoli=results.rows.item(i).idsoli;
            titulo=results.rows.item(i).titulo;
            fecha=results.rows.item(i).fecha;
            resumen=results.rows.item(i).resumen;
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


function rechazar(){
	db.transaction(eliminarDB);
}

function eliminarDB(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS LibroSolicitud (titulo, fecha, idsoli,resumen)');
	tx.executeSql('DELETE FROM LibroSolicitud WHERE idsoli="'+idsoli+'"')
	alert("Rechazado Correctamente "+idsoli);
}


function aceptar(){
    alert("Aceptado Correctamente "+titulo);
    db.transaction(agregarBD);
}

function agregarBD(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS LibrosAceptados (titulo, fecha, idsoli,resumen)');
    tx.executeSql('INSERT INTO LibrosAceptados (titulo, fecha,idsoli,resumen) VALUES ("'+titulo+'", "'+fecha+'","'+idsoli+'","'+resumen+'")');
    tx.executeSql('DELETE FROM LibroSolicitud WHERE idsoli="'+idsoli+'"')
    
}