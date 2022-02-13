const express = require('express');
const https = require('https')
const bodyparser = require('body-parser');
const { response } = require('express');
let datas = "";
let disc = "";
let press = "";
let humidy = "";
let namecity = "";
const app = express();



app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine' , 'ejs');


app.get("/", function(req,res){
  
res.render("weather",{title : datas, dicription : disc, pressure : press, humidity : humidy, city :namecity})

})


app.post("/", function(req,res){

    let cityName = req.body.cityName;
    let nameCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + nameCapitalized + "&appid=1cc8b36a4b8347de7669c382bcfea4bc&units=metric"
https.get(url , function(response){
   console.log(response.statusCode);


    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const pressure = weatherData.main.pressure;
        const weatherDescription = weatherData.weather[0].description
        const humidity = weatherData.main.humidity;
       


        datas = temp;
        disc = weatherDescription;
        press = pressure;
        humidy = humidity
        namecity = nameCapitalized;



        res.redirect("/");

      
    })
})
});


app.listen(process.env.PORT || 3000, function(){
    console.log("786 ready to go");
})


