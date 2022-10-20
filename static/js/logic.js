//tile layers

var defultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// gray scale layer
var grayscale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

//make a basemap object
let basemap= {
    Defult: defaultMap,
    Grayscale: grayscale
};


//make a map object
var myMap = L.map("map", {
    center:[36.1656, -119.9001],
    zoom: 3,
    layers: [defaultMap, grayscale]
});


//add defult map
defultMap.addTo(myMap);

//add the layer control
L.control.layers(basemaps).addTo(myMap);



