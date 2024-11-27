import e from "express";
import axios from "axios";
import bodyParser from "body-parser";
const port = 3000
const app = e()
const apiKey = ""
app.use(bodyParser.urlencoded({extended: true}))
app.use(e.static("public"))
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.post("/submit",async(req,res)=>{
    const location = req.body.location
    console.log(location)
    const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`)
    const lat = result.data[0].lat
    const lon = result.data[0].lon
    const new_result = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    console.log(location, new_result.data.list[0].main.temp, new_result.data.list[0].main.feels_like, 
        new_result.data.list[0].main.temp_max, new_result.data.list[0].main.temp_min, 
        new_result.data.list[0].main.humidity, new_result.data.list[0].weather[0].main,)
    res.render("index.ejs",{
        content: {
            loc: location,
            temp: new_result.data.list[0].main.temp,
            feel_temp: new_result.data.list[0].main.feels_like,
            max_temp: new_result.data.list[0].main.temp_max,
            min_temp: new_result.data.list[0].main.temp_min,
            humidity: new_result.data.list[0].main.humidity,
            weather: new_result.data.list[0].weather[0].main,
        }
    })
    console.log("End [0]")
})
app.listen(port,(req,res)=>{
    console.log("listening at port 3000.")
})




