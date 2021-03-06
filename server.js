const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
var HTTP_PORT = process.env.PORT || 8080;

const apiKey = '***************************';///get the api key from openweathermap.org!

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){
    res.render('index',{weather :null,error:null});
})

app.listen(HTTP_PORT,function(){
    console.log("the app is listening on port 8080!")
});1

app.post('/', function(req, res){
    let city = req.body.city;
   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err,response,body){
        if(err){ 
            res.render('index', {weather :null,error: 'Error Please try again!'});
        }else{
            console.log('it made it into the else statement')
            let weather = JSON.parse(body);
            console.log(weather.main)
            if(weather.main != undefined){
                let weatherText = `It's ${weather.main.temp} degrees Celcius in ${weather.name}!`;
                res.render('index',{weather :weatherText, error: null});
               
                console.log(weatherText);
                
            }
        }
    });



})
