/*******   Kart fra mapLibre  ********/

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [10.72627, 59.65984],
    zoom: 16,
    bearing: 0,
    pitch: 0
});
const chapters = {
    'amk-sentral': {
        center: [10.72627, 59.65984],
        bearing: 0,
        pitch: 0,
        zoom: 7
    },
    'amk-sentral-til-saetre': {
        center: [10.20585, 59.74396],
        bearing: 0,
        pitch: 20,
        zoom: 17
    },
    'amk-sentral-til-aas': {
        center: [10.20585, 59.74396],
        bearing: 0,
        pitch: 20,
        zoom: 11
    },
    'amk-aas-ut': {
        center: [10.72344, 59.65897],
        bearing: 0,
        pitch: 20,
        zoom: 16
    },
    'tofte-sepsis': {
        center: [10.53206, 59.53686],
        bearing: 0,
        pitch: 20,
        zoom: 15,
    },
    'amk-sentral-nymeld': {
        center: [10.53206, 59.53686],
        bearing: 0,
        pitch: 20,
        zoom: 13
    },
    'tofte-hjerte': {
        center: [10.55302, 59.54466],
        bearing: 0,
        pitch: 20,
        zoom: 15
    },
};
/* Funksjon som lager markører og pop-up info*/

function makeMarker(lngLat, imageUrl, popupText) {
    const mark = document.createElement('div');
    mark.style.backgroundImage = `url(${imageUrl})`;
    mark.style.backgroundSize = 'cover';
    mark.style.width = '50px';
    mark.style.height = '50px';
    mark.style.borderRadius = '50%';
    mark.style.cursor = 'pointer';

    const popup = new maplibregl.Popup({ offset: 25 }).setText(popupText);

    new maplibregl.Marker({ element: mark }).setLngLat(lngLat).setPopup(popup).addTo(map);
}

/* Markører med custom img og popups*/

makeMarker([10.72627, 59.65984], 'IMG/sentral.png', 'Ambulansesentralen i Ås');
makeMarker([10.20585, 59.74396], 'IMG/amkbil.png', 'Ambulanse som tilhører Sætre, på oppdrag i Drammen');
makeMarker([10.72497, 59.65924], 'IMG/amkbil2.png', 'En av to ambulanser som tilhører Ås. Sendes ut til kvinnen med Sepsis.');
makeMarker([10.55326, 59.54381], 'IMG/amkbil3.png', 'Den andre ambulansen som tilhører Ås. Sendes ut til hjerteinfarkt i Tofte.');
makeMarker([10.53206, 59.53686], 'IMG/pasient.png', 'Kvinnen med sepsis, bor i Tofte.');
makeMarker([10.53359, 59.53704], 'IMG/amkbil2.png', 'Første ambulanse fra Ås, ankommet kvinnen i Tofte.');
makeMarker([10.55302, 59.54466], 'IMG/pasient2.png', 'Mannen med hjerteinfarkt, bor 7 minutter unna kvinnen med sepsis i Tofte.');

/* const markerSentral = new maplibregl.Marker().setLngLat([10.72627, 59.65984]).addTo(map);
const markerAmkSatre = new maplibregl.Marker().setLngLat([10.20585, 59.74396]).addTo(map);
const markerAmkAas1 = new maplibregl.Marker().setLngLat([10.72509, 59.65985]).addTo(map);
const markerAmkAas2 = new maplibregl.Marker().setLngLat([10.72509, 59.65985]).addTo(map);
const markerSepsis = new maplibregl.Marker().setLngLat([10.53206, 59.53686]).addTo(map);
const markerHjerte = new maplibregl.Marker().setLngLat([10.55302, 59.54466]).addTo(map); */

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