import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Text from './Text';
import Image from './Image';

const Card = () => {


    const [latitude, setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0);
    const [typeUnit, setTypeUnit] = useState("metric");
    const [temperatureInitials,setTemperatureInitials] = useState(" °C");
    const [weather, setWeather] = useState("")
    const [temperature, setTemperature] = useState(0)
    const [cityName, setCityName] = useState("")
    const [country, setCountry] = useState("")
    const [icon, setIcon] = useState("")
    const [speed, setSpeed] = useState("")
    const [clouds, setClouds] = useState("")
    const [pressure, setPressure] = useState("")

    const savePositionToState = (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    };

    const changeUnits = (unit) => {
        if(unit === "metric"){
            setTypeUnit("imperial");
            setTemperatureInitials(" °F")
        }

        if (unit === "imperial") {
            setTypeUnit("metric");
            setTemperatureInitials(" °C")
        }
        return unit;
    }

    useEffect(() => {
        const logicData = async () => {
            window.navigator.geolocation.getCurrentPosition(savePositionToState)
            const key = "76a656c9c43b358a0036c7203cff386a";
            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${typeUnit}`);
            setCityName(data.data.name)
            setWeather(data.data.weather[0].description)
            setCountry(data.data.sys.country)
            setTemperature(data.data.main.temp)
            setSpeed(data.data.wind.speed)
            setClouds(data.data.clouds.all)
            setPressure(data.data.main.pressure)
            setIcon("http://openweathermap.org/img/w/" + data.data.weather[0].icon + ".png")


        }
        logicData();
    }, [typeUnit,latitude,longitude])


    return (
        <div>
            <div>
            <Image image={icon} text={weather}/>
            <Text text={temperature + temperatureInitials}/>
            </div>
            <div>
            <Text text={country}/>
            <Text text={cityName}/>
            <Text text={"\"" + weather + " \""}/>
            <Text text={"\"Wind Speed  : "+speed+" m/s \" "}/>
            <Text text={"\"Clouds : "+clouds+"\""}/>
            <Text text={"\" Pressure : "+pressure+"\""}/>
            </div>
            

            
            <button onClick = {() => {
                changeUnits(typeUnit);
            }} >DEGREES °F/°C</button>
        </div>
    );
};

export default Card;