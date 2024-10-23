/* Sjekker om noe er i viewport (For å skru av hjerte-animasjon) */
/* function inViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
} */

/* eventlistener som viser når pulse-animation er på (når id intro er i viewport) og av */
/* document.addEventListener('scroll', function () {
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
}); */



/*******   Kart fra mapLibre  ********/

const map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [10.72627, 59.65984],
    zoom: 18,
    bearing: 0,
    pitch: 0
});

const chapters = {
    'amk-sentral': {
        center: [10.72627, 59.65984],
        bearing: 0,
        pitch: 20,
        zoom: 11
    },
    'amk-saetre': {
        center: [10.20585, 59.74396],
        bearing: 0,
        pitch: 20,
        zoom: 11
    },
    'amk-aas': {
        center: [10.72627, 59.65984],
        bearing: 0,
        pitch: 20,
        zoom: 17
    },
    'amk-aas-ut': {
        center: [10.72509, 59.65985],
        bearing: 0,
        pitch: 20,
        zoom: 13
    },
    'tofte-sepsis': {
        center: [10.53206, 59.53686],
        bearing: 0,
        pitch: 20,
        zoom: 12,
    },
    'amk-sentral-nymeld': {
        center: [10.72509, 59.65985],
        bearing: 0,
        pitch: 20,
        zoom: 17
    },
    'tofte-hjerte': {
        center: [10.55302, 59.54466],
        bearing: 0,
        pitch: 20,
        zoom: 12
    },
};

/* Markører */

const markerSentral = new maplibregl.Marker().setLngLat([10.72627, 59.65984]).addTo(map);
const markerAmkSatre = new maplibregl.Marker().setLngLat([10.20585, 59.74396]).addTo(map);
const markerAmkAas1 = new maplibregl.Marker().setLngLat([10.72509, 59.65985]).addTo(map);
const markerAmkAas2 = new maplibregl.Marker().setLngLat([10.72509, 59.65985]).addTo(map);
const markerSepsis = new maplibregl.Marker().setLngLat([10.53206, 59.53686]).addTo(map);
const markerHjerte = new maplibregl.Marker().setLngLat([10.55302, 59.54466]).addTo(map);

/* For hver scroll, sjekk hvilket el som er i skjermen */
window.onscroll = function () {
    const chapterNames = Object.keys(chapters);
    for (let i = 0; i < chapterNames.length; i++) {
        const chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            console.log(`Chapter on screen: ${chapterName}`);
            setActiveChapter(chapterName);
            break;
        }
    }
};

/* Setter aktivt element og stilsetter */
let activeChapterName = 'amk-sentral';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).classList.add('active');
    document.getElementById(activeChapterName).classList.remove('active');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}