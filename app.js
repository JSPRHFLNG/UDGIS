require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/geometry/Polyline",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/TextSymbol"
], function(Map, MapView, GraphicsLayer, Graphic, Polyline, PictureMarkerSymbol, TextSymbol) {

// Skapa en karta
var map = new Map({
    basemap: "topo-vector"
});

// Skapa en vy för kartan
var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [17.2098, 60.4423], // Gävle
    zoom: 10
});

var blueLayer = new GraphicsLayer();
var greenLayer = new GraphicsLayer();
var purpleLayer = new GraphicsLayer();

//map.addMany([blueLayer, greenLayer, purpleLayer]);

// Skapa ett lager för grafiken
var graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

var wayPointLayer = new GraphicsLayer(); // Lager för POI
var labelLayer = new GraphicsLayer(); // Lager för labels

var sessionWayPointLayer = new GraphicsLayer();
sessionWayPointLayer.visible = true;

map.add(wayPointLayer);
map.add(labelLayer);
map.add(sessionWayPointLayer);


// Funktion för att hämta data och skapa polyline (Grön Led)
function addPolyline(url, color, layer) {
  fetch(url)
      .then(response => response.json())
      .then(data => {
          var lineCoordinates = data.posts.map(function(post) {
              return [parseFloat(post.longitude), parseFloat(post.latitude)];
          });

          var polyline = new Polyline({
              paths: [lineCoordinates]
          });

          var polylineSymbol = {
              type: "simple-line",
              color: color,
              width: 2
          };

          var polylineGraphic = new Graphic({
              geometry: polyline,
              symbol: polylineSymbol
          });

          layer.add(polylineGraphic);
      })
      .catch(err => console.error(err));
}

// Funktion för att hämta data och skapa punkter
function addEtapp(url, color, layer) {
      fetch(url)
          .then(response => response.json())
          .then(data => {
              data.posts.forEach(function(post) {
                  var point = {
                      type: "point",
                      longitude: parseFloat(post.longitude),
                      latitude: parseFloat(post.latitude)
                  };

                  var simpleMarkerSymbol = {
                      type: "simple-marker",
                      color: color, // Färg för punkten
                      size: "5px",
                      outline: {
                        color: "white",
                        width: 1
                    }
                  };

                  var pointGraphic = new Graphic({
                      geometry: point,
                      symbol: simpleMarkerSymbol
                  });

                  layer.add(pointGraphic);
              });
          })
          .catch(err => console.error(err));
}

// Funktion för att hämta data och skapa streckade linjer (Blå Led)
function addDashedLine(url, color, layer) {
  fetch(url)
      .then(response => response.json())
      .then(data => {
          var lineCoordinates = data.posts.map(function(post) {
              return [parseFloat(post.longitude), parseFloat(post.latitude)];
          });

          var polyline = new Polyline({
              paths: [lineCoordinates]
          });

          var dashedLineSymbol = {
              type: "simple-line",
              color: color,
              width: 2,
              style: "dash" // Streckad linje
          };

          var polylineGraphic = new Graphic({
              geometry: polyline,
              symbol: dashedLineSymbol
          });

          layer.add(polylineGraphic);
      })
      .catch(err => console.error(err));
}

// Funktion för att toggla lagrets synlighet och uppdatera knapptexten
function toggleLayer(buttonId, layer, visibleText, hiddenText) {
  const button = document.getElementById(buttonId);
  let isLayerVisible = true;  // Spåra lagrets synlighet

  button.addEventListener("click", function() {
      if (isLayerVisible) {
          map.remove(layer);  // Ta bort lagret från kartan
          button.textContent = hiddenText;
      } else {
          map.add(layer);  // Lägg till lagret till kartan
          button.textContent = visibleText;
      }
      isLayerVisible = !isLayerVisible;  // Uppdatera synlighetsstatus
  });
}

