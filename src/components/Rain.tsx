import * as React from "react";

interface IProps {
    rain: {
        "1h"?: number
        "3h"?: number
    }
}

const Rain: React.FC<IProps> = (props) => {
    return (
        <div className="weather-section">
            <h4>Rain</h4>
            {props.rain["1h"] && <p>Last hour {props.rain["1h"]} mm</p>}
            {props.rain["3h"] && <p>Last 3 hour {props.rain["3h"]} mm</p>}
        </div>
    )
};

export default Rain