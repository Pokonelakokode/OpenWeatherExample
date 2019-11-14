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
            <section>
                <h5>Minimum</h5>
                <p>{temp_min} °C</p>
            </section>
            <section>
                <h5>Current</h5>
                <p>{temp} °C</p>
            </section>
            <section>
                <h5>Maximum</h5>
                <p>{temp_max} °C</p>
            </section>
        </div>
    )
};

export default Temperature