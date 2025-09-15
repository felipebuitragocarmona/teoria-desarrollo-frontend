document.addEventListener("DOMContentLoaded", function () {
    let btnCrear = document.getElementById("crearUsuario");
    let btnActualizar = document.getElementById("actualizarUsuario");
    let btnListar = document.getElementById("listarUsuarios");
    let tablaUsuarios = document.getElementById("tablaUsuarios");
    let nombreInput = document.getElementById("nombre");
    let emailInput = document.getElementById("email");
    let userIdInput = document.getElementById("userId");
    let formTitle = document.getElementById("formTitle");

    // Eventos de botones
    btnCrear.addEventListener("click", crearUsuario);
    btnActualizar.addEventListener("click", actualizarUsuario);
    btnListar.addEventListener("click", listarUsuarios);

    // Hacer funciones accesibles globalmente
    window.cargarUsuario = cargarUsuario;
    window.eliminarUsuario = eliminarUsuario;

    // Listar usuarios al cargar la página
    listarUsuarios();

    // Función para listar los usuarios desde la API
    function listarUsuarios() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                tablaUsuarios.innerHTML = ""; // Limpiar tabla antes de cargar nuevos datos
                data.forEach(usuario => {
                    tablaUsuarios.innerHTML += `
                        <tr id="usuario-${usuario.id}">
                            <td>${usuario.id}</td>
                            <td>${usuario.name}</td>
                            <td>${usuario.email}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="cargarUsuario(${usuario.id}, '${usuario.name}', '${usuario.email}')">Actualizar</button>
                                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
            })
            .catch(error => console.error("Error al obtener usuarios:", error));
    }

    // Función para cargar usuario en el formulario
    function cargarUsuario(id, nombre, email) {
        userIdInput.value = id;
        nombreInput.value = nombre;
        emailInput.value = email;

        formTitle.textContent = "Actualizar Usuario";
        btnCrear.classList.add("d-none");
        btnActualizar.classList.remove("d-none");
    }

    // Función para crear un nuevo usuario
    function crearUsuario() {
        let nombre = nombreInput.value.trim();
        let email = emailInput.value.trim();

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
            .then(response => response.json())
            .then(() => {
                alert("Usuario creado con éxito.");
                listarUsuarios();
                limpiarFormulario();
            })
            .catch(error => console.error("Error al crear usuario:", error));
    }

    // Función para eliminar un usuario
    function eliminarUsuario(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                document.getElementById(`usuario-${id}`).remove();
                alert("Usuario eliminado con éxito.");
            })
            .catch(error => console.error("Error al eliminar usuario:", error));
    }

    // Función para actualizar un usuario
    function actualizarUsuario() {
        let id = userIdInput.value;
        let nombre = nombreInput.value.trim();
        let email = emailInput.value.trim();

        if (nombre === "" || email === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        let usuario = { name: nombre, email: email };

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(() => {
                alert("Usuario actualizado con éxito.");
                listarUsuarios();
                limpiarFormulario();
            })
            .catch(error => console.error("Error al actualizar usuario:", error));
    }

    // Función para limpiar el formulario
    function limpiarFormulario() {
        userIdInput.value = "";
        nombreInput.value = "";
        emailInput.value = "";

        formTitle.textContent = "Registrar Nuevo Usuario";
        btnCrear.classList.remove("d-none");
        btnActualizar.classList.add("d-none");
    }


});
