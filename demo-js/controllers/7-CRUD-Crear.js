document.addEventListener("DOMContentLoaded", function () {
    let btnCrear = document.getElementById("crearUsuario");
    let btnListar = document.getElementById("listarUsuarios");
    let tablaUsuarios = document.getElementById("tablaUsuarios");

    // Eventos de botones
    btnCrear.addEventListener("click", crearUsuario);
    btnListar.addEventListener("click", listarUsuarios);

    // Listar usuarios al cargar la página
    listarUsuarios();


    // Función para listar los usuarios desde la API
    function listarUsuarios() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                tablaUsuarios.innerHTML = ""; // Limpiar tabla antes de cargar nuevos datos
                data.forEach(usuario => {
                    let fila = `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                    </tr>`;
                    tablaUsuarios.innerHTML += fila;
                });
            })
            .catch(error => console.error("Error al obtener usuarios:", error));
    }

    // Función para crear un nuevo usuario
    function crearUsuario() {
        let nombre = document.getElementById("nombre").value.trim();
        let email = document.getElementById("email").value.trim();

        if (nombre === "" || email === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        let usuario = { name: nombre, email: email };

        fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        .then(() => {
            //Aquí se programa lo que pasa cuando el backend responde
            alert("Usuario creado con éxito.");
            listarUsuarios(); // Se vuelve a listar los usuarios desde la API
            document.getElementById("nombre").value = "";
            document.getElementById("email").value = "";
        })
        .catch(error => console.error("Error al crear usuario:", error));
    }


});