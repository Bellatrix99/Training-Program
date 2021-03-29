const API_KEY = 'd5ac0a6c09744938a42280a05a2f2858';
const BASE_REQ_URL = `https://devapi.qweather.com/v7/weather/now?&key=${API_KEY}&lang=en`;
const BASE_DAILY_REQ_URL = `https://devapi.qweather.com/v7/weather/7d?key=${API_KEY}&lang=en`

let nowWeather = document.querySelector('#nowWeather');


const LOCATION_MAPPER = {
    BeiJing: 101010100,
    ShangHai: 101020100,
    ShenZhen: 101280601,
    GuangZhou: 101280101,
};

const DAY_STR_ARR = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_STR_ARR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// 配置化
const LEFT_PANEL_DATA_MAPPER = [
    {
        selector: '.date-dayName',
        attr: 'day',
    },
    {
        selector: '.location',
        attr: 'location'
    },
    {
        selector: '.weather-temp',
        computed: (data) => `${data.temp}°C`
    },
    {
        selector: '.weather-desc',
        attr: 'text'
    },
    {
        selector: '.date-day',
        computed: (data) => `${data.date} ${data.month} ${data.year}`,
    },
    {
        selector: '.precipitation .value',
        computed: (data) => `${data.precip} mm`,
    },
    {
        selector: '.humidity .value',
        computed: (data) => `${data.humidity} %`
    }, {
        selector: '.wind .value',
        computed: (data) => `${data.windSpeed} KM/h`
    }
]

//     Sunny: sun,
//     Cloudy: cloud,
//     Shower: cloud-rain,
//     Rain: cloud-drizzle,
//     Snow: cloud-snow,
//     Thunder: cloud-lighting

let dailyWeatherChange = [
    {
        weather: "SUNNY",
        value: "sun"
    },
    {
        weather: "RAIN",
        value: "cloud-drizzle"
    },
    {
        weather: "SHOWER",
        value: "cloud-rain"
    },
    {
        weather: "SNOW",
        value: "cloud-snow"
    },
    {
        weather: "THUNDER",
        value: "cloud-lighting"
    }
];

const $el = document.querySelector('.location-container');
if ($el instanceof HTMLElement) {
    $el.addEventListener('click', (evt) => {
        const $target = evt.target;
        if (!($target instanceof HTMLElement)) {
            return;
        }
        const $realButton = $target.closest('.location-button');
        const $spanEl = $realButton.querySelector('.city-name');
        const city = $spanEl.textContent;
        renderData(city);
    })
}
let dailyWeather;
function renderData(city) {
    requestCurrentWeather(city).then(data => {
        renderLeftPanel(data);
    });
    requestWeather(city).then(data => {
        renderDailyData(data);
        dailyWeather = document.querySelectorAll('.day-icon');
        let dailyWeatherUpper = [];
        for (let i = 0; i <= 3; i++) {
            dailyWeatherUpper[i] = data[i].Weather3d.toUpperCase();
            weatherIconChange(dailyWeatherUpper[i], dailyWeather[i]);
        }
        feather.replace();
    })
}

function parseDate(dateStr) {
    const date = new Date(dateStr);
    return ({
        year: date.getFullYear(),
        month: MONTH_STR_ARR[date.getMonth()],
        date: date.getDate(),
        day: DAY_STR_ARR[date.getDay()]
    })
}

async function request(url) {

}

/**
 * 请求 API 接口，获取天气
 * @param location { typeof LOCATION_MAPPER }
 */
async function requestCurrentWeather(location) {
    return fetch(`${BASE_REQ_URL}&location=${LOCATION_MAPPER[location]}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherData) {
            let currentWeatherUpper = weatherData.now.text.toUpperCase();
            weatherIconChange(currentWeatherUpper, nowWeather);
            return ({
                location,
                ...parseDate(weatherData.updateTime),
                ...weatherData.now,
            })
        });
}

function renderLeftPanel(data) {
    LEFT_PANEL_DATA_MAPPER.forEach(({selector, attr, computed}) => {
        const $el = document.querySelector(selector);
        if ($el instanceof HTMLElement) {
            $el.textContent = computed ? computed(data) : data[attr];
        }
    })
    feather.replace();
}

async function requestWeather(location) {
    return fetch(`${BASE_DAILY_REQ_URL}&location=${LOCATION_MAPPER[location]}`)
        .then((res) => res.json())
        .then(dailyData => {
            return dailyData.daily.slice(0, 4).map(d => ({
                ...parseDate(d.fxDate),
                max: `${d.tempMax}°C`,
                min: `${d.tempMin}°C`,
                Weather3d: d.textDay,
            }))
        })
}

/**
 *
 * @param daily { {max: string, min: string} }
 * @param isActive { boolean } isActive
 * @return {HTMLLIElement}
 */
function createDailyItem(daily, isActive) {
    const $li = document.createElement('li');
    if (isActive) $li.classList.add('active');
    $li.innerHTML = `<i class="day-icon"></i><span class="day-name">${daily.day.slice(0, 3)}</span><span class="day-temp tempMin">${daily.min}</span><span class="day-temp tempMax">${daily.max}</span>`
    return $li;
}

function renderDailyData(dataArr) {
    const $list = document.querySelector('.week-list');
    $list.innerHTML = '';
    if ($list instanceof HTMLUListElement) {
        dataArr.forEach((data, index) => {
            const $el = createDailyItem(data, !index);
            $list.appendChild($el);
        });
    }
}

function flipCard() {

}


renderData('BeiJing');

function weatherIconChange(weatherUpper, selectElem) {
    for (let i = 0; i < dailyWeatherChange.length; i++) {
        if (weatherUpper.indexOf(dailyWeatherChange[i].weather) !== -1) {
            selectElem.setAttribute("data-feather", dailyWeatherChange[i].value);
            return;
        } else {
            selectElem.setAttribute("data-feather", "cloud");
        }
    }
}