import * as React from "react";
import {calculateDeltaT} from "../utils";
import {useEffect, useState} from "react";

interface IProps {
    updater():void
    timeStamp: number
}

const Updater: React.FC<IProps> = ({updater,timeStamp}) => {
    const [state,setState] = useState("");
    useEffect(() => {
        const update = setInterval(() => setState(calculateDeltaT(timeStamp)),1000);
        return () => clearInterval(update)
    },[timeStamp])
    return (
        <h4 >Last updated: {state}
            <span onClick={updater}> ↺</span>
        </h4>
    )
};

export default Updater