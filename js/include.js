function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (element) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${url}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
            })
            .catch(error => console.error(error));
    }
    return Promise.resolve();
}

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadComponent("header", "/components/header.html"),
        loadComponent("footer", "/components/footer.html")
    ]).then(() => {
        const script = document.createElement('script');
        script.src = '/js/main.js';
        document.body.appendChild(script);
    });
});
