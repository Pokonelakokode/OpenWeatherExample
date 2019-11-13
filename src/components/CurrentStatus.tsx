import * as React from "react";

interface IProps {
    sunrise: number,
    sunset: number,
    icon: string,
    description: string
}

const CurrentStatus: React.FC<IProps> = ({description,icon,sunrise,sunset}) => {
    let [_sunrise,_sunset] = [new Date(sunrise * 1000),new Date(sunset * 1000)];
    return (
        <div className="weather-section">
            <h4>{description.charAt(0).toUpperCase() + description.slice(1)}</h4>
            <section>
                <h5>Sunrise</h5>
                <p>{`${_sunrise.getHours()}:${_sunrise.getMinutes()}`}</p>
            </section>
            <section>
                <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
            </section>
            <section>
                <h5>Sunset</h5>
                <p>{`${_sunset.getHours()}:${_sunset.getMinutes()}`}</p>
            </section>


        </div>
    )
};

export default CurrentStatus