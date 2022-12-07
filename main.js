// addEventListener("load", beginCreateDB);
// function beginCreateDB() {
// 	var db = openDatabase('mydb', '1.0', 'My first database', 2 * 1024 * 1024);
// 	db.transaction(consultaDB, errorCDB,exitCDB);
// }

// function consultaDB(tx) {
//   //Crear la tabla contactos si no esta creada
//   tx.executeSql('CREATE TABLE IF NOT EXISTS Contactos (id, nombre, email)');
// 	//Insertar datos en la tabla
// 	//tx.executeSql('INSERT INTO Contactos (id, nombre, email) VALUES (1, "Jose Cordova","jc@gmail.com")');
// 	//tx.executeSql('INSERT INTO Contactos (id, nombre, email) VALUES (2, "Maria Alpei","ma@gmail.com")');
//     tx.executeSql('SELECT id, nombre, email FROM Contactos', [],(tx, results)=>{
//         var lista =[];
//         for (var i=0;i<results.rows.length;i++){
//             lista.push('<li>'+results.rows.item(i).nombre +', '+results.rows.item(i).id+', '+results.rows.item(i).email+'</li>');
//         }
//         document.getElementById('resultados').innerHTML=lista.join('');
//       });
// }

// // función para capturar el error en la transacción

// function errorCDB(error) {
// 	alert("Error en la consulta SQL: "+error.code);
// }

// // Funcion para mostrar un mensaje de exito
// function exitCDB() {
// 	alert("Consulta exitosa!");
// }
function ArmarJSON() {
  var numeroSerie = document.getElementById("numeroSerie").value;
  var nombreLibro = document.getElementById("nombreLibro").value;
  var e = document.getElementById("categoria");
  var categoria = e.options[e.selectedIndex].value;
  var autorLibro = document.getElementById("autorLibro").value;
  var resumenLibro = document.getElementById("resumenLibro").value;

  var libro = {
    "numeroSerie": numeroSerie,
    "nombreLibro": nombreLibro,
    "categoria": categoria,
    "autorLibro": autorLibro,
    "resumenLibro": resumenLibro,
  }
  return libro;
}
function CrearLibro(libro) {
  let libros = [];
  var libro = ArmarJSON();
  if (localStorage.getItem('BD') != null) {
    libros = JSON.parse(localStorage.getItem('BD'));
  }
  libros.push(libro);
  localStorage.setItem('BD', JSON.stringify(libros));
  console.log(libro);
  alert("Libro Guardado Correctamente");
}
function ConsultarLibro() {
  var libros = [];
  if (localStorage.getItem('BD') != null) {
    libros = JSON.parse(localStorage.getItem('BD'));
  }
  libros.forEach(item => {
    document.getElementById('tbodyLibros').innerHTML =
      
      '<td>' + item.numeroSerie + '</td>' +
      '<td>' + item.nombreLibro + '</td>' +
      '<td>' + item.categoria + '</td>' +
      '<td>' + item.autorLibro + '</td>' +
      '<td>' + item.resumenLibro + '</td>' ;
  });
}

function EliminarLibro(){
  var formBorrar = document.getElementById("formBorrar")
  formBorrar.addEventListener('submit',function(){
    var libroBorrar = document.getElementById('Blibro').value;
    if(libroBorrar.length>=1){
      localStorage.removeItem(libroBorrar);
    }
  })
}

