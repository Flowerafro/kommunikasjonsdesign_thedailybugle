const map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [12.550343, 55.665957],
    zoom: 8
});

const marker = new maplibregl.Marker()
    .setLngLat([12.550343, 55.665957])
    .addTo(map);