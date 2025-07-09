function loadComponent(id, url) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        });
}

Promise.all([
    loadComponent("header", "/components/header.html"),
    loadComponent("footer", "/components/footer.html")
]).then(() => {
    const script = document.createElement('script');
    script.src = '/js/script.js'; // Perbaiki path ke root
    document.body.appendChild(script);
});
