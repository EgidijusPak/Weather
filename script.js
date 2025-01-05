function getCities() {
  const products = localStorage.getItem("savedCities");
  return products ? JSON.parse(products) : [];
}

function saveCities(cities) {
  localStorage.setItem("savedCities", JSON.stringify(cities));
}

let input = document.getElementById("input");
let button = document.getElementById("button");
let select = document.getElementById("day");
let form = document.getElementById("form");
let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");

const cities = [
  "vilnius",
  "kaunas",
  "klaipeda",
  "siauliai",
  "panevezys",
  "alytus",
];
const weatherConditions = {
  clear:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOhfYPyoinuu8FzyiPutqpxsCXZ7oyU0pKow&s",
  "partly-cloudy":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7aWAnhOAaDl9SAc2B7dPyBbbsb648CM-QrQ&s",
  "variable-cloudiness":
    "https://e7.pngegg.com/pngimages/656/864/png-clipart-weather-forecasting-cloud-overcast-wind-cloud-heart.png",
  "cloudy-with-sunny-intervals":
    "https://w7.pngwing.com/pngs/411/844/png-transparent-cloud-cloudy-sun-sunny-weather-weather-flat-icon.png",
  cloudy:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQVcrIzU4KdouG7NmpjUCmAxaF9oWMcEKKA&s",
  "rain-showers":
    "https://i.pinimg.com/564x/30/37/ce/3037ce9608c5bba85aa80cba05acb744.jpg",
  "light-rain-at-times":
    "https://w7.pngwing.com/pngs/808/125/png-transparent-weather-forecasting-severe-weather-rain-storm-light-rain-text-weather-forecasting-logo-thumbnail.png",
  "rain-at-times":
    "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather06-512.png",
  "light-rain": "https://cdn-icons-png.flaticon.com/512/1959/1959342.png",
  rain: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwofjr-gJnWoDLYepvEkmGQuZawT2W1E0o4D7maEQ-cpKKytxZRynMlCLt_RwCfIXwYpg&usqp=CAU",
  "heavy-rain": "https://cdn-icons-png.flaticon.com/512/6408/6408892.png",
  thunder:
    "https://p7.hiclipart.com/preview/207/436/916/thunderstorm-lightning-illustration-thunderstorm-lightning-weather-vector-thumbnail.jpg",
  "isolated-thunderstorms":
    "https://cdn-icons-png.flaticon.com/512/1959/1959321.png",
  thunderstorms: "https://banner2.cleanpng.com/20180712/ku/aaw8uhljd.webp",
  "sleet-showers":
    "https://w7.pngwing.com/pngs/228/348/png-transparent-sleet-good-cloudscape-goodnight-frosty-sunny-water-drops-3d-icon-thumbnail.png",
  "sleet-at-times":
    "https://png.pngtree.com/png-vector/20220621/ourmid/pngtree-winter-season-sleet-raindrop-snow-png-image_5247648.png",
  "light-sleet":
    "https://w7.pngwing.com/pngs/94/992/png-transparent-line-h-m-sky-plc-line-blue-cloud-hand-thumbnail.png",
  sleet:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ALii0yDTSa0NU6qpJ0GrBedQvlfTRJ71FlBDdL11IyU2ckIkj8RXPSKCFbD415Yvx2E&usqp=CAU",
  "freezing-rain":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PvBVhFuI4XRD6J_ns3xPC4j5qk8cVt1i6ptp95MG9YMdWlP_HYOShobDuOb6oK0JGgY&usqp=CAU",
  hail: "https://cdn-icons-png.flaticon.com/512/5782/5782377.png",
  "snow-showers":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKm0L-RUPpalibaIStBSRfrQMWwQAhsEzgYfZRg2DweWYkdR-44buKRepZ25SgrDpkrE&usqp=CAU",
  "light-snow-at-times":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUmxR7HWFXJc93O2mx7hmXFqFS2jJewo21mA&s",
  "snow-at-times":
    "https://w7.pngwing.com/pngs/378/953/png-transparent-weather-cloud-snowy-modern-creative-weather-icon.png",
  "light-snow":
    "https://static.vecteezy.com/system/resources/previews/007/488/951/non_2x/light-snow-color-icon-winter-snowy-weather-cloud-and-snowflake-weather-forecast-isolated-illustration-vector.jpg",
  snow: "https://img.freepik.com/premium-vector/blue-snow-cloud-falling-snowflakes-weather-forecast-element-vector-illustration-cartoon-design_9209-10904.jpg",
  "heavy-snow":
    "https://img.freepik.com/premium-vector/heavy-snow-flat-illustration_120816-4385.jpg",
  snowstorm: "https://cdn-icons-png.flaticon.com/512/4165/4165557.png",
  fog: "https://www.shutterstock.com/image-vector/fog-color-icon-foggy-weather-260nw-1212081892.jpg",
  squall:
    "https://www.kindpng.com/picc/m/448-4484093_squall-squall-icon-weather-hd-png-download.png",
  null: "https://t3.ftcdn.net/jpg/05/31/99/72/360_F_531997233_Uo7u6Cwj2qjtREfv11x7kkMyk53mTku7.jpg",
};

