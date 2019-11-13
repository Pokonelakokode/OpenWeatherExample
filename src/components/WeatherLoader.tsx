import * as React from "react";
import {useEffect, useState} from "react";
import CurrentWeather from "./CurrentWeather";

interface IProps {
    API_KEY?:string
}

export interface ILocation {
    longitude: number,
    latitude: number
}

const WeatherLoader: React.FC<IProps> = ({API_KEY}) => {
    if (!API_KEY) return <h1>YOU HAVE TO PROVIDE AN API KEY FIRST</h1>;
    const [state,setState] = useState<ILocation>({latitude:47.497912,longitude:19.040235});
    const setLocation = (location:Position) => {
        setState({latitude:location.coords.latitude,longitude: location.coords.longitude})
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setLocation,positionError => {console.log(positionError)});
    },[]);
    return (
        <div>
            {/*<p>LONGITUDE: {state.longitude}</p>*/}
            {/*<p>LATITUDE: {state.latitude}</p>*/}
            <CurrentWeather API_KEY={API_KEY} location={state}/>
        </div>
    )
};

export default WeatherLoader