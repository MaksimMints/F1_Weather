import React, {useState} from "react";

//*import "../styles/InputCity.css"

const api = {
    key: 'f025f4dd60a0cc5711c6e7c16c9852a8',
    base: 'http://api.openweathermap.org/data/2.5/'
  }
  
  function InputCity() {
  
    // действия при изменении города в поле ввода
    const [city, setCity] = useState('');
  
    // действия с данными погоды
    const [weather, setWeather] = useState({});
  
  
    // обработчик, который срабатывает когда нажата клавиша Enter
    const search = evt => {
      if (evt.key === 'Enter') {
        fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос
          .then(res => res.json())  // ответ преобразуем в json
          .then(result => {         // работаем с результатом
            setWeather(result);
            setCity('');
            console.log(result);
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
        <main>
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

          {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{format_date(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
          ) : ('')}
        </main>
      </div>
    );
  }
  
  export default InputCity;