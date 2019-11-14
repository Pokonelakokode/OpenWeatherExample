export type ILocalStores = "CurrentWeather" | "ForecastWeather"
export interface ILocation {
    longitude: number,
    latitude: number
}

export interface IForecastWeather {
    timeStamp: number,
    timezone: number,
    country: string,
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        }
        country: string,
        timezone: number
    }
    cnt: number,
    list: {
        dt: number,
        main: {
            temp: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number
        }
        weather: {
            id: number,
            main: string,
            description: string,
            icon: string
        }[],
        clouds: {
            all: number
        },
        wind: {
            speed: number,
            deg: number
        },
        rain: {
            "3h": number
        }
        snow: {
            "3h": number
        },
        dt_txt: number
    }[]
}

export type IWeatherAPITypes = "weather" | "forecast"

export interface ICurrentWeather {
    timeStamp: number,
    coord: {
        lon: number,
        lat: number
    }
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[],
    base: string,
    main: {
        temp: number,
        pressure: number,
        humidity: number,
        temp_min: number,
        temp_max: number
    },
    wind: {
        speed: number,
        deg: number
    },
    rain: {
        "1h"?:number
        "3h"?:number
    }
    snow: {
        "1h"?:number
        "3h"?:number
    }

    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        message: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}
