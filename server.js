const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

const apiKey = 'd7b0697833a1d253dd7140e692615cb3';

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){
    res.render('index',{weather :null,error:null});
})

app.listen(3000,function(){
    console.log("the app is listening on port 3000!")
});

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
