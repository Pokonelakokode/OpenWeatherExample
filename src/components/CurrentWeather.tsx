import * as React from "react";
import {useEffect, useState} from "react";
import {getCurrentWeather, loadFromStorage, saveToStorage} from "../utils";
import {ILocation} from "./WeatherLoader";
import {ICurrentWeather} from "../types";
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
    const _getCurrentWeather = () => {
        getCurrentWeather(location.longitude, location.latitude, API_KEY,"weather")
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
            _getCurrentWeather()
        }
    }, []);
    if (!state) return <div>LOADING</div>;
    return (
        <div id="Current-Weather">
            <div className="header">
                <h4 className="location">{state.name} - {state.sys.country}</h4>
                <Updater updater={_getCurrentWeather} timeStamp={state.timeStamp}/>
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