var map;

require([
    "esri/map",
    "esri/layers/GraphicsLayer",
	"esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol",
    "esri/InfoTemplate",
    "dojo/domReady!"
], function(Map, GraphicsLayer, Graphic, Point, PictureMarkerSymbol, InfoTemplate) {
    map = new Map("mapDiv", {
        basemap: "topo",
        center: [16.881586, 60.292587],
        zoom: 9
    });
	

/*map.on('load', function() {
    // Nu är kartan laddad, här kan du anropa din funktion för att lägga till linjen
    getFetchData();
});*/


async function fetchData(file) {
    const url = "http://localhost:8000/read_json.php?file=";
    try {
        const response = await fetch(url + file);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null; // Returnera null om det uppstår ett fel
    }
}

async function getFetchData() {
    try {
        const data = await fetchData('Etapp_11_wgs84.json');
        if (data) {
            addPointsToMap(data);
        } else {
            console.error('Failed to fetch data or data is empty');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Antag att 'data' är den inlästa JSON-data
/*
function addPointsToMap(data) {
    var pointsLayer = new GraphicsLayer();
    map.addLayer(pointsLayer);

    // Loopa igenom varje post och skapa en punkt för varje
    data.posts.forEach(post => {
        var point = new Point({
            longitude: parseFloat(post.longitude),
            latitude: parseFloat(post.latitude)
        });

        var markerSymbol = new PictureMarkerSymbol({
            url: 'pin.png',
            width: 24,
            height: 24
        });

        var graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
        });

        pointsLayer.add(graphic);
    });
}
*/

function addPointsToMap() {
    var pointsLayer = new GraphicsLayer();
    map.addLayer(pointsLayer);

   data.posts.array.forEach(posts => {
        var point = new Point({
            longitude: parseInt[posts.longitude],
            latitude: parseInt[posts.latitude]
        });

        var markerSymbol = new PictureMarkerSymbol({
            url: 'pin.png',
            width: 30,
            height: 30
        });

        var graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
        });

        pointsLayer.add(graphic);
    
   });
}

addPointsToMap({
    posts: [
        { longitude: 16.881686, latitude: 60.292687}
    ]
});

map.on('load', function() {
    console.log("Kartan har laddats.");
});

    //Visning av information om aktuell POI: 
    //Färnebofjärden, Gysinge och Hedesundafjärden
var wayPoint = new GraphicsLayer();
var gpxPoints = [
        //Färnebofjärden
        { lat: 60.219227, lon: 16.847813,  name: "Brattnäset",      type: "Grillplats",        description: "Här kan man ta en fikapaus och grilla.",                                                                                                                                                                          imageUrl: "Brattnaset.png"},
        { lat: 60.238677, lon: 16.814736,  name: "Bårbyhällan",     type: "Grillplats",        description: "Här kan man ta en fikapaus och grilla.",                                                                                                                                                                          imageUrl: "Barbyhallan.png"},
        { lat: 60.177689, lon: 16.801658,  name: "Båtsportklubben", type: "Grillplats",        description: "Vid platsen är det stenbotten, 5 m till avlastningsplats och 100 m till parkering.",                                                                                                                              imageUrl: "Batsportsklubben.png"},
        { lat: 60.14346,  lon: 16.47136,   name: "Dragsheden väst", type: "Rastplats",         description: "Vid platsen är det grusbotten och 50 m till avlastningsplats. Observera att vid lågt vattenstånd kan passagen under vägen vara torrlagd.",                                                                        imageUrl: "Dragsheden.png"},
        { lat: 60.14204,  lon: 16.47466,   name: "Dragsheden öst",  type: "Rastplats",         description: "Det är stenbotten på platsen. Iläggning kan göras ca 50 m norr om vägtrumman. Observera att vid lågt vattenstånd kan passagen under vägen vara torrlagd och att det är dåligt med parkeringsplatser på platsen.", imageUrl: "Dragsheden_ost.png"},
        { lat: 60.197745, lon: 16.748013,  name: "Göknäset",        type: "Rastplats",         description: "På platsen är det grusbotten blandat med större stenar.",                                                                                                                                                         imageUrl: "Goknaset.png"},
        { lat: 60.209724, lon: 16.788901,  name: "Sandön",          type: "Grillplats",        description: "Rastplats med eldstad och sittbänkar.",                                                                                                                                                                           imageUrl: "Sandon.png"},
        { lat: 60.212219, lon: 16.849755,  name: "Skekarsbo",       type: "Vindskydd",         description: "Rastplats med vindskydd och eldstad på vägen upp mot utkikstornet.",                                                                                                                                              imageUrl: "Skekarsbo.png"},
        { lat: 60.13012,  lon: 16.47824,   name: "Strångnäs",       type: "Vindskydd",         description: "Rastplats med tillgänglighetsanpassat vindskydd och eldstad. Ligger ca 30 m från parkering.",                                                                                                                     imageUrl: "Strangnas.png"},
        { lat: 60.10404,  lon: 16.47415,   name: "Östa Camping",    type: "Rastplats",         description: "Vid platsen är det stenbotten, 100 m till avlastningsplats och 200 m till parkering.",                                                                                                                            imageUrl: "Osta_camping.png"},
        { lat: 60.173351, lon: 16.791122,  name: "Östa norr",       type: "Vindskydd",         description: "Vid platsen är det stenbotten och 300 m till avlastningsplats och parkering.",                                                                                                                                    imageUrl: "Osta_norr.png"},
        { lat: 60.176483, lon: 16.785071,  name: "Östa väst",       type: "Rastplats",         description: "Vid platsen är det stenbotten.",                                                                                                                                                                                  imageUrl: "Osta_vast.png"},
        
        //Gysinge
        { lat: 60.286982,  lon: 16.880171,  name: "Café Udden",     type: "Cafe",              description: "Café vackert belägen vid Dalälven som serverar lunch med fin utsikt. ",                                                                                                                                           imageUrl: "Cafe_udden.png"},
        { lat: 60.281196,  lon: 16.805992,  name: "Edsviken",       type: "Badplats",          description: "Platsen sköts av kultur- och fritidsförvaltningen.",                                                                                                                                                              imageUrl: "Edsviken.png"},
        { lat: 60.287094,  lon: 16.885128,  name: "Gysinge",        type: "Naturreservat",     description: "Många besöker Gysingeområdet för att vandra, fiska eller paddla.",                                                                                                                                                imageUrl: "Gysinge.png"},
        { lat: 60.261745,  lon: 16.836784,  name: "Gärdsvekarna",   type: "Rastplats",         description: "Landstigning ca 150 m söder om stugan. Det är grusbotten på platsen.",                                                                                                                                            imageUrl: "Gardsvekarna"},
        { lat: 60.253702,  lon: 16.794437,  name: "Ista",           type: "Naturreservat",     description: "Här kan du grilla vid den iordningställda eldplatsen",                                                                                                                                                            imageUrl: "Ista.png"},
        { lat: 60.26224,   lon: 16.808814,  name: "Karlholmen",     type: "Rastplats",         description: "",                                                                                                                                                                                                                imageUrl: ""},

        //Hedesundafjärden
        { lat: 60.19891,  lon: 17.1291,    name: "Festplatsen",    type: "Rastplats",          description: "",                                                                                                                                                                                                                imageUrl: ""},
        { lat: 60.20745,  lon: 17.3406,    name: "Gnupe",          type: "Grillplats",         description: "Rastplats med stenbotten och synnerligen svår angöring. Det är 10 m till lastningsplats och parkering.",                                                                                                          imageUrl: "Gnupe.png"},
        { lat: 60.298647, lon: 17.03722,   name: "Hade",           type: "Badplats",           description: "Rast och iläggningsplats med grusbotten. Det är 20 m till lastningsplats och 50 m till parkering.",                                                                                                               imageUrl: "Hade.png"},
        { lat: 60.319739, lon: 17.032853,  name: "Korsnäset",      type: "Rastplats",          description: "Rast- och iläggningsplats med sandbotten och 30 m till lastningsplats och parkering.",                                                                                                                            imageUrl: "Korsnaset.png"},
        { lat: 60.22312,  lon: 17.2812,    name: "Kvillanudden",   type: "Vandring",           description: "Här kan du vandra",                                                                                                                                                                                               imageUrl: "Kvillanudden.png"},
        { lat: 60.371665, lon: 17.027328,  name: "Norra sundet",   type: "Badplats",           description: "Här kan du bada med brygga och ta en paus i vardagen.",                                                                                                                                                           imageUrl: "Norra_sundet.png"},
        { lat: 60.350155, lon: 17.020365,  name: "Sandsnäsbadet",  type: "Badplats",           description: "Rast- och iläggningsplats med sandbotten och 50 m till lastningsplats och parkering.",                                                                                                                            imageUrl: "Sandsnasbadet.png"},
        { lat: 60.1872,   lon: 17.2239,    name: "Södra sundet",   type: "Rastplats",          description: "Rast och iläggningsplats med grusbotten. Det är 10 m till lastningsplats och 50 m till parkering.",                                                                                                               imageUrl: "Sodra_sundet.png"},
        { lat: 60.366079, lon: 17.032521,  name: "Åshuvudet",      type: "Rastplats",          description: "Det är sandbotten vid platsen.",                                                                                                                                                                                  imageUrl: "Ashuvudet.png"},
        { lat: 60.22987,  lon: 17.5701,    name: "Östveda",        type: "Badplats",           description: "Rastplats vid Gästrikeleden och för paddlare. Vid platsen är det sandbotten, 10 m till lastningsplats och 100 m till parkering",                                                                                  imageUrl: "Ostveda.png"},

    ];

    //Går igenom POI
    for (var i = 0; i < gpxPoints.length; i++) {
        var point = new Point(gpxPoints[i].lon, gpxPoints[i].lat);
        
        // Anropa getMarkerSymbol-funktionen för att få rätt symbol baserat på platsens typ
        var symbol = getMarkerSymbol(gpxPoints[i].type);
        
        var graphic = new Graphic(point, symbol);
    
        var info = new InfoTemplate(gpxPoints[i].name, 
            "<div style='width: 700px;'>" +
            "<div style='float: left; margin-right: 10px;'><img src='" + gpxPoints[i].imageUrl + "' width='100'></div>" +
            "<div><strong>Typ av plats:</strong> " + gpxPoints[i].type + "</div>" +
            "<div><strong>Beskrivning:</strong> " + gpxPoints[i].description + "</div>" +
            "</div>");
        
        graphic.setInfoTemplate(info);
        wayPoint.add(graphic);
    }
    
    // Symbolgeneratorfunktionen som returnerar rätt symbol baserat på platsens typ
    function getMarkerSymbol(type) {
        switch (type) {
            case "Grillplats":
                return new PictureMarkerSymbol("Grillplats.png", 25, 25);
            case "Rastplats":
                return new PictureMarkerSymbol("Rastplats.png", 25, 25);
            case "Cafe":
                return new PictureMarkerSymbol("Cafe.png", 25, 25);
            case "Badplats":
                return new PictureMarkerSymbol("Badplats.png", 25, 25);
            case "Naturreservat":
                return new PictureMarkerSymbol("Naturreservat.png", 25, 25);
            case "Vindskydd":
                return new PictureMarkerSymbol("Vindskydd.png", 25, 25);
            case "Vandring":
                return new PictureMarkerSymbol("Vandring.png", 25, 25);
            default:
                return new PictureMarkerSymbol("pin.png", 25, 25); // Standardbild om typen inte matchar
        }
    }    
    map.addLayer(wayPoint);

    map.on("mouse-over", function(evt) {
        if (evt.graphic) {
            map.infoWindow.setContent(evt.graphic.getContent());
            map.infoWindow.setTitle(evt.graphic.getTitle());
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        }
    });

    map.on("mouse-out", function(evt) {
        map.infoWindow.hide();
    });
 

// Verktygsfält som söker efter namn
function searchByName(query) {
    wayPoint.clear();

    for (var i = 0; i < gpxPoints.length; i++) {
        var point = new Point(gpxPoints[i].lon, gpxPoints[i].lat);
        var symbol = getMarkerSymbol(gpxPoints[i].type);

        if (gpxPoints[i].name.toLowerCase().includes(query.toLowerCase())) {
            var graphic = new Graphic(point, symbol);
            var infoTemplateContent = "<div><strong>Namn:</strong> " + gpxPoints[i].name + "<br>" +
                                      "<strong>Typ av plats:</strong> " + gpxPoints[i].type + "<br>" +
                                      "<strong>Beskrivning:</strong> " + gpxPoints[i].description + "</div>";

            if (gpxPoints[i].imageUrl) {
                infoTemplateContent += "<img src='" + gpxPoints[i].imageUrl + "' width='100'>";
            }

            var infoTemplate = new InfoTemplate(gpxPoints[i].name, infoTemplateContent);
            graphic.setInfoTemplate(infoTemplate);

            wayPoint.add(graphic); 
        }
    }
}

// Verktygsfält som söker efter typ av platser
function searchByType(type) {
   wayPoint.clear();

    for (var i = 0; i < gpxPoints.length; i++) {
        var point = new Point(gpxPoints[i].lon, gpxPoints[i].lat);
        var symbol = getMarkerSymbol(gpxPoints[i].type);

        if (gpxPoints[i].type.toLowerCase() === type.toLowerCase()) {
            var graphic = new Graphic(point, symbol);
            var infoTemplateContent = "<div><strong>Namn:</strong> " + gpxPoints[i].name + "<br>" +
                                      "<strong>Typ av plats:</strong> " + gpxPoints[i].type + "<br>" +
                                      "<strong>Beskrivning:</strong> " + gpxPoints[i].description + "</div>";

            if (gpxPoints[i].imageUrl) {
                infoTemplateContent += "<img src='" + gpxPoints[i].imageUrl + "' width='100'>";
            }

            var infoTemplate = new InfoTemplate(gpxPoints[i].name, infoTemplateContent);
            graphic.setInfoTemplate(infoTemplate);

            wayPoint.add(graphic); 
        }
    }
}

// Själva verktygsfältet för att söka efter namn
function initNameSearchTool() {
    
    var searchInput = document.getElementById('nameSearchInput');
    var searchButton = document.getElementById('nameSearchButton');

    searchButton.addEventListener('click', function() {
        var query = searchInput.value.trim().toLowerCase();
        searchByName(query);
    });

    searchInput.addEventListener('input', function() {
        var query = searchInput.value.trim().toLowerCase();
        searchByName(query);
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            var query = searchInput.value.trim().toLowerCase();
            searchByName(query);
        }
    });
}

// Själva verktygsfältet för att söka efter typ av platser
function initTypeSearchTool() {
    var searchInput = document.getElementById('typeSearchInput');
    var searchButton = document.getElementById('typeSearchButton');

    searchButton.addEventListener('click', function() {
        var type = searchInput.value.trim().toLowerCase();
        searchByType(type);
    });

    searchInput.addEventListener('input', function() {
        var type = searchInput.value.trim().toLowerCase();
        searchByType(type);
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            var type = searchInput.value.trim().toLowerCase();
            searchByType(type);
        }
    });
}

window.addEventListener('load', function() {
    console.log('Söker efter namn på platser');
    initNameSearchTool();     
});

window.addEventListener('load', function() {
    console.log('Söker efter typ av plats');
    initTypeSearchTool();   
});

    //Lägger till egen plats på kartan
function addTemporaryPlace() {
        // Lyssna på klickhändelser på kartan
        map.on("click", function(evt) {
            // Hämta koordinaterna för klicket
            var lon = evt.mapPoint.getLongitude();
            var lat = evt.mapPoint.getLatitude();
            
            
            var name = prompt("Ange namn på platsen:");
            var type = prompt("Ange typ av plats:");
            var description = prompt("Ange beskrivning av platsen:");
            
            // Skapa en punktgrafik för den temporära platsen
            var point = new Point(lon, lat);
            var symbol = new PictureMarkerSymbol("min_plats.png", 25, 35);
            var graphic = new Graphic(point, symbol);
            
            // Skapa en informationsmall för platsen
            var infoTemplate = new InfoTemplate(name, "<div><strong>Typ:</strong> " + type + "<br><strong>Beskrivning:</strong> " + description + "</div>");
            graphic.setInfoTemplate(infoTemplate);
            
            // Lägg till den temporära platsen på kartan
            map.graphics.add(graphic);
        });
}
    var temporaryPlaces = [];
    
function initAddPlaceMode() {
        map.on('click', function(event) {
            var point = event.mapPoint;
            var symbol = new PictureMarkerSymbol("min_plats.png", 25, 25);
            var graphic = new Graphic(point, symbol);
            map.graphics.add(graphic);

            temporaryPlaces.push(point);

        });
    }
   
    // Händelselyssnare för knappen som aktiverar lägg till plats-läget
    document.getElementById("addPlaceButton").addEventListener("click", function() {
        initAddPlaceMode();
        addTemporaryPlace();
        
    }); 	
});