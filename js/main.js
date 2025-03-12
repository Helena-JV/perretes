function buscarRefugio() {
    window.open("https://www.google.com/maps/search/refugio+de+animales", "_blank");
  }

// VIEW TRANSITION API ==========================================
function transitionPages() {
    const internalLinks = document.querySelectorAll('header a');

    internalLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();

            document.startViewTransition(async () => {
                const response = await fetch(link.href);
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, "text/html");
                document.body.innerHTML = doc.body.innerHTML;
                history.pushState(null, "", link.href);
            });
        })
    })
}

transitionPages();

// DOTS ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".como-adoptar-mask");
    const articles = document.querySelectorAll(".como-adoptar-container article");
    const dots = document.querySelectorAll(".dot");

    function updateActiveDot() {
        let containerRect = cardsContainer.getBoundingClientRect();
        let closestIndex = 0;
        let minDistance = Infinity;

        articles.forEach((article, index) => {
            let articleRect = article.getBoundingClientRect();
            // Compara el centro de la ventana con el centro del artículo
            let distance = Math.abs(containerRect.top + containerRect.height / 2 - (articleRect.top + articleRect.height / 2));

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        // Remover la clase "active" de todos los dots y agregarla al dot correspondiente
        dots.forEach(dot => dot.classList.remove("active"));
        dots[closestIndex].classList.add("active");
    }

    // Detectar scroll en el contenedor
    cardsContainer.addEventListener("scroll", updateActiveDot);

    // Inicializar en carga de la página
    updateActiveDot();
});
