const request = require('postman-request')



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=1f0078b0cbbe4451b62d0a12908a9abf&query='+latitude+','+longitude
    request({ url, json: true }, (error, {body}) => {
        // console.log(error)
        if (error) {
            callback("Unable to connect to weather services!!!",undefined)
        } else if (body.error) {
            callback(response.body.error.info,undefined)
        } else {
            // console.log(response,"rep")
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' +body.current.temperature+' degree out. It feels like '+body.current.feelslike+' out. And humidity will be '+body.current.humidity+'%.')
        }
    })
}
module.exports = forecast