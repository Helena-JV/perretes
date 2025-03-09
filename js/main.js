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