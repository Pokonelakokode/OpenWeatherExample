import * as React from "react";
import {ICurrentWeather, IForecastWeather, ILocation} from "../types";
import {useState} from "react";
import {getWeather, loadFromStorage, saveToStorage} from "../utils";
import {useEffect} from "react";

interface IProps {
    API_KEY: string,
    location: ILocation
}

const ForecastWeather: React.FC<IProps> = ({location,API_KEY}) => {
    const [state, setState] = useState<IForecastWeather | null>()
    const weatherData = loadFromStorage('ForecastWeather');
    const getCurrentWeather = () => {
        getWeather<IForecastWeather>(location.longitude, location.latitude, API_KEY,"weather")
            .then(data => {
                data = saveToStorage('ForecastWeather', data);
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
        <div>

        </div>
    )
};

export default ForecastWeather