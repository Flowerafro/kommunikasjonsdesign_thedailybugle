const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // Hybrid style URL
    center: [10.47039, 59.70156],
    zoom: 9,
    minZoom: 5,
    maxZoom: 15
});

map.on('load', () => {
    // Define the GeoJSON source with 3 points
    const geojsonData = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Ås',
                    'moreInfo': 'Ambulansesentral som dekker området Drøbak, Nesodde, Ås, Vestby og Vinterbro.',
                    'iconSize': [80, 80],
                    'iconUrl': 'IMG/hospital.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [10.72594, 59.65978]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'AMK-Sætre',
                    'moreInfo': 'Ambulansen fra avdelingen i Sætre som har ansvar for Tofte, befinner seg på et oppdrag i Drammen. 45 minutter unna sykdomstilfellene i Tofte.',
                    'iconSize': [80, 80],
                    'iconUrl': 'IMG/amkbil.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [10.20406, 59.74327]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'description': 'Utrykningssted',
                    'moreInfo': 'Utrykningsdestinasjon for AMK i Ås. Siden AMK fra Sætre var i Drammen måtte en AMK fra Ås sendes hit. 50 minutter unna.',
                    'iconSize': [80, 80],
                    'iconUrl': 'IMG/person.png'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [10.55771, 59.54146]
                }
            }
        ]
    };

    // Add markers to map
    geojsonData.features.forEach((marker) => {
        // Create a DOM element for the marker
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${marker.properties.iconUrl})`;
        el.style.width = `${marker.properties.iconSize[0]}px`;
        el.style.height = `${marker.properties.iconSize[1]}px`;
        el.style.backgroundSize = '100%';

        // Create a popup for the marker
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        popupContent.innerHTML = `<p>${marker.properties.description}</p><button>Les mer</button><div class="more-info"><p>${marker.properties.moreInfo}</p></div>`;

        const popup = new maplibregl.Popup({ closeOnClick: false, closeButton: true, offset: 25 })
            .setDOMContent(popupContent)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

        // Add click event to toggle more information
        popupContent.querySelector('button').addEventListener('click', () => {
            const moreInfoDiv = popupContent.querySelector('.more-info');
            moreInfoDiv.classList.toggle('show');
        });

        // Add marker to map
        const markerElement = new maplibregl.Marker({ element: el })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

        // Add click event to the marker to open the popup and show more information
        markerElement.getElement().addEventListener('click', () => {
            popup.setLngLat(marker.geometry.coordinates).addTo(map);
            const moreInfoDiv = popupContent.querySelector('.more-info');
            moreInfoDiv.classList.add('show');
        });
    });

    // Create a GeoJSON source with an empty LineString
    const lineGeoJSON = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': []
                }
            }
        ]
    };

    map.addSource('line', {
        'type': 'geojson',
        'data': lineGeoJSON
    });

    // Add the line which will be modified in the animation
    map.addLayer({
        'id': 'line-animation',
        'type': 'line',
        'source': 'line',
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#ff0000',
            'line-width': 5,
            'line-opacity': 0.8
        }
    });

    const path = [
        [10.72594, 59.65978], /* start: Ås */
        [10.73797, 59.70663], /* til oslofjordstunnellen */
        [10.62395, 59.67029], /* inn Oslofjordstunnellen */
        [10.58817, 59.65431], /* ut av Oslofjordstunellen*/
        [10.60929, 59.57867], /* på vei til Tofte */
        [10.55771, 59.54146] /* Ankomst Tofte / Ulykkested*/
    ];
    const speedFactor = 0.005; // Decreased speed factor to slow down the animation

    let animation;
    let progress = 0;

    function animateLine(timestamp) {
        progress += speedFactor;
        if (progress > 1) {
            progress = 1;
        }

        const segmentIndex = Math.floor(progress * (path.length - 1));
        const segmentProgress = (progress * (path.length - 1)) - segmentIndex;

        const start = path[segmentIndex];
        const end = path[segmentIndex + 1];

        const currentPosition = [
            start[0] + (end[0] - start[0]) * segmentProgress,
            start[1] + (end[1] - start[1]) * segmentProgress
        ];

        lineGeoJSON.features[0].geometry.coordinates.push(currentPosition);
        map.getSource('line').setData(lineGeoJSON);

        if (progress < 1) {
            animation = requestAnimationFrame(animateLine);
        }
    }

    // Start animation on button click
    document.getElementById('start-animation').addEventListener('click', () => {
        progress = 0;
        lineGeoJSON.features[0].geometry.coordinates = [];
        animateLine();
    });
});

map.scrollZoom.disable();


/************************************* timeline Images  *************************/

function showImage(imageId) {
    const images = document.querySelectorAll('.timeline .images img');
    images.forEach(img => img.classList.remove('active'));

    const selectedImage = document.getElementById(imageId);
    selectedImage.classList.add('active');
}