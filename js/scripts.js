mapboxgl.accessToken = 'pk.eyJ1IjoibWlyaWhhem91IiwiYSI6ImNsdzcybWYzMDF6czIyamxyZDk5c2EyeXUifQ.LY6eudk3jxJnIseu8FkQ1w';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    projection: 'globe',
    center: [-98.11334, 39.33770],
    zoom: 2.59
});
// add data source//
map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
//data source from geojson//
    map.addSource('States-map', {
        "type": "geojson",
        "data": "US-States.geojson",
        generateId: true
    })
})
//create layer//
map.on('load', () => {
    map.addLayer({
        'id': 'Statesmapfill',
        'type': 'fill',
        'source': 'States-map',
        'layout': {},
        'paint': {
            //set color on polygons depending on their features//in this case their restrictive laws on abortion//
            'fill-color': [
                'match',
                ['get', 'NAME'],
                'Washington', '#e18075',  //  Protective
                'Nebraska', '#a84a3f', // Very/most restrictive 
                'New Mexico', '#e6ab9e',  //Very Protective   
                'South Dakota', '#a84a3f', // Very/most restrictive  
                'Texas', '#a84a3f', // Very/most restrictive
                'California', '#e6ab9e',  //Very Protective  
                'Kentucky', '#a84a3f', // Very/most restrictive   
                'Ohio', '#c6554b', //Restrictive
                'Alabama', '#a84a3f', // Very/most restrictive
                'Georgia', '#a84a3f', // Very/most restrictive    
                'Wisconsin', '#c6554b', //Restrictive
                'Oregon', '#e6ab9e', //Very Protective 
                'Pennsylvania', '#c6554b', //Restrictive   
                'Mississippi', '#a84a3f', // Very/most restrictive 
                'Missouri', '#a84a3f', // Very/most restrictive 
                'North Carolina', '#a84a3f', // Very/most restrictive    
                'Oklahoma', '#a84a3f', // Very/most restrictive 
                'West Virginia', '#a84a3f', // Very/most restrictive 
                'New York', '#e6ab9e',  //Very Protective  
                'Indiana', '#a84a3f', // Very/most restrictive 
                'Kansas', '#c6554b', //Restrictive
                'Idaho', '#a84a3f', // Very/most restrictive    
                'Nevada', '#cd7369', // Some Restrictions
                'Vermont', '#e6ab9e',  //Very Protective  
                'Montana', '#e18075',  //  Protective   
                'Minnesota', '#e6ab9e',  //Very Protective 
                'North Dakota', '#a84a3f', // Very/most restrictive  
                'Hawaii', '#e18075',  //  Protective 
                'Arizona', '#a84a3f', // Very/most restrictive 
                'Delaware', '#cd7369', // Some Restrictions
                'Rhode Island', '#cd7369', // Some Restrictions  
                'Colorado', '#e18075',  //  Protective 
                'Utah', '#a84a3f', // Very/most restrictive 
                'Virginia', '#c6554b', //Restrictive   
                'Wyoming', '#c6554b', //Restrictive
                'Louisiana', '#a84a3f', // Very/most restrictive 
                'Michigan', '#e18075',  //  Protective    
                'Massachusetts', '#e18075',  //  Protective 
                'Florida', '#a84a3f', // Very/most restrictive 
                'Connecticut', '#e18075',  //  Protective    
                'New Jersey', '#e6ab9e',  //Very Protective 
                'Maryland', '#e6ab9e',  //Very Protective 
                'South Carolina', '#a84a3f', // Very/most restrictive    
                'Maine', '#e18075',  //  Protective 
                'New Hampshire', '#cd7369', // Some Restrictions 
                'District of Columbia', '#e18075',  //  Protective   
                'Iowa', '#c6554b', //Restrictive
                'Arkansas', '#a84a3f', // Very/most restrictive 
                'Tennessee', '#a84a3f', // Very/most restrictive   
                'Illinois', '#e18075',  //  Protective 
                'Alaska', '#e18075',  //  Protective 
                '#CCCCCC'
            ],

            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    })
})


 // this is a variable to store the id of the feature that is currently being hovered.
let hoveredPolygonId = null

// whenever the mouse moves on the 'statesmapfill' layer, we check the id of the feature it is on top of, and set featureState for that feature.  The featureState we set is hover:true or hover:false
map.on('mousemove', 'Statesmapfill', (e) => {
    if (e.features.length > 0) {
 // if hoveredPolygonId already has an id in it, set the featureState for that id to hover: false
        if (hoveredPolygonId !== null) {
            map.setFeatureState(
                { source: 'States-map', id: hoveredPolygonId },
                { hover: false }
            );
        }

        // set hoveredPolygonId to the id of the feature currently being hovered
        hoveredPolygonId = e.features[0].id;
        
// set the featureState of this feature to hover:true
        map.setFeatureState(
            { source: 'States-map', id: hoveredPolygonId },
            { hover: true }
        );

        map.getCanvas().style.cursor = 'pointer'

 
        map.on('mouseleave', 'Statesmapfill', () => {

            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'States-map', id: hoveredPolygonId },
                    { hover: false }
                );
            }

            hoveredPolygonId = null;

            map.getCanvas().style.cursor = ''
        });

    }
});

//click on state and porduce name on container//

map.on('click', 'Statesmapfill', (e) => {

    var statename = e.features[0].properties.NAME

    $('#state-name').text(statename)
 
    //add line layer//
    map.on('load', () => {
        map.addLayer({
            'id': 'States-Map-line',
            'type': 'line',
            'source': 'States-map',
            'layout': {},
            'paint': {
                'line-color': 'black',
                'line-width': 1

            }
        })
    })
})


 //add markers//
 const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-98.93783, 31.79196]
        },
        properties: {
          title: 'Very Restrictive Laws',
          description: 'States with very restrictive abortion laws severely limit access to abortion services, often implementing bans on abortion after a very early gestational period, with few exceptions such as to save the life of the pregnant person. These laws may include mandatory waiting periods, mandatory counseling designed to dissuade abortion, and stringent requirements for clinics and providers that can make it difficult to offer abortion services.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-98.57540, 38.64263]
        },
        properties: {
          title: 'Restictive Laws',
          description: 'States with restrictive abortion laws impose significant barriers to access, such as limiting the procedure to the first trimester, requiring parental consent for minors, and mandating waiting periods. These laws may also include extensive regulations on abortion clinics and providers, which can lead to clinic closures and reduced availability of services.'
        }
      },

      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-116.44777, 39.88859]
        },
        properties: {
          title: 'Some Restrictive Laws',
          description: 'States with some restrictions on abortion may allow the procedure later into the pregnancy but still impose certain barriers like mandatory waiting periods and counseling. They might also have laws requiring parental notification for minors and regulations that clinics must follow, but these restrictions are less severe compared to more restrictive states.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.61684, 44.52474]
        },
        properties: {
          title: 'Protective Laws',
          description: 'States with protective abortion laws actively work to safeguard access to abortion services, ensuring that individuals can obtain abortions without significant legal or procedural barriers. These states may fund abortion services for low-income individuals and protect clinics and providers from harassment and unnecessary legal restrictions.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.05000, 40.89700]
        },
        properties: {
          title: 'Very Protective Laws',
          description: 'States with very protective abortion laws provide strong legal protections for abortion access, ensuring it is available and accessible throughout the state. These states may not impose waiting periods or mandatory counseling and actively work to expand access by supporting clinics and protecting patients rights to choose abortion without facing significant hurdles.'
        }
      },

    ]
  };
// add markers to map
for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    // create a popup
    const popup = new mapboxgl.Popup({ offset: 25, anchor:'right', }).setHTML(
      `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
    );

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);
  }

  function buttonClicked() {
    // Add your functionality here
    console.log('Button was clicked!');
  }
  
