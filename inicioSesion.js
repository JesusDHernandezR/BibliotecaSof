function Login() {
    var done = 0;
    var usuario = document.login.usuario.value;
    var password = document.login.password.value;
    if (usuario == "Miembro" && password == "12345") {
        window.location = "./MIEMBRO/Miembro.html";
    }
    if (usuario == "Usuario" && password == "12345") {
        window.location = "./USUARIO/Usuario.html";
    }
    if (usuario == "" && password == "") {
        alert("No encontrado, rellene los espacios");
    }
}
