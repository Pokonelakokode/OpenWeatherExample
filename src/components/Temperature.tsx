import * as React from "react";

interface IProps {
    temp: number,
    temp_min: number,
    temp_max: number
}

const Temperature: React.FC<IProps> = ({temp,temp_min,temp_max}) => {
    return (
        <div className="weather-section temperature">
            <h4>Temperature</h4>
            <div className="temp">
                <h5>Minimum</h5>
                <p>{temp_min} °C</p>
            </div>
            <div className="temp">
                <h5>Current</h5>
                <p>{temp} °C</p>
            </div>
            <div className="temp">
                <h5>Maximum</h5>
                <p>{temp_max} °C</p>
            </div>
        </div>
    )
};

export default Temperature