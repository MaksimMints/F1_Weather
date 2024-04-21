import React, {useState} from "react";
import axios from "axios";

const api = {
    key: 'f025f4dd60a0cc5711c6e7c16c9852a8',
    base_coord_city: 'http://api.openweathermap.org/geo/1.0/',
    base_today: 'http://api.openweathermap.org/data/2.5/',
    base_5days: 'http://api.openweathermap.org/data/2.5/forecast'
  }

function MyWeather() {

    // действия при изменении города в поле ввода
    const [city, setCity] = useState('');
    const [lat, setLat] = useState(); // отслеживаем изменение текущих координат
    const [lon, setLon] = useState();

    // действия с данными погоды
    const [weather, setWeather] = useState({});
    const [current, setCurrent] = useState([]);
    const [description, setDescription] = useState([]);
    const [temp, setTemp] = useState([]);
    const [wind_speed, setWind_speed] = useState([]);
    const [feels_like, setFeels_like] = useState([]);
    const [pict, setIcon] = useState();

    const currentWeather = () => {
        axios.get(`${api.base_today}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric&lang=ru`)
        .then (
            res => {
                setCurrent(res.data.current);
                setDescription(res.data.weather[0].description);
                setTemp(res.data.main.temp);
                setWind_speed(res.data.wind.speed);
                setIcon(res.data.weather[0].icon);
                setFeels_like(res.data.main.feels_like);
                console.log('res.data ', res.data)
            }
        )
    }

    const fiveDaysWeather = () => {
        axios.get(`${api.base_today}forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${api.key}&units=metric&lang=ru`)
        .then (
            res => {
                console.log('res.data ', res.data)
            }
        )
    }    

    const search = evt => {
        if (evt.key === 'Enter') {
            axios.get(`${api.base_coord_city}direct?q=${city}&limit=1&appid=${api.key}`) // отправляем запрос
            .then(res => {  
            //*.then(result => {         // работаем с результатом
                //*setWeather(result);
                //*setCity('');
                //*console.log(result);
                setLat(res.data[0].lat);
                setLon(res.data[0].lon);
                console.log('координаты выбранного города', res.data[0].lat, res.data[0].lon)
            });
        };
    }

    // форматирование даты
    const format_date = (d) => {
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
    }
        
    // JSX разметка
    return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <div className='search-box'>
            <input
            type='text'
            className='search-bar'
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyDown={search}
            />
        </div>
        <div>
            <button onClick={e => currentWeather()}>Сегодня</button>
            <button onClick={e => fiveDaysWeather()}>На 5 дней</button>
        </div>
        
    </div>                        
    )  

}


export default MyWeather;
