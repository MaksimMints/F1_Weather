import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Current from "./Current";
import FiveDays from "./FiveDays";


function ChoicePlace() {
    const [isLoading, setLoading] = useState(true);  // Флаг готовности результата axios
    const [city, setCity] = useState('Москва'); // отслеживаем изменение города
    const [current, setCurrent] = useState([]);
    const [fivedays, setFivedays] = useState([]);
    const [temp, setTemp] = useState([]);
    const [wind_speed, setWind_speed] = useState([]);
    const key_openweathermap = 'f025f4dd60a0cc5711c6e7c16c9852a8';
    const [description, setDescription] = useState([]);
    const [feels_like, setFeels_like] = useState([]);
    const [lat, setLat] = useState(55.7522); // отслеживаем изменение текущих координат, по умолчанию - Москва
    const [lon, setLon] = useState(37.6156);
    const [widget, setWidget] = useState('current'); // Отслеживаем какой виджет (компонент) показывать
    const [pict, setIcon] = useState('03n');
    
    

 
    useEffect(() => {

        if (key_openweathermap !== undefined) {
            axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key_openweathermap}`).then(res => {
               setLat(res.data[0].lat);
               setLon(res.data[0].lon);
               console.log('координаты выбранного города', res.data[0].lat, res.data[0].lon)
            });
        };
        // Получаем данные о погоде на «сейчас».
        if (key_openweathermap !== undefined) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key_openweathermap}&units=metric&lang=ru`).then(res => {
                setCurrent(res.data.current);
                setDescription(res.data.weather[0].description);
                setTemp(res.data.main.temp);
                setWind_speed(res.data.wind.speed);
                setFivedays(res.data.daily);
                setIcon(res.data.weather[0].icon);
                setLoading(false);
                setFeels_like(res.data.main.feels_like);
                console.log('res.data ', res.data)
            });
        };
    }, [city, key_openweathermap]);

    // Если флаг isLoading = false то выводим "Loading..."
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    // Иначе выводим полученные из axios данные
    return (
        <main>
            <div className="cover">

                <div className='button'>

                    <div className='search-box'>
                        <input
                            type='text'
                            className='search-bar'
                            placeholder='Поиск...'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            //*onKeyDown={search}
                        />
                    </div>

                    <button onClick={e=>setWidget("current")}>Сегодня</button>
                    <button onClick={e=>setWidget("fivedays")}>На 5 дней</button>
                </div>

                {(widget === "current" && key_openweathermap !== undefined ) &&
                    <div>
                        <Current key1={key_openweathermap} lat={lat} lon={lon} city={city} icon={pict}
                        description={description} feels_like={feels_like} temp={temp} wind_speed={wind_speed}/>
                    </div>
                }

                {widget === "fivedays" &&
                    <div>
                        <div className="city">{city}</div>
                        <div className="widgets">
                            {fivedays && fivedays.map((value,index) =>
                                <FiveDays day={index} temp={value.temp.day} icon={value.weather[0].icon} key={value.dt}/>
                            )}
                        </div>
                    </div>
                }
            </div>
        </main>
    );

}

export default ChoicePlace
