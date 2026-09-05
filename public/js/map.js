const map = L.map("map");

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Data from OSM
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Get data from the HTML element
const mapElement = document.getElementById("map");

const coordinates = JSON.parse(mapElement.dataset.coordinates);
const listingName = mapElement.dataset.title;

// MongoDB / GeoJSON -> [longitude, latitude]
// Leaflet -> [latitude, longitude]

const longitude = coordinates[0];
const latitude = coordinates[1];

map.setView([latitude, longitude], 13);

const marker = L.marker([latitude, longitude])
    .addTo(map);

marker.bindPopup(listingName).openPopup();