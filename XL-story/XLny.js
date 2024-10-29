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
                    'description': 'Ambulansesentral',
                    'moreInfo': 'Ambulansesentral som dekker området Drøbak, Nesodden, Ås, Vestby og Vinterbro.',
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

        // Add click event to show more information
        el.addEventListener('click', () => {
            const popupContent = document.createElement('div');
            popupContent.className = 'popup-content';
            popupContent.innerHTML = `<p>${marker.properties.description}</p><button>Show More</button><div class="more-info"><p>${marker.properties.moreInfo}</p></div>`;

            const popup = new maplibregl.Popup({ closeOnClick: false, closeButton: false, offset: 25 })
                .setLngLat(marker.geometry.coordinates)
                .setDOMContent(popupContent)
                .addTo(map);

            popupContent.querySelector('button').addEventListener('click', () => {
                const moreInfoDiv = popupContent.querySelector('.more-info');
                if (moreInfoDiv.style.display === 'none' || moreInfoDiv.style.display === '') {
                    moreInfoDiv.style.display = 'block';
                } else {
                    moreInfoDiv.style.display = 'none';
                }
            });
        });

        // Add marker to map
        new maplibregl.Marker({ element: el })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });
});

