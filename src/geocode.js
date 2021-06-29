const request = require('request-promise');

const geocode = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZmFuc3VhIiwiYSI6ImNrZmtraWtvZjExczkydHBrbDh5cXBtM28ifQ.KKCiExctwGTNZm9DHlh_9Q&limit=1`;

    try{
        const res = await request({  url, json: true})
        console.log(res)
        if(res.features.lenth == 0){
            return(`Unable to find location. Try another search, undefined`)
        }
         const [ longitude,latitude ] = res.features[0].center; 
         const location = res.features[0].place_name;
        return {location: location, latitude:latitude, longitude:longitude}


    } catch(e) {
        console.log(`unable to fetch geocode form mapbox ${e}`)
        return(`Unable to connect to location servicce, undefined`)
    }
}

module.exports = geocode; 