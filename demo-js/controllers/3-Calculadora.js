document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("sumarBtn");

    boton.addEventListener("click", function () {
        let num1 = parseFloat(document.getElementById("num1").value) || 0;
        let num2 = parseFloat(document.getElementById("num2").value) || 0;

        let suma = num1 + num2;
        if (suma >= 0) {
            document.getElementById("resultado").textContent = "Suma positiva " + suma;
        } else {
            document.getElementById("resultado").textContent = "Suma negativa " + suma;
        }
    });
});