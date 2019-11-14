import * as React from "react";

interface IProps {
    speed: number,
    deg: number,
    humidity: number,
    pressure: number
}

const Wind: React.FC<IProps> = ({speed,deg,humidity,pressure}) => {
    return (
        <div className="weather-section wind">
            <h4>Wind</h4>
            <section>
                <h5>Pressure</h5>
                <p>{pressure} hPa</p>
            </section>
            <section>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="40" height="40"
                     viewBox="0 0 80 80"
                     transform={`rotate(${deg || 0})`}
                     style={{fill:"#000000"}}>
                    <path fill="#bae0bd"
        d="M19.207 54.5L34.5 54.5 34.5 4.5 45.5 4.5 45.5 54.5 60.793 54.5 40 75.293z"/>
                    <path fill="#5e9c76"
        d="M45,5v49v1h1h13.586L40,74.586L20.414,55H34h1v-1V5H45 M46,4H34v50H18l22,22l22-22H46V4L46,4z"/>
                </svg>
                <p>{speed} m/s</p>
            </section>
            <section>
                <h5>Humidity</h5>
                <p>{humidity} %</p>
            </section>
        </div>
    )
};

export default Wind