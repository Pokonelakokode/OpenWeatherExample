import {ILocalStores,  IWeatherAPITypes, IForecastData} from "./types";

export function getWeather<T>(lon:number, lat:number, key:string, type:IWeatherAPITypes):Promise<T> {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET',`http://api.openweathermap.org/data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(JSON.parse(xhr.response) as T)
            }
            else {
                reject("ERROR")
            }
        };
        xhr.send();
    })

}



export function calculateDeltaT(date:number) {
    const deltaT = new Date().getTime() - date;
    return deltaT < 60000 ? `${Math.floor(deltaT / 1000)} sec` : `${Math.floor(deltaT / 60000)} min`
}

export function saveToStorage(key:ILocalStores,data:any) {
    data.timeStamp = new Date().getTime();
    window.localStorage.setItem(key,JSON.stringify(data));
    return data
}

export function loadFromStorage(key:ILocalStores) {
    let data = window.localStorage.getItem(key);
    let obj:any;
    if(data){
        try {
            obj = JSON.parse(data);
            return new Date().getTime() - obj.timeStamp > 300000 ? null : obj;
        }
        catch (e) {
            return null
        }
    }
    else {
        return null
    }
}

export function mapToDays(weatherList:IForecastData[]) {
    return weatherList.reduce((acc:{[key: string]: any},weather) => {
        const date = new Date(weather.dt_txt).getDate();
        acc[date] = acc[date] || {};
        acc[date]["weatherData"] = acc[date]["weatherData"] || [];
        acc[date]["sum"] = acc[date]["sum"] || {
            temp_min: weather.main.temp_min,
            temp_max: weather.main.temp_max,
            humidity_min: weather.main.humidity,
            humidity_max: weather.main.humidity,
            pressure_min: weather.main.pressure,
            pressure_max: weather.main.pressure,
        };
        acc[date]["sum"]["temp_min"] = weather.main.temp_min < acc[date]["sum"]["temp_min"] ? weather.main.temp_min : acc[date]["sum"]["temp_min"];
        acc[date]["sum"]["temp_max"] = weather.main.temp_max > acc[date]["sum"]["temp_max"] ? weather.main.temp_max : acc[date]["sum"]["temp_max"];
        acc[date]["sum"]["humidity_min"] = weather.main.humidity < acc[date]["sum"]["humidity_min"] ? weather.main.humidity : acc[date]["sum"]["humidity_min"];
        acc[date]["sum"]["humidity_max"] = weather.main.humidity > acc[date]["sum"]["humidity_max"] ? weather.main.humidity : acc[date]["sum"]["humidity_max"];
        acc[date]["sum"]["pressure_min"] = weather.main.pressure < acc[date]["sum"]["pressure_min"] ? weather.main.pressure : acc[date]["sum"]["pressure_min"];
        acc[date]["sum"]["pressure_max"] = weather.main.pressure > acc[date]["sum"]["pressure_max"] ? weather.main.pressure : acc[date]["sum"]["pressure_max"];
        acc[date]["weatherData"].push(weather);
        return acc
    },{})
}

export function convert24To12Format(hour:number) {
    return `${hour%12 === 0 ? 12 : hour%12} ${hour >= 12 ? 'PM' : 'AM'}`
}