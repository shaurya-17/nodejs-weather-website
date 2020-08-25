const request =require('postman-request')
const chalk =require('chalk')
const geocode=(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hhdXJ5YTE3IiwiYSI6ImNrZTJpNDMzajA5ZmIydXA2bXA5YTZ1ZmcifQ.hMNvCb5SGXVrQ9-qzJAlVg&limit=1'
   request({url:url,json:true},(error,{body})=>{
   if(error){
       callback('Unble to connect to location services!!',undefined)
   }else if(body.features.length===0){
       callback('Enter another place')
   }else{
       callback(undefined,{
           latitude: body.features[0].center[1],
           longitute:body.features[0].center[0],
           location:body.features[0].place_name
       })
   }
   })
   }

   
   module.exports=geocode