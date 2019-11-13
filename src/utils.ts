import {ILocalStores, ICurrentWeather, IWeatherAPITypes} from "./types";

export function getCurrentWeather(lon:number,lat:number,key:string,type:IWeatherAPITypes):Promise<ICurrentWeather> {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET',`http://api.openweathermap.org/data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(JSON.parse(xhr.response) as ICurrentWeather)
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