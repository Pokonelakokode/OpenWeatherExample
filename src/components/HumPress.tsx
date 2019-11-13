import * as React from "react";

interface IProps {
    humidity: number,
    pressure: number
}

const HumPress: React.FC<IProps> = (props) => {
    return (
        <div className="weather-section">
            <h4>Humidity/Pressure</h4>

        </div>
    )
};

export default HumPress