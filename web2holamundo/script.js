document.getElementById("rotateButton").addEventListener("click", function () {
    const epicText = document.querySelector(".epic-text");
    epicText.classList.add("rotate");

    // Remueve la clase para poder animar nuevamente si se vuelve a hacer clic
    setTimeout(() => {
        epicText.classList.remove("rotate");
    }, 1000); // Duración de la animación
});
