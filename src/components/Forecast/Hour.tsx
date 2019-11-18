import * as React from "react";
import {convert24To12Format} from "../../utils";

interface IProps {
    temp: number,
    description: string,
    icon: string,
    speed: number,
    deg: number,
    dt_txt: string
}

const Hour: React.FC<IProps> = ({dt_txt,description,icon,temp}) => {
    return (
        <div className="hour">
            <h6>{convert24To12Format(new Date(dt_txt).getHours()) }</h6>
            <h6>{description}</h6>
            <h6>{temp} °C</h6>
            <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
        </div>
    )
};

export default Hour