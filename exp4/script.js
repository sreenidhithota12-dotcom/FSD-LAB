async function getWeather(){

    let city=document.getElementById("city").value;
    let msg=document.getElementById("msg");
    let box=document.getElementById("weather");

    if(!city)return msg.textContent="Enter a city";

    msg.textContent="Loading...";

    try{
        let g=await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        ).then(r=>r.json());

        if(!g.results)throw 0;

        let x=g.results[0];

        let w=await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${x.latitude}&longitude=${x.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=15&timezone=auto`
        ).then(r=>r.json());

        box.innerHTML=`
        <div class="current">
            <h2>${x.name}, ${x.country}</h2>
            <div class="temp">${Math.round(w.current.temperature_2m)}°C</div>
            <p>${report(w.current.weather_code)}</p>
            <div class="info">
                <span>💧 ${w.current.relative_humidity_2m}%</span>
                <span>💨 ${w.current.wind_speed_10m} km/h</span>
            </div>
        </div>

        <h2>15-Day Forecast</h2>

        <div class="forecast">
            ${w.daily.time.map((d,i)=>`
                <div class="card">
                    <b>${new Date(d).toLocaleDateString("en",{weekday:"short"})}</b>
                    <p>${report(w.daily.weather_code[i])}</p>
                    <b>${Math.round(w.daily.temperature_2m_max[i])}°C</b>
                    / ${Math.round(w.daily.temperature_2m_min[i])}°C
                </div>
            `).join("")}
        </div>`;

        msg.textContent="";

    }catch{
        msg.textContent="City not found";
    }
}

function report(c){
    if(c==0)return"Clear";
    if(c<=3)return"Cloudy";
    if(c<=48)return"Fog";
    if(c<=67)return"Rain";
    if(c<=77)return"Snow";
    if(c<=82)return"Showers";
    return"Storm";
}