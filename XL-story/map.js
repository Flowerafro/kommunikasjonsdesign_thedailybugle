/*******   Kart fra mapLibre  ********/


/*

1. nærme zoom av sepsis i Tofte (og se Sætre) 
2. zoom ut så syns Drammen
3. zoom ut så syns Drammen, Ås og Tofte
4. pins (markør) på alle steder og ambulanser: går det an å han statiske tekst-bokser over pins?
*/

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [10.72627, 59.65984],
    zoom: 10,
    bearing: 0,
    pitch: 0
});
const places = {
    'amk-sentral': {
        center: [10.72627, 59.65984],
        bearing: 0,
        pitch: 0,
        zoom: 10
    },
    'amk-sentral-til-saetre': {
        center: [10.20585, 59.74396],
        bearing: 0,
        pitch: 20,
        zoom: 10
    },
    'amk-sentral-til-aas': {
        center: [10.20585, 59.74396],
        bearing: 0,
        pitch: 20,
        zoom: 10
    },
    'amk-aas-ut': {
        center: [10.72344, 59.65897],
        bearing: 0,
        pitch: 20,
        zoom: 10
    },
    'tofte-sepsis': {
        center: [10.53206, 59.53686],
        bearing: 0,
        pitch: 20,
        zoom: 10,
    },
    'amk-sentral-nymeld': {
        center: [10.53206, 59.53686],
        bearing: 0,
        pitch: 20,
        zoom: 10
    },
    'tofte-hjerte': {
        center: [10.55302, 59.54466],
        bearing: 0,
        pitch: 20,
        zoom: 8
    },
};
/******************* * Funksjon som lager markører og pop-up info *******************/

function makeMarker(lngLat, imageUrl, popupText) {
    const mark = document.createElement('div');
    mark.style.backgroundImage = `url(${imageUrl})`;
    mark.style.backgroundSize = 'cover';
    mark.style.backgroundPosition = 'center';
    mark.style.width = '50px';
    mark.style.height = '50px';
    /*     mark.style.borderRadius = '50%'; */
    mark.style.cursor = 'pointer';

    const popup = new maplibregl.Popup({ offset: 25 }).setText(popupText);

    new maplibregl.Marker({ element: mark }).setLngLat(lngLat).setPopup(popup).addTo(map);
}

/****************** Markører med custom img og popups *****************************/

makeMarker([10.72627, 59.65984], 'IMG/sentral.png', 'Ambulansesentralen i Ås');
makeMarker([10.20585, 59.74396], 'IMG/amkbil.png', 'Ambulanse som tilhører Sætre, på oppdrag i Drammen');
makeMarker([10.72497, 59.65924], 'IMG/amkbil2.png', 'En av to ambulanser som tilhører Ås. Sendes ut til kvinnen med Sepsis.');
makeMarker([10.55326, 59.54381], 'IMG/amkbil3.png', 'Den andre ambulansen som tilhører Ås. Sendes ut til hjerteinfarkt i Tofte.');
makeMarker([10.53206, 59.53686], 'IMG/pasient.png', 'Kvinnen med sepsis, bor i Tofte.');
makeMarker([10.53359, 59.53704], 'IMG/amkbil2.png', 'Første ambulanse fra Ås, ankommet kvinnen i Tofte.');
makeMarker([10.55302, 59.54466], 'IMG/pasient2.png', 'Mannen med hjerteinfarkt, bor 7 minutter unna kvinnen med sepsis i Tofte.');


/******************* * For hver scroll, sjekk hvilket el som er i skjermen **************/
window.onscroll = function () {
    const placeNames = Object.keys(places);
    for (let i = 0; i < placeNames.length; i++) {
        const placeName = placeNames[i];
        if (isElementOnScreen(placeName)) {
            console.log(`Chapter on screen: ${placeName}`);
            setActiveChapter(placeName);
            break;
        }
    }
};

/******************** * Setter aktivt element og stilsetter ***************************/
let activePlaceName = 'amk-sentral';
function setActiveChapter(placeName) {
    if (placeName === activePlaceName) return;

    map.flyTo(places[placeName]);

    document.getElementById(placeName).classList.add('active');
    document.getElementById(activePlaceName).classList.remove('active');

    activePlaceName = placeName;
}
function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

