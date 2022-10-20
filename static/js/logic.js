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



//Topography
let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});



//make a basemap object
let basemaps= {
    Defult: defultMap,
    Grayscale: grayscale,
    "Topography": topoMap,
};



//make a map object
var myMap = L.map("map", {
    center:[36.1656, -119.9001],
    zoom: 3,
    layers: [defultMap, grayscale, topoMap]
});


//add defult map
defultMap.addTo(myMap);


//get the data for the tect plates and draw on the map
//variable to hold the tect plates layer
let tectonicplates = new L.layerGroup();

//call the api to site
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    //console log to check
    //console.log(plateData);

    //load data useing Json and add to the plates layer
    L.geoJson(plateData,{
        //add style to make lines visible
        color: "yellow",
        weight: 1
    }).addTo(tectonicplates);
});

//add the plates to the map
tectonicplates.addTo(myMap);

// variable to hold the earthquake data layer
let earthquakes = new L.layerGroup();

// go get data for eathquake and populate thelayer
//call the USGA geoJSOn API
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
.then(
    function(earthquakeData){
        //console log to check
        //console.log(earthquakeData);

        //plot circles for earthquakes and color is depdent on depth
        function dataColor(depth){
            if (depth > 90)
                return "red";
            else if(depth > 70)
                return "#fc8403";
            else if(depth > 50)
                return "#fc8403";
            else if(depth > 30)
                return "#fcad03";
            else if(depth > 10)
                return "#cafc03";
            else 
                return "green"; 
        }
        
        // Function for the size of the circles 
        function radiusSize(mag){
            if (mag == 0)
                return 1; //make mag 0
            else
                return mag * 5;
        }
        // adding style to circles
        function dataStyle(feature)
        {
            return{
                opacity: 1,
                fillOpacity: 1,
                fillColor: dataColor(feature.geometry.coordinates[2]),
                color: "0000000",
                radius: radiusSize(features.properties.mag),
                weight: 0.5

            }
        }

        //add the GeoJson
        L.geoJson(earthquakeData, {

        }).addTo(earthquakes);

    }
);





// add the overlay for the plates and earthquakes
let overlays = {
    "Tectonic Plates": tectonicplates
};

//add the layer control
L.control
    .layers(basemaps, overlays)
    .addTo(myMap);

