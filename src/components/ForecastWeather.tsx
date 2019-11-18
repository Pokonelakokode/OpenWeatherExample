import * as React from "react";
import {IForecastWeather, ILocation, IForecastData} from "../types";
import {useState} from "react";
import {getWeather, loadFromStorage, mapToDays, saveToStorage} from "../utils";
import {useEffect} from "react";
import Updater from "./Updater";
import Day from "./Forecast/Day";
import Hour from "./Forecast/Hour";

interface IProps {
    API_KEY: string,
    location: ILocation
}

const ForecastWeather: React.FC<IProps> = ({location, API_KEY}) => {
    const [state, setState] = useState<IForecastWeather | null>();
    const [selectedDay, selectDay] = useState<string | null>(null);
    const weatherData = loadFromStorage('ForecastWeather');
    const getCurrentWeather = () => {
        getWeather<IForecastWeather>(location.longitude, location.latitude, API_KEY, "forecast")
            .then(data => {
                data = saveToStorage('ForecastWeather', data);
                setState(data)
            })
            .catch(() => {
                if (weatherData) {
                    setState(weatherData)
                }
            })
    };
    useEffect(() => {
        if (weatherData) {
            setState(weatherData)
        } else {
            getCurrentWeather()
        }
    }, []);
    if (!state) return <div>LOADING</div>;
    const days = mapToDays(state.list);
    return (
        <div id="Forecast-Weather">
            <div className="header">
                <div className="location">
                    <h4>{state.city.name} - {state.city.country}</h4>
                </div>
                <div className="title">
                    <h4>Forecast Weather</h4>
                </div>
                <div className="updated">
                    <Updater updater={getCurrentWeather} timeStamp={state.timeStamp}/>
                </div>
            </div>
            <div className="days">
                {Object.keys(days).map((key) => {
                    return <Day
                        selectDay={selectDay}
                        selectedDay={selectedDay}
                        key={key}
                        day={key}
                        temp_min={days[key]["sum"]["temp_min"]}
                        temp_max={days[key]["sum"]["temp_max"]}
                        pressure_min={days[key]["sum"]["pressure_min"]}
                        pressure_max={days[key]["sum"]["pressure_max"]}
                        humidity_min={days[key]["sum"]["humidity_min"]}
                        humidity_max={days[key]["sum"]["humidity_max"]}/>
                })}
            </div>
            {selectedDay && <div className="selected-day">
                {days[selectedDay].weatherData.map((forecast: IForecastData) => {
                    return <Hour key={forecast.dt_txt} description={forecast.weather[0].description} icon={forecast.weather[0].icon}
                                 temp={forecast.main.temp} deg={forecast.wind.deg} dt_txt={forecast.dt_txt} speed={forecast.wind.speed}/>
                })}
            </div>}
        </div>
    )
};

export default ForecastWeather