document.addEventListener("DOMContentLoaded", function () {
    let btnCargar = document.getElementById("cargarUsuarios");
    let tablaUsuarios = document.getElementById("tablaUsuarios");

    // Evento para cargar usuarios al hacer clic en el botón
    btnCargar.addEventListener("click", cargarUsuarios);

    // Función para obtener y mostrar usuarios
    function cargarUsuarios() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => {
                console.log(users);
                tablaUsuarios.innerHTML = ""; // Limpiar contenido previo
                users.forEach(usuario => {
                    tablaUsuarios.innerHTML +=`
                    <tr id="usuario-${usuario.id}">
                        <td>${usuario.id}</td>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
                    </tr>
                    `
                });
            })
            .catch(error => console.error("Error al obtener los usuarios:", error));
    }

    // Función para eliminar usuario con API DELETE
    function eliminarUsuario(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    document.getElementById(`usuario-${id}`).remove();
                    console.log(`Usuario con ID ${id} eliminado`);
                } else {
                    console.error("Error al eliminar el usuario");
                }
            })
            .catch(error => console.error("Error en la solicitud DELETE:", error));
    }
    // Hacer la función eliminarUsuario accesible globalmente
    window.eliminarUsuario = eliminarUsuario;

});
