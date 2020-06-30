var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", function(data) {
    console.log(data.features)

    var quakes = L.geoJSON(data, {
        pointToLayer: function(feature, lat_lon) {
            // assign color
            var mag = feature.properties.mag;

            if (mag > 5) {
                var color = "red";
            } else if (mag > 4) {
                var color = "darkorange";
            } else if (mag > 3) {
                var color = "orange";
            } else if (mag > 3) {
                var color = "yellow";
            } else if (mag > 2) {
                var color = "yellowgreen";
            } else {
                var color = "lightgreen"
            };

            // return circleMarker
            return L.circleMarker( lat_lon, {
                radius: mag*3,
                fillColor: color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7
            })
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude = " + feature.properties.mag + "</h3><hr>" +
                            "<p>" + feature.properties.title + "</p>");
        }
    });

    var overlayMaps = {
        Earthquakes: quakes
    };

    var baseMaps = {
        "lightmap": lightmap
    };

    var myMap = L.map("map", {
        center: [
          45.83, -138.98
        ],
        zoom: 3,
        layers: [lightmap, quakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

});
