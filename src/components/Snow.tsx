import * as React from "react";

interface IProps {
    snow: {
        "1h"?: number
        "3h"?: number
    }

}

const Snow: React.FC<IProps> = (props) => {
    if(!props.snow["1h"] && !props.snow["3h"]) return null;
    return (
        <div className="weather-section">
            <h4>Snow</h4>
            {props.snow["1h"] && <p>Last hour {props.snow["1h"]} mm</p>}
            {props.snow["3h"] && <p>Last 3 hour {props.snow["3h"]} mm</p>}
        </div>
    )
};

export default Snow