// Lägg till event listeners med dynamisk knapptext
toggleLayer("toggleBlue", blueLayer, "ta bort", "Visa cykel- och vandringsleder utan höjdökning");
toggleLayer("toggleGreen", greenLayer, "ta bort", "Visa slingor");
toggleLayer("togglePurple", purpleLayer, "ta bort", "Visa cykel- och vandringsleder med höjdökning");

// Biking/walking NO elevation 
addEtapp('http://localhost:8080/read_json.php?file=Etapp_11_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_12_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_13_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_14_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_15_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_16_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_17_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_19_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_20_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_21_wgs84.json', 'blue', blueLayer);
addEtapp('http://localhost:8080/read_json.php?file=Etapp_22_wgs84.json', 'blue', blueLayer);


// Biking/walking NO elevation (slinga)
addPolyline('http://localhost:8080/read_json.php?file=Etapp_Slinga_11_1_wgs84.json', 'green', greenLayer);
addPolyline('http://localhost:8080/read_json.php?file=Etapp_Slinga_12_1_wgs84.json', 'green', greenLayer);
addPolyline('http://localhost:8080/read_json.php?file=Etapp_Slinga_12_2_inkl_kolkoja_wgs84.json', 'green', greenLayer);
addPolyline('http://localhost:8080/read_json.php?file=Etapp_Slinga_12_1_wgs84.json', 'green', greenLayer);


// Biking/walking with elevation
addDashedLine('http://localhost:8080/read_json2.php?file=Biking_elevation161008.json', 'purple', purpleLayer);
addDashedLine('http://localhost:8080/read_json2.php?file=Walk_elevation123547.json', 'purple', purpleLayer);
addDashedLine('http://localhost:8080/read_json2.php?file=Walk_elevation_151851.json', 'purple', purpleLayer);



// Filtrera bort leder 
document.getElementById("toggleBlue").addEventListener("click", function() {
  blueLayer.visible = !blueLayer.visible;
  
});

document.getElementById("toggleGreen").addEventListener("click", function() {
  greenLayer.visible = !greenLayer.visible;
  
});

document.getElementById("togglePurple").addEventListener("click", function() {
  purpleLayer.visible = !purpleLayer.visible;

});



























var gpxPoints = [


// Hedesundafjärden
{ lat: 60.19891,  lon: 17.1291,    name: "Festplatsen",    type: "Rastplats",          description: "",                                                                                               imageUrl: ""},
{ lat: 60.20745,  lon: 17.3406,    name: "Gnupe",          type: "Grillplats",         description: "Rastplats med stenbotten och synnerligen svår angöring. Det är 10 m till lastningsplats och parkering.",                                                                                                          imageUrl: "http://localhost:8080/Image/Gnupe.png"},
{ lat: 60.298647, lon: 17.03722,   name: "Hade",           type: "Badplats",           description: "Rast och iläggningsplats med grusbotten. Det är 20 m till lastningsplats och 50 m till parkering.",                                                                                                               imageUrl: "http://localhost:8080/Image/Hade.png"},
{ lat: 60.319739, lon: 17.032853,  name: "Korsnäset",      type: "Rastplats",          description: "Rast- och iläggningsplats med sandbotten och 30 m till lastningsplats och parkering.",                                                                                                                            imageUrl: "http://localhost:8080/Image/Korsnaset.png"},
{ lat: 60.22312,  lon: 17.2812,    name: "Kvillanudden",   type: "Vandring",           description: "Här kan du vandra",                                                                                                                                                                                               imageUrl: "http://localhost:8080/Image/Kvillanudden.png"},
{ lat: 60.371665, lon: 17.027328,  name: "Norra sundet",   type: "Badplats",           description: "Här kan du bada med brygga och ta en paus i vardagen.",                                                                                                                                                           imageUrl: "http://localhost:8080/Image/Norra_sundet.png"},
{ lat: 60.350155, lon: 17.020365,  name: "Sandsnäsbadet",  type: "Badplats",           description: "Rast- och iläggningsplats med sandbotten och 50 m till lastningsplats och parkering.",                                                                                                                            imageUrl: "http://localhost:8080/Image/Sandsnasbadet.png"},
{ lat: 60.1872,   lon: 17.2239,    name: "Södra sundet",   type: "Rastplats",          description: "Rast och iläggningsplats med grusbotten. Det är 10 m till lastningsplats och 50 m till parkering.",                                                                                                               imageUrl: "http://localhost:8080/Image/Sodra_sundet.png"},
{ lat: 60.366079, lon: 17.032521,  name: "Åshuvudet",      type: "Rastplats",          description: "Det är sandbotten vid platsen.",                                                                                                                                                                                  imageUrl: "http://localhost:8080/Image/Ashuvudet.png"},
{ lat: 60.22987,  lon: 17.5701,    name: "Östveda",        type: "Badplats",           description: "Rastplats vid Gästrikeleden och för paddlare. Vid platsen är det sandbotten, 10 m till lastningsplats och 100 m till parkering",                                                                                  imageUrl: "http://localhost:8080/Image/Ostveda.png"},


// Färnebofjärden
{ lat: 60.219227, lon: 16.847813,  name: "Brattnäset",      type: "Grillplats", description: "Vid platsen är det stenbotten.", imageUrl:"http://localhost:8080/Image/Brattnaset.png"},
{ lat: 60.238677, lon: 16.814736,  name: "Bårbyhällan",     type: "Grillplats", description: "Här kan man ta en fikapaus och grilla.", imageUrl:"http://localhost:8080/Image/Barbyhallan.png"},
{ lat: 60.177689, lon: 16.801658,  name: "Båtsportklubben", type: "Grillplats", description: "Vid platsen är det stenbotten, 5 m till avlastningsplats och 100 m till parkering.", imageUrl:"http://localhost:8080/Image/Batsportsklubben.png"},
{ lat: 60.14346,  lon: 16.47136,   name: "Dragsheden väst", type: "Rastplats", description: "Vid platsen är det grusbotten och 50 m till avlastningsplats. Observera att vid lågt vattenstånd kan passagen under vägen vara torrlagd.", imageUrl:"http://localhost:8080/Image/Dragsheden.png"},
{ lat: 60.14204,  lon: 16.47466,   name: "Dragsheden öst",  type: "Rastplats", description: "Det är stenbotten på platsen. Iläggning kan göras ca 50 m norr om vägtrumman. Observera att vid lågt vattenstånd kan passagen under vägen vara torrlagd och att det är dåligt med parkeringsplatser på platsen.", imageUrl:"http://localhost:8080/Image/Dragsheden_ost.png"},
{ lat: 60.197745, lon: 16.748013,  name: "Göknäset",        type: "Rastplats", description: "På platsen är det grusbotten blandat med större stenar.", imageUrl:"http://localhost:8080/Image/Goknaset.png"},                                                                                                                                                               
{ lat: 60.209724, lon: 16.788901,  name: "Sandön",          type: "Grillplats", description: "Rastplats med eldstad och sittbänkar.", imageUrl:"http://localhost:8080/Image/Sandon.png"},                                                                                                                                                                                  
{ lat: 60.212219, lon: 16.849755,  name: "Skekarsbo",       type: "Vindskydd", description: "Rastplats med vindskydd och eldstad på vägen upp mot utkikstornet.", imageUrl:"http://localhost:8080/Image/Skekarsbo.png"},                                                                                                                                                      
{ lat: 60.13012,  lon: 16.47824,   name: "Strångnäs",       type: "Vindskydd", description: "Rastplats med tillgänglighetsanpassat vindskydd och eldstad. Ligger ca 30 m från parkering.", imageUrl:"http://localhost:8080/Image/Strangnas.png"},                                                                                                                             
{ lat: 60.10404,  lon: 16.47415,   name: "Östa Camping",    type: "Rastplats", description: "Vid platsen är det stenbotten, 100 m till avlastningsplats och 200 m till parkering.",  imageUrl:"http://localhost:8080/Image/Osta_camping.png"},                                                                                                                      
{ lat: 60.173351, lon: 16.791122,  name: "Östa norr",       type: "Vindskydd", description: "Vid platsen är det stenbotten och 300 m till avlastningsplats och parkering.", imageUrl:"http://localhost:8080/Image/Osta_norr.png"},                                                                                                                                            
{ lat: 60.176483, lon: 16.785071,  name: "Östa väst",       type: "Rastplats", description: "Vid platsen är det stenbotten.", imageUrl:"http://localhost:8080/Image/Osta_vast.png"},                                                                                                                                                                                         
  

//Gysinge 
{ lat: 60.286982,  lon: 16.880171,  name: "Café Udden",     type: "Cafe", description: "Café vackert belägen vid Dalälven som serverar lunch med fin utsikt. ", imageUrl:"http://localhost:8080/Image/Cafe_udden.png"},
{ lat: 60.281196,  lon: 16.805992,  name: "Edsviken",       type: "Badplats", description: "Platsen sköts av kultur- och fritidsförvaltningen.", imageUrl:"http://localhost:8080/Image/Edsviken.png"},
{ lat: 60.287094,  lon: 16.885128,  name: "Gysinge",        type: "Naturreservat", description: "Många besöker Gysingeområdet för att vandra, fiska eller paddla.",  imageUrl:"http://localhost:8080/Image/Gysinge.png"},
{ lat: 60.261745,  lon: 16.836784,  name: "Gärdsvekarna",   type: "Rastplats", description: "Landstigning ca 150 m söder om stugan. Det är grusbotten på platsen.", imageUrl:"http://localhost:8080/Image/Gardsvekarna.png"},
{ lat: 60.253702,  lon: 16.794437,  name: "Ista",           type: "Naturreservat", description: "Här kan du grilla vid den iordningställda eldplatsen", imageUrl:"http://localhost:8080/Image/Ista.png"},
{ lat: 60.26224,   lon: 16.808814,  name: "Karlholm",     type: "Rastplats", description: "Bästa angöring på öns östra sida, 50 m norr om vindskyddet. Det är grusbotten vid denna plats.", imageUrl:"http://localhost:8080/Image/Karlholm.png"},

];


function getIconForType(type) {
  switch(type) {
    case "Badplats":
      return "http://localhost:8080/read_icon.php?file=Badplats.png";
    case "Cafe":
      return "http://localhost:8080/read_icon.php?file=Cafe.png";
    case "Grillplats":
      return "http://localhost:8080/read_icon.php?file=Grillplats.png";
    case "Vindskydd":
      return "http://localhost:8080/read_icon.php?file=Vindskydd.png";
    case "Rastplats":
      return "http://localhost:8080/read_icon.php?file=rastplats.png";
      case "Naturreservat":
        return "http://localhost:8080/read_icon.php?file=Naturreservat.png";
    default:
      return "http://localhost:8080/read_icon.php?file=pin.png"; // En standardikon om typen inte matchar
  }
}

function addPOI() {
  gpxPoints.forEach(function(point) {
    var pointGeometry = {
      type: "point",
      longitude: point.lon,
      latitude: point.lat
    };

    var pictureMarkerSymbol = new PictureMarkerSymbol({
      url: getIconForType(point.type),
      width: "24px",
      height: "24px"
    });


    var pointGraphic = new Graphic({
      geometry: pointGeometry,
      symbol: pictureMarkerSymbol,
      attributes: {
        name: point.name,
        type: point.type,
        description: point.description,
        imageUrl: point.imageUrl  // Använd direkt URL till bilden
      },
      popupTemplate: {
        title: "{name}",
        content: `
          <b>Typ:</b> {type}<br>
          <b>Beskrivning:</b> {description}<br>
          <img src="{imageUrl}" alt="{name}" style="width: 200px; height: auto;">
        `
    }
    });

    wayPointLayer.add(pointGraphic);
  });
}

addPOI();

// Eventhantering för att visa labels
view.on("pointer-move", function(event) {
  view.hitTest(event).then(function(response) {
    var graphic = response.results.length ? response.results[0].graphic : null;
    if (graphic && graphic.layer === wayPointLayer) {
      showLabel(graphic);
    } else {
      labelLayer.removeAll(); // Ta bort alla labels om ingen POI är under muspekaren
    }
  });
});

function showLabel(graphic) {
  labelLayer.removeAll(); // Rensa alla tidigare labels

  var textSymbol = new TextSymbol({
    text: graphic.attributes.name,
    color: "black",
    haloColor: "white",
    haloSize: "2px",
    font: {
      size: 12,
      family: "sans-serif"
    },
    xoffset: 0,
    yoffset: -20
  });

  var labelGraphic = new Graphic({
    geometry: graphic.geometry,
    symbol: textSymbol
  });

  labelLayer.add(labelGraphic); // Lägg till textsymbolen till labelLayer
}

// Eventlyssnare för knappen
document.getElementById("clearPOIButton").addEventListener("click", function() {
  var button = document.getElementById("clearPOIButton");

  if (button.textContent === "Rensa POI") {
    wayPointLayer.removeAll(); // Ta bort alla grafiska objekt från lagret
    labelLayer.removeAll(); // Ta bort alla labels från lagret
    button.textContent = "Visa POI"; // Byt knapptext till "Visa POI"
  } else {
    addPOI(); // Lägg till POI igen
    button.textContent = "Rensa POI"; // Byt knapptext till "Rensa POI"
  }
});

document.getElementById('search-input').addEventListener('input', function() {
  var searchQuery = document.getElementById('search-input').value.toLowerCase();
  var results = gpxPoints.filter(function(point) {
    return point.name.toLowerCase().includes(searchQuery) || point.type.toLowerCase().includes(searchQuery);
  });

  displaySearchResults(results);
});


function displaySearchResults(results) {
  // Rensa tidigare sökresultat
  wayPointLayer.removeAll();
  labelLayer.removeAll();

  // Visa de nya sökresultaten på kartan
  results.forEach(function(result) {
    var pointGeometry = {
      type: "point",
      longitude: result.lon,
      latitude: result.lat
    };

    var pictureMarkerSymbol = new PictureMarkerSymbol({
      url: getIconForType(result.type),
      width: "24px",
      height: "24px"
    });

    var pointGraphic = new Graphic({
      geometry: pointGeometry,
      symbol: pictureMarkerSymbol,
      attributes: {
        name: result.name,
        type: result.type,
        description: result.description,
        imageUrl: result.imageUrl
      },
      popupTemplate: {
        title: "{name}",
        content: `
          <b>Typ:</b> {type}<br>
          <b>Beskrivning:</b> {description}<br>
          <img src="{imageUrl}" alt="{name}" style="width: 200px; height: auto;">
        `
      }
    });

    wayPointLayer.add(pointGraphic);
  });
}

let clickHandler = null; // För att lagra referensen till händelsehanteraren
let selectedPoint = null; // Variabel för att spara den valda platsens koordinater
let sessionActive = false; // Variabel för att hålla koll på om sessionen är aktiv
let sessionGraphics = []; // Array för att lagra temporära POI:er


document.getElementById('toggleAddPOIModeButton').addEventListener('click', function() {
  const button = document.getElementById('toggleAddPOIModeButton');

  if (button.classList.contains('active')) {
      // Avsluta sessionen
      button.classList.remove('active');
      button.textContent = 'Starta session för egen plats';
      button.style.backgroundColor = '#28a745'; // Ändra till grönt

      // Ta bort click-handler
      if (clickHandler) {
          clickHandler.remove();
          clickHandler = null;
      }

      // Ta bort temporära POI:er från kartan och rensa sessionen
      sessionGraphics.forEach(function(graphic) {
          sessionWayPointLayer.remove(graphic);
      });
      sessionGraphics = []; // Rensa arrayen
      sessionActive = false; // Avsluta sessionen

      // Dölj formuläret
      document.getElementById('addPOIForm').style.display = 'none';

  } else {
      // Starta sessionen
      button.classList.add('active');
      button.textContent = 'Avsluta session för egen POI';
      button.style.backgroundColor = '#FF0000'; // Ändra till rött

      sessionActive = true; // Starta sessionen

      // Lägg till click-handler för att lyssna på kartklick
      clickHandler = view.on('click', function(event) {
          selectedPoint = {
              longitude: event.mapPoint.longitude,
              latitude: event.mapPoint.latitude
          };
          
          // Visuell indikation av den valda platsen
          sessionWayPointLayer.removeAll();
          var markerSymbol = {
              type: "simple-marker",
              style: "circle",
              color: "red",
              size: "12px"
          };

          var pointGraphic = new Graphic({
              geometry: {
                  type: "point",
                  longitude: selectedPoint.longitude,
                  latitude: selectedPoint.latitude
              },
              symbol: markerSymbol
          });

          sessionWayPointLayer.add(pointGraphic);
      });
  }

});



// Visa formuläret när användaren klickar på "Lägg till POI"-knappen
document.getElementById('addPOIButton').addEventListener('click', function() {
    if (selectedPoint) {
        document.getElementById('addPOIForm').style.display = 'flex';
    } else {
        alert("Klicka först på kartan för att välja en plats.");
    }
});

// Spara POI när användaren klickar på "Spara POI"-knappen
document.getElementById('savePOIButton').addEventListener('click', function() {
  var name = document.getElementById('poiName').value;
  var type = document.getElementById('poiType').value;

  if (name === '' || type === '' || !selectedPoint) {
      alert("Vänligen fyll i alla fält och välj en plats på kartan.");
      return;
  }

  // Lägg till temporär POI till kartan
  addTemporaryPOIToMap(name, type, selectedPoint.longitude, selectedPoint.latitude);

  // Återställ formuläret och rensa markeringen
  document.getElementById('poiName').value = '';
  document.getElementById('poiType').value = '';
  document.getElementById('addPOIForm').style.display = 'none';

  selectedPoint = null;

  alert("Platsen har sparats! Du kan nu klicka på POI:n för att se dess information.")
});


// Funktion för att lägga till den temporära POI:n på kartan
function addTemporaryPOIToMap(name, type, longitude, latitude) {
  var pointGeometry = {
      type: "point",
      longitude: longitude,
      latitude: latitude
  };

  var pictureMarkerSymbol = {
      type: "picture-marker",
      url: getIconForType(type),
      width: "24px",
      height: "24px",
      xoffset: 0,
      yoffset: 0
  };

  var pointGraphic = new Graphic({
      geometry: pointGeometry,
      symbol: pictureMarkerSymbol,
      attributes: {
          name: name,
          type: type,
          description: "Temporär POI",
          longitude: longitude.toFixed(6),  // Visa longitud med 6 decimaler
          latitude: latitude.toFixed(6) 
      },
      popupTemplate: {
        title: "{name}",
        content: `
            <b>Typ:</b> {type}<br>
            <b>Beskrivning:</b> {description}<br>
            <b>Koordinater:</b><br>
            Longitud: {longitude}<br>
            Latitud: {latitude}
        `
    }
  });

  sessionWayPointLayer.add(pointGraphic); // Lägg till den temporära POI:n till kartan
  sessionGraphics.push(pointGraphic); // Lagra POI:n i sessionGraphics arrayen

  // Centrera kartan på den nya POI:n och öppna popup
  view.goTo({ target: pointGraphic.geometry, zoom: 11 }).then(function() {
      view.popup.open({
          features: [pointGraphic],
          location: pointGeometry
      });
  });
}

});

