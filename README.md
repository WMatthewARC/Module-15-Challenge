# Module-15-Challenge | Leaflet



Background:
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!
The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.


-----------




### Part 1: Create the Earthquake Visualization

#### 1. Get your dataset

  - Tectonic Plates -> https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json
  
  - Eathquakes -> https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson


#### 2. Import and visualizes


 ````
//Go get Tectonic Plates data and format

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){

    L.geoJson(plateData,{
        //add style to make lines visible
        color: "yellow",
        weight: 4
    }).addTo(tectonicplates);
});


//Go get data for eathquake and format

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
.then(
    function(earthquakeData) {

        function dataColor(depth) {
            if (depth > 90)
                return "red";
            else if(depth > 70)
                return "#fc4903";
            else if(depth > 50)
                return "#fc8403";
            else if(depth > 30)
                return "#fcad03";
            else if(depth > 10)
                return "#cafc03";
            else 
                return "green"; 
        }
        
        function radiusSize(mag) {
            if (mag == 0)
                return 1; //make mag 0
            else
                return mag * 5;
        }
        function dataStyle(feature) {
            return{
                opacity: 1,
                fillOpacity: .5,
                fillColor: dataColor(feature.geometry.coordinates[2]),
                color: "0000000",
                radius: radiusSize(feature.properties.mag),
                weight: 0.5
            }
        }
````


#### 3. Earthquake Visualization
![Capture001](https://user-images.githubusercontent.com/30300016/197085636-b3ecc3ca-be31-4af2-8807-259449fa77b0.JPG)



### Part 2: Gather and Plot More Data (Optional)

#### 1. Plot the tectonic plates dataset on the map in addition to the earthquakes
  ![Capture002](https://user-images.githubusercontent.com/30300016/197085791-f43531a5-fa1f-4904-a182-e8f37a98a73e.JPG)


#### 2. Add other base maps

 - Grayscale   
    ![Capture004](https://user-images.githubusercontent.com/30300016/197085149-fd4d44f6-54d0-4361-8481-94388ae482ce.JPG)

 - Topography
     ![Capture003](https://user-images.githubusercontent.com/30300016/197085156-35b13113-b35a-42ec-8884-2cacd92f48b0.JPG)



#### 3. Put each dataset into separate overlays that can be turned on and off independently.

  ![icon options](https://user-images.githubusercontent.com/30300016/197085995-695e201f-b38f-4756-b602-b422f20d2a5a.JPG)

#### 4. Add a legend

- ![Legend](https://user-images.githubusercontent.com/30300016/197086154-5776d2e9-5c56-4fe0-92be-2798158af686.JPG)
-  ````
        // add legend
        let legend = L.control({
            position: "bottomright"
        });

        legend.onAdd = function() {
            let div = L.DomUtil.create("div", "info legend");

            let intervals = [-10, 10, 30, 50, 70, 90];
            let colors = ["green", "#cafc03", "#fcad03", "#fc8403", "#fc4903", "red"];

            for(var i=0; i<intervals.length; i++) {
                let span = `<span class="legend-icon" style="background-color:${colors[i]}"></span>`;
                let interval = intervals[i] + (intervals[i+1] ? "km - " + intervals[i+1] + "km<br>" : "+");
                div.innerHTML += `<div class="legend-row">${span}&nbsp;${interval}</div>`;
            }
            return div;
        }

        legend.addTo(myMap);
    
    ````  

### :octocat: “The dog got into the fried chicken, we forgot the sunscreen, and the kids started whining at the end, but all in all the picnic was a success.”
    
![Capture005](https://user-images.githubusercontent.com/30300016/197086974-7bfa4f52-2214-4131-bc28-9014eb327820.JPG)
   
   ## Thank you for your time and review.
