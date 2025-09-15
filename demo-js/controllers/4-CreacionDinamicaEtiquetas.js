document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("agregarBtn");

    boton.addEventListener("click", function () {
        let texto = document.getElementById("textoInput").value.trim();
        
        if (texto !== "") {
            let nuevoTitulo = document.createElement("h1");
            nuevoTitulo.textContent = texto;
            
            let contenedor = document.getElementById("contenedorTitulos");
            contenedor.appendChild(nuevoTitulo);
            
            document.getElementById("textoInput").value = ""; // Limpiar campo
        }
    });
});