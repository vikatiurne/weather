// міста, доступні у додатку
const cities = {
  706483: 'Харків',
  691650: 'Тернопіль',
  703448: 'Київ',
  709161: 'Феодосія',
  695365: 'Рівне',
};

// створення списку міст
const select = document.createElement('select');
select.classList.add('cities__names');
document.querySelector('.cities__list').appendChild(select);
for (let key in cities) {
  let city = document.createElement('option');
  city.value = key;
  city.textContent = cities[key];
  select.appendChild(city);
  if (key == '706483') city.setAttribute('selected', '');
}

// створення елементів на строрінці для відображення інформації
let info = document.querySelector('.weather__info');

let currentCity = document.createElement('p');
info.prepend(currentCity);

let temper = document.querySelector('.weather__temp');

let currentTemp = document.createElement('p');
temper.append(currentTemp);

let feelsTemp = document.createElement('p');
temper.append(feelsTemp);

let description = document.createElement('p');
info.append(description);

let windSpeed = document.createElement('p');
info.append(windSpeed);

let windDeg = document.createElement('div');
info.append(windDeg);

document
  .querySelector('.weather__info>div:nth-child(6)')
  .classList.add('weather__wind');

let windDegText = document.createElement('p');
windDeg.append(windDegText);

let windDegArrow = document.createElement('img');
windDeg.append(windDegArrow);

document
  .querySelector('.weather__wind>img')
  .setAttribute('src', './img/arrow-down.svg');

let pressure = document.createElement('p');
info.append(pressure);

// параметри fetch запросу
const param = {
  url: 'https://api.openweathermap.org/data/2.5/',
  appid: '1261fef8d32a4c1809b39af92dc42387',
};

// функція отримання погоди
function getWeather() {
  const cityId = document.querySelector('.cities__names').value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

// функція отримання дати
function getCurrentDate() {
  let date = new Date();
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1;
  if (mounth < 10) mounth = `0${mounth}`;
  let day = date.getDate();
  if (day < 10) day = `0${day}`;
  return `${day}:${mounth}:${year}`;
}

// функція показу на сторінку
function showWeather(data) {
  //фонова картинка
  let card = document.querySelector('.weather__card');
  let bgi = data.weather[0]['icon'];
  card.style.backgroundImage = `url(./img/${bgi[0]}${bgi[1]}.jpg)`;
  // іконка
  document.querySelector(
    '.weather__icon'
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${bgi}@2x.png" />`;
  //дата
  document.querySelector('.date').textContent = getCurrentDate();

  //інформація
  currentCity.innerHTML = `погода у місті <span>${data.name}</span>`;
  currentTemp.innerHTML = `<span>${Math.round(data.main.temp)}&deg</span>`;
  description.innerHTML = `${data.weather[0]['description']}`;
  feelsTemp.innerHTML = `відчувається як <span>${Math.round(data.main.feels_like)}&deg</span>`;
  windSpeed.innerHTML = `швидкість вітру <span>${Math.round(data.wind.speed)}</span> м/сек`;
  windDegText.innerHTML = 'напрям вітру ';
  document.querySelector('.weather__wind>img').style.transform = `rotate(${data.wind.deg}deg)`;
  pressure.innerHTML = `атмосферний тиск <span>${data.main.pressure}</span> гПА`;
}

// оновлення при завантаженні сторінки
getWeather();

// оновлення при заміні міста
document.querySelector('.cities__names').onchange = getWeather;

// оновлення при натисканні на кнопку
document.querySelector('.update').onclick = getWeather;
