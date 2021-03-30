const API_KEY = 'd5ac0a6c09744938a42280a05a2f2858';
const BASE_REQ_URL = `https://devapi.qweather.com/v7/weather/now?&key=${API_KEY}&lang=en`;
const BASE_DAILY_REQ_URL = `https://devapi.qweather.com/v7/weather/7d?key=${API_KEY}&lang=en`

/** 获取现在天气的 icon 节点
 * @type {Element | null}
 */
let nowWeather = document.querySelector('#nowWeather');

/** 城市代码的集合
 * @type {Array<Object>}
 */
const LOCATION_MAPPER = {
    BeiJing: 101010100,
    ShangHai: 101020100,
    ShenZhen: 101280601,
    GuangZhou: 101280101,
};
/** 时间数组 - 周
 * @type {Array<string>}
 */
const DAY_STR_ARR = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** 时间数组 - 月
 * @type {Array<string>}
 */
const MONTH_STR_ARR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

/** 配置化
 * 请求状态数组
 */
const ERROR_MAPPER = [
    {
        status:'400',
        meg : 'Bad Request',
    },
    {
        status:'401',
        meg : 'Unauthorized',
    },
    {
        status:'402',
        meg : 'Payment Required',
    },
    {
        status:'403',
        meg : 'Forbidden',
    },
    {
        status:'404',
        meg : 'Not Found',
    },
    {
        status:'405',
        meg : 'Method Not Allowed',
    },
    {
        status:'406',
        meg : 'Not Acceptable',
    },
    {
        status:'407',
        meg : 'Proxy Authentication Required',
    },
    {
        status:'408',
        meg : 'Request Timeout',
    },
    {
        status:'409',
        meg : 'Conflict',
    }
];

/** 配置化
 * @type {Array<Object>}
 */
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

/** 对应天气数组
 * @type {Array<Object>}
 */
const DAILY_WEATHER_CHANGE = [
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

/**
 * 获取切换城市按钮的节点
 * 并设置事件监听：点击时切换城市天气信息
 */
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

/**
 * 提供某城市的天气信息并且加载左侧的天气卡片，更新相关信息
 * @param city {string} - 需要获取信息的城市
 */
function renderData(city) {
    requestCurrentWeather(city).then(data => {
        renderLeftPanel(data);
    });
    requestWeather(city).then(data => {
        renderDailyData(data);
        let dailyWeather = document.querySelectorAll('.day-icon');
        let dailyWeatherUpper = [];
        for (let i = 0; i <= 3; i++) {
            dailyWeatherUpper[i] = data[i].Weather3d.toUpperCase();
            weatherIconChange(dailyWeatherUpper[i], dailyWeather[i]);
        }
        feather.replace();
    })
}

/**
 * fetch 接口并对 fetch 做一些判断和错误捕捉
 */
async function request(location) {
    return fetch(`${BASE_REQ_URL}&location=${LOCATION_MAPPER[location]}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                });
            }
        })
        .catch(error => {
            console.log('Error is: ', error);
            alert("There may be something wrong with your network.");
            for (let i = 0; i < ERROR_MAPPER.length; i++) {
                if (error.status === ERROR_MAPPER[i].status) {
                    console.log('Error is: ', error);
                    alert(ERROR_MAPPER[i].meg);
                    return;
                }else {
                    console.log('Error is: ', error);
                }
            }
        });
}

/**
 * 请求 API 接口，获取天气
 * @param location { typeof LOCATION_MAPPER }
 *
 */
async function requestCurrentWeather(location) {
    return request(location)
        .then(weatherData => {
            /**
             * @param updateTime {Date}
             * @param nowWeather {Element}
             */
            let currentWeatherUpper = weatherData.now.text.toUpperCase();
            weatherIconChange(currentWeatherUpper, nowWeather);
            return ({
                location,
                ...parseDate(weatherData.updateTime),
                ...weatherData.now,
            })
        });
}

/**
 * 获取从接口中拿到的数据并进行简单处理并添加到对应 selector 中
 */
function renderLeftPanel(data) {
    LEFT_PANEL_DATA_MAPPER.forEach(({selector, attr, computed}) => {
        const $el = document.querySelector(selector);
        if ($el instanceof HTMLElement) {
            $el.textContent = computed ? computed(data) : data[attr];
        }
    })
    feather.replace();
}

/** 对近三日的天气信息进行请求数据并返回
 * @param location {typeof LOCATION_MAPPER} - 需要查询的城市
 */
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
 * 获取的天气信息
 */
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

/**
 * 通过获得的天气信息设置天气卡片的内容和 icon 等
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


/**
 * 设计天气图标的变化
 * @param weatherUpper {string} - 当天天气的大写形式
 * @param selectElem {Element} - 需要变化的elem
 */
function weatherIconChange(weatherUpper, selectElem) {
    for (let i = 0; i < DAILY_WEATHER_CHANGE.length; i++) {
        if (weatherUpper.indexOf(DAILY_WEATHER_CHANGE[i].weather) !== -1) {
            selectElem.setAttribute("data-feather", DAILY_WEATHER_CHANGE[i].value);
            return;
        } else {
            selectElem.setAttribute("data-feather", "cloud");
        }
    }
}

/**
 * 计算并获取需要的时间（年 月 日 周
 * @param dateStr {Date} - 需要计算的时间（年 月 日 周
 * @returns {{ year : number, month : number, date : number, day : string}}
 */
function parseDate(dateStr) {
    const date = new Date(dateStr);
    return ({
        year: date.getFullYear(),
        month: MONTH_STR_ARR[date.getMonth()],
        date: date.getDate(),
        day: DAY_STR_ARR[date.getDay()]
    })
}

// function flipCard() {
//
// }

renderData('BeiJing');