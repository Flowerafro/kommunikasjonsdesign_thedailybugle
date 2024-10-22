/* Sjekker om noe er i viewport (For å skru av hjerte-animasjon) */
function inViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

/* eventlistener som viser når pulse-animation er på (når id intro er i viewport) og av */
document.addEventListener('scroll', function () {
    const heartOpacity = document.getElementById("heart-opacity");

    if (inViewport(document.getElementById("intro"))) {
        heartOpacity.style.display = "none";
    } else if (inViewport(document.getElementById("intersection"))) {
        heartOpacity.style.display = "flex";
    } else {
        heartOpacity.style.display = "none";
    }
}, {
    passive: true
});



/* MAP */

const map = L.map('map').setView([51.505, -0.09], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

