document.getElementById("cuestionario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Contadores por carrera
    const conteo = {
        A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0
    };

    // Contar respuestas
    for (let i = 1; i <= 7; i++) {
        const respuesta = document.getElementById("opcion" + i).value;
        conteo[respuesta]++;
    }

    // Definición de las carreras
    const carreras = {
          A: "A) Pedagogía",
        B: "B) Turismo",
        C: "C) Comunicación",
        D: "D) Diseño Gráfico",
        E: "E) Mercadotecnia",
        F: "F) Gastronomía",
        G: "G) Nutrición",
        H: "H) Ingeniería",
        I: "I) Derecho"
    };

    // Mostrar lista de resultados
    const lista = document.getElementById("lista-resultados");
    lista.innerHTML = "";
    for (let clave in conteo) {
        const item = document.createElement("li");
        item.textContent = `${carreras[clave]}: ${conteo[clave]} puntos`;
        lista.appendChild(item);
    }

    // Mostrar el div del resultado (mostrar resultados y cambiar texto del botón)
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.display = "block";  // Muestra el resultado

    // Cambiar el texto del botón a "Ver gráfica"
    const verResultadoBtn = document.getElementById("verResultadoBtn");
    verResultadoBtn.textContent = "Ver gráfica";

    // Mostrar el gráfico de radar cuando el botón "Ver gráfica" sea presionado
    verResultadoBtn.addEventListener("click", function() {
        // Mostrar gráfica
        const ctx = document.getElementById("graficaRadar").getContext("2d");
        document.getElementById("graficaRadar").style.display = "block";  // Mostrar el gráfico

        if (window.radarChart) window.radarChart.destroy(); // Elimina gráfico previo si existe

        window.radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: Object.values(carreras),
                datasets: [{
                    label: "Resultado del cuestionario",
                    data: Object.values(conteo),
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    pointBackgroundColor: "rgba(54, 162, 235, 1)"
                }]
            },
            options: {
                responsive: true,
                scale: {
                    ticks: { beginAtZero: true, precision: 0 }
                }
            }
        });
    });
});
