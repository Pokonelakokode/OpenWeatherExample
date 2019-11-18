import * as React from "react";
import {IDaySum} from "../../types";

interface IProps extends IDaySum {
    day: string
    selectDay(day:string):void
    selectedDay: string | null
}

const Day: React.FC<IProps> = ({day,temp_min,temp_max,humidity_min,humidity_max,pressure_min,pressure_max,selectDay,selectedDay}) => {
    return (
        <div className={`day-sum${selectedDay === day ? ' selected' : ""}`} onClick={() => {selectDay(day)}}>
            <h4>{day}</h4>
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>Min</th>
                        <th>Max</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Temperature</th>
                        <td>{temp_min}</td>
                        <td>{temp_max}</td>
                    </tr>
                    <tr>
                        <th>Humidity</th>
                        <td>{humidity_min}</td>
                        <td>{humidity_max}</td>
                    </tr>
                    <tr>
                        <th>Pressure</th>
                        <td>{pressure_min}</td>
                        <td>{pressure_max}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
};

export default Day