const getWeatherOfDefoultCieties = async () => {
  for (let i = 0; i < cities.length; i++) {
    const res = await fetch(
      `https://api.meteo.lt/v1/places/${cities[i]}/forecasts/long-term`
    );
    const data = await res.json();
    console.log(data);
    let weatherCode = data.forecastTimestamps[0].conditionCode;
    console.log(weatherCode);
    console.log(weatherConditions[weatherCode]);
    section1.innerHTML += `<article>
         <h3>${data.place.name}</h3>
         <p>Temperaūra: ${data.forecastTimestamps[0].airTemperature}</p>
         <p>Jutiminė temepratūra: ${data.forecastTimestamps[0].feelsLikeTemperature}</p>
         <p>Oro sąlygos: <img src="${weatherConditions[weatherCode]}" alt="oro sąlygos"></p>
         </article>`;
  }
  let LsCities = getCities();
  for (let i = 0; i < LsCities.length; i++) {
    const res = await fetch(
      `https://api.meteo.lt/v1/places/${LsCities[i]}/forecasts/long-term`
    );
    const data = await res.json();

    addText(data, 0);
  }
};

function addText(data, forecast) {
  const article = document.createElement("article");
  article.id = `${data.place.code}`;

  const h3 = document.createElement("h3");
  h3.textContent = data.place.name;

  const temp = document.createElement("p");
  const feelsLike = document.createElement("p");
  const condition = document.createElement("p");
  const images = document.createElement("img");
  condition.innerText = "Oro sąlygos: ";

  if (forecast == 24) {
    temp.textContent = `Temperatūra: ${data.forecastTimestamps[24].airTemperature}`;

    feelsLike.textContent = `Jutiminė temperatūra: ${data.forecastTimestamps[24].feelsLikeTemperature}`;

    let weatherCode = data.forecastTimestamps[24].conditionCode;
    images.src = weatherConditions[weatherCode];
  } else {
    temp.textContent = `Temperatūra: ${data.forecastTimestamps[0].airTemperature}`;

    feelsLike.textContent = `Jutiminė temperatūra: ${data.forecastTimestamps[0].feelsLikeTemperature}`;

    let weatherCode = data.forecastTimestamps[0].conditionCode;
    images.src = weatherConditions[weatherCode];
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Pašalinti";
  deleteButton.id = `delete-${data.place.code}`;

  article.appendChild(h3);
  article.appendChild(temp);
  article.appendChild(feelsLike);

  article.appendChild(condition);
  article.appendChild(images);
  article.appendChild(deleteButton);

  section2.appendChild(article);

  deleteButton.addEventListener("click", () => {
    section2.removeChild(article);

    let savedCities = getCities();

    const index = savedCities.indexOf(data.place.name);
    if (index !== -1) {
      savedCities.splice(index, 1);
      saveCities(savedCities);
    }
  });
}

getWeatherOfDefoultCieties();

button.addEventListener("click", (event) => {
  event.preventDefault();

  let saved_cities = getCities();

  let forecast = select.value;
  if (input.value.trim() === "") {
    alert("Įveskite miesto pavadinimą");
    return;
  }
  const getWeather = async () => {
    const res = await fetch(
      `https://api.meteo.lt/v1/places/${input.value.trim()}/forecasts/long-term`
    );
    if (!res.ok) {
      alert("Tokio miesto nėra");
      return;
    }

    const data = await res.json();

    if (saved_cities.includes(data.place.name)) {
      alert("Toks miestas jau yra");
      return;
    }

    const articleId = `article-${data.place.code}`;
    const deleteButtonId = `delete-${data.place.code}`;
    console.log(forecast);
    if (forecast == 24) {
      addText(data, forecast);
    } else {
      addText(data, forecast);
    }
    saved_cities.push(data.place.name);
    const deleteButton = document.getElementById(deleteButtonId);
    deleteButton.addEventListener("click", () => {
      const index = saved_cities.indexOf(data.place.name);
      if (index !== -1) {
        saved_cities.splice(index, 1);
        saveCities(saved_cities);
      }
    });
    saveCities(saved_cities);
  };

  getWeather();

  form.reset();
});
