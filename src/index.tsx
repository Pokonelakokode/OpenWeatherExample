import * as React from 'react';
import "./styles.scss";
import {render} from 'react-dom';
import WeatherLoader from "./components/WeatherLoader";

export const API_KEY = process.env.API_KEY;

render(
    <WeatherLoader API_KEY={API_KEY}/>,
    document.getElementById('app'),
);