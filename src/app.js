const path = require('path');
const express = require('express');
const cors = require('cors')

const geocode = require('./geocode');

const app = express(); 
const port = process.env.PORT || 3005; 

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public'); 

//Setup static dir to serve
app.use(express.static(publicDirectoryPath));


const fetchGeoCode = async (req,res) => {

    try{
        const geoCode = await geocode(req.query.address)
        const  location = geoCode.location
        const  latitude = geoCode.latitude
        const  longitude = geoCode.longitude
        return res.send({location,latitude,longitude})

    }catch(e){
        console.log(`unable to fetch geo code ${e}`)
        return res.send({ error: `Unable to fetch geoCode`})
    }
 }


app.get('/location',cors(),  fetchGeoCode)


app.get('*', (req, res) => {
    return res.send({
        error: 'endpoint not implemented. Please use /weather to fetch the weather'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); 