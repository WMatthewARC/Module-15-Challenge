//tile layers

var defultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


//make a map object
var myMap = L.map("map", {

    center:[32.1656, 82.9001]
    zoom: 3
});

//add defult map
defultMap.addTo(myMap);




