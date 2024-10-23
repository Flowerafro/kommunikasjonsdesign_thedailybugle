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



/* LeafLet map: kart */
const map = L.map('map').setView([59.54181, 10.55744], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/* Ikoner til markører på kartet */
/* eks: var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
}); */


/* Markører Ulykkested og Ambulanseposisjon  */
let pinSepsis = L.marker([59.54181, 10.55744]).bindPopup("Sepsispasient på Tofte"),
    pinHjerteinfarkt = L.marker([59.53612, 10.52807]).bindPopup("Hjerteinfarkt på Tofte "),
    pinAMKDrammen = L.marker([59.74354, 10.20406]).bindPopup("Ambulanse fra Sætre på oppdrag i Drammen"),
    pinAMKAas = L.marker([59.629409, 10.605369]).bindPopup("Første ambulanse fra Ås, på vei til sepsis"),
    pinAMKAas2 = L.marker([59.66519, 10.79308]).bindPopup("Ny ambulanse sendes fra Ås, sendes til hjerteinfarkt");

let pins = L.layerGroup([pinSepsis, pinHjerteinfarkt, pinAMKDrammen, pinAMKAas, pinAMKAas2]);
pins.addTo(map); // Add pins to the map

let openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

let baseMaps = {
    "OpenStreetMap": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    "OpenTopoMap": openTopoMap
};

let overlayMaps = {
    "Pins": pins
};

L.control.layers(baseMaps, overlayMaps).addTo(map);