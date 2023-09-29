const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=cd9ef977e959559807620c3866add7d3';
const API_UNITS = '&units=metric';

const whatWeather = status => {
	if (status >= 200 && status < 233) {
		photo.setAttribute('src', './img/thunderstorm.png');
	} else if (status >= 300 && status < 322) {
		photo.setAttribute('src', './img/drizzle.png');
	} else if (status >= 500 && status < 532) {
		photo.setAttribute('src', './img/rain.png');
	} else if (status >= 600 && status < 622) {
		photo.setAttribute('src', './img/ice.png');
	} else if (status >= 701 && status < 782) {
		photo.setAttribute('src', './img/fog.png');
	} else if (status >= 801 && status < 805) {
		photo.setAttribute('src', './img/cloud.png');
	} else if (status === 800) {
		photo.setAttribute('src', './img/sun.png');
	} else {
		photo.setAttribute('src', './img/unknown.png');
	}
};

const getWeather = () => {
	const city = input.value || 'London';
	const URL = API_LINK + city + API_KEY + API_UNITS;
	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + '°C';
			humidity.textContent = hum + '%';
			weather.textContent = status.main;

			warning.textContent = '';

			whatWeather(status.id);
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta'));
};

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

getWeather();

input.addEventListener('keyup', enterKeyCheck);
button.addEventListener('click', getWeather);
