/* Global Variables */
let baseURL=`http://api.openweathermap.org/data/2.5/weather?zip=`;
let apiKey=`,tr&units=metric&appid=3a34920c46e9c8e875075a9daa51fb36`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);
//
document.getElementById('generate').addEventListener('click', updatePage);
function updatePage(e){
    let zip= document.getElementById('zip').value;
    let getData= baseURL + zip + apiKey;
    getWeather(getData)
    .then(function(data){
        let feelings=document.getElementById('feelings').value;
        postWeather('/addInfo',{date:newDate ,temperature: data.main.temp, weather: data.weather[0].description, userResponse:feelings})
        updateUI()
    })
}
// GET request
const getWeather= async(url='')=>{
    const res=await fetch(url)
    try{
        const data= await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error", error);
    }
}   

//POST request
const postWeather= async (url='', data={})=>{
    console.log(data);
    const response= await fetch('http://localhost:3000/addInfo',{
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData= await response.json();
        return newData
    }
    catch(error){
        console.log("error", error);
    }
}
//UI
const updateUI = async () => {  
    const info = await fetch('http://localhost:3000/all');
    try{
      const allData = await info.json();
      const nData= allData[allData.length-1];
      console.log(allData);
      document.getElementById('date').innerHTML = 'Today is ' + nData.date;
      document.getElementById('temp').innerHTML ='The temperature is ' + nData.temperature + " &deg;C";
      document.getElementById('weat').innerHTML= 'The weather is ' + nData.weather;
      document.getElementById('content').innerHTML = 'I feel ' + nData.userResponse;
      if(nData.temperature <=10 ){
          document.getElementById('temp').innerHTML='The temperature is '+nData.temperature + " &deg;C" + ". You should wear a coat!";
      }
      if(nData.temperature >=25){
        document.getElementById('temp').innerHTML='The temperature is '+nData.temperature + " &deg;C" + ". You should get a hat!"; 
      }
      if(nData.weather == "clear sky" && nData.temperature >=20 ){
        document.getElementById('weat').innerHTML= 'The weather is ' + nData.weather + ". Take some fresh air!";  
      }
      if(nData.weather == "rain"){
        document.getElementById('weat').innerHTML= 'The weather is ' + nData.weather + ". Take your umbrella!";  
      }
      if(nData.weather=="mist"){
        document.getElementById('weat').innerHTML= 'The weather is ' + nData.weather + ". Don't go out today!"; 
      }
  
    }catch(error){
      console.log("error", error);
    }
  }
