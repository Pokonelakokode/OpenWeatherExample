import * as React from "react";
import {useEffect, useState} from "react";
import {getWeather, loadFromStorage, saveToStorage} from "../utils";
import {ICurrentWeather, ILocation} from "../types";
import Temperature from "./Temperature";
import Wind from "./Wind";
import Rain from "./Rain";
import Updater from "./Updater";
import CurrentStatus from "./CurrentStatus";
import Snow from "./Snow";

interface IProps {
    API_KEY: string,
    location: ILocation
}

const CurrentWeather: React.FC<IProps> = ({location, API_KEY}) => {
    const [state, setState] = useState<ICurrentWeather | null>();
    const weatherData = loadFromStorage('CurrentWeather');
    const getCurrentWeather = () => {
        getWeather<ICurrentWeather>(location.longitude, location.latitude, API_KEY,"weather")
            .then(data => {
                data = saveToStorage('CurrentWeather', data);
                setState(data)
            })
            .catch(error => {
                if (weatherData) {
                    setState(weatherData)
                }
            })
    }
    useEffect(() => {
        if (weatherData) {
            setState(weatherData)
        } else {
            getCurrentWeather()
        }
    }, []);
    if (!state) return <div>LOADING</div>;
    return (
        <div id="Current-Weather" >
            <div className="header">
                <div className="location">
                    <h4 >{state.name} - {state.sys.country}</h4>
                </div>
                <div className="updated">
                    <Updater updater={getCurrentWeather} timeStamp={state.timeStamp}/>
                </div>


            </div>
            <div className="body">

                <Temperature temp={state.main.temp} temp_min={state.main.temp_min} temp_max={state.main.temp_max}/>
                <CurrentStatus sunrise={state.sys.sunrise} sunset={state.sys.sunset} icon={state.weather[0].icon} description={state.weather[0].description}/>
                <Wind humidity={state.main.humidity} pressure={state.main.pressure} speed={state.wind.speed} deg={state.wind.deg}/>
                {state.rain && <Rain rain={state.rain}/>}
                {state.snow && <Snow snow={state.rain}/>}
            </div>
        </div>
    )
};

export default CurrentWeather