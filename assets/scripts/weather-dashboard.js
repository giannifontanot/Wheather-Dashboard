// Display the user's location
fFindOwnLocation();
// Display already saved cities
fFillButtonsList();


let submitEl = document.querySelector('#submit');
let cityEl = document.getElementById('input_city');

// ADD listeners to SUBMIT and to NEW CITY BUTTONS
submitEl.addEventListener('click', fGetWeather);
cityEl.addEventListener('click', fDeleteCityValue);


// Fill CITY BUTTONS from Local Storage
function fFillButtonsList() {
    console.log('fFillButtonsList');
    if ((localStorage.getItem('buttonsJSON'))) {
        const strButtonsJSON = localStorage.getItem('buttonsJSON');
        const objButtons = JSON.parse(strButtonsJSON);

        for (let i = 0; i < objButtons.length; i++) {
            //Create button element and append to button list
            const buttonEl = document.createElement("button");
            buttonEl.innerText = objButtons[i].name;
            buttonEl.className = 'pure-u-1 pure-button button-list';
            console.log(buttonEl.innerText);
            const listCityEl = document.getElementById('list_city');
            listCityEl.appendChild(buttonEl);
            buttonEl.addEventListener('click', fGetWeatherStored);
        }
    }
}

function fDeleteCityValue() {
    cityEl.value = "";
}


function fGetWeatherStored(event) {
    event.preventDefault();
    let storedCity = event.target.innerText;
    cityEl.value = storedCity;
    fGetWeather();
}

function fCreateButton(pCity) {
    // Create a list of previous searches
    let listCityEl = document.getElementById("list_city");
    let btnEl = document.createElement("button");
    btnEl.className = "pure-u-1 pure-button button-list";
    btnEl.innerText = pCity;
    listCityEl.appendChild(btnEl);
    btnEl.addEventListener('click', fGetWeatherStored);

}

function fGetWeather(event) {
    console.log('fGetWeather');
    // Default SUBMIT event will not fire
    if (event) {
        event.preventDefault();
    }

    let apiName = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityEl.value + "&limit=5&appid=6fa88c112922f0c002ec0deafa3d6748";

    //Fetch lat and lon of the city
    fetch(apiName)
        .then(response => {

            return response.json();
        })
        .catch(err => {
            console.log('error is:', err);
            console.log('catch1');
        })
        .then(data => {

            //Obtain latitude and longitud
            let lat = data[0].lat;
            let lon = data[0].lon;

            //Regular expression that looks for city name
            let re = new RegExp(cityEl.value);

            // Obtain the inner Text of the list of buttons
            let listCityEl = document.getElementById("list_city");
            let listCityText = listCityEl.innerText;
            if (!re.test(listCityText)) {
                // Create a new city button
                fCreateButton(cityEl.value);
                // Store the new button
                if (!localStorage.getItem('buttonsJSON')) {
                    localStorage.setItem('buttonsJSON', '[]');
                }
                let buttonsJSON = localStorage.getItem('buttonsJSON');
                let objButtons = JSON.parse(buttonsJSON);
                const myCity = new CityObject(cityEl.value);
                objButtons.push(myCity);
                localStorage.setItem('buttonsJSON', JSON.stringify(objButtons));
            }

            // Clear all containers
            document.getElementById('container-monday').innerHTML = "";
            document.getElementById('container-tuesday').innerHTML = "";
            document.getElementById('container-wednesday').innerHTML = "";
            document.getElementById('container-thursday').innerHTML = "";
            document.getElementById('container-friday').innerHTML = "";


            // We throw a fetch inside a fetch...
            let apiWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=6fa88c112922f0c002ec0deafa3d6748";
            fetch(apiWeather)
                .then(response => response.json())
                .then(data => {

                    // Updating header
                    document.getElementById("header_city").innerText = cityEl.value;

                    // Getting the information for today
                    document.getElementById("lbl-temp").innerText = fConvertKToF(data.current.temp);
                    document.getElementById("lbl-wind").innerText = data.current.wind_speed;
                    document.getElementById("lbl-humidity").innerText = data.current.humidity;
                    document.getElementById("lbl-uvindex").innerHTML = "<span class='" + fFindUVColor(data.current.uvi) + "'>" + data.current.uvi + "</span>";
                    document.getElementById("img_forecast").innerHTML = "<img class='pure-img imgBig' src='./assets/images/" + data.current.weather[0].icon + "@2x.png'>";
                    document.getElementById("current_description_temp").innerText = data.current.weather[0].description;

                    // Getting the information for the rest of the week
                    var containers = [];
                    containers [0] = 'container-monday';
                    containers [1] = 'container-tuesday';
                    containers [2] = 'container-wednesday';
                    containers [3] = 'container-thursday';
                    containers [4] = 'container-friday';


                    // Filling 5 containers
                    for (let i = 0; i < containers.length; i++) {

                        // We create a Moon Object to be called later
                        let myMoonObject = new MoonObject(data.daily[i].moon_phase);
                        myMoonObject.findMoonPhase();

                        let dataDate = fWhatIsThatNumber(data.daily[i].dt);
                        let dataImgTemp = "./assets/images/" + data.daily[i].weather[0].icon + "@2x.png"
                        let dataTemp = fConvertKToF(data.daily[i].temp.max);
                        let dataDescTemp = data.daily[i].weather[0].description;
                        let dataWind = data.daily[i].wind_speed;
                        let dataHumi = data.daily[i].humidity;
                        let dataUVI = data.daily[i].uvi;
                        let dataImgMoon = "./assets/images/" + myMoonObject.phaseImage + ".png";
                        let dataPercentageMoon = data.daily[i].moon_phase;
                        let dataDescMoon = myMoonObject.phaseName;

                        if (i === 0) {
                            document.getElementById("img_moon").innerHTML = "<img class='pure-img' src='./assets/images/" + myMoonObject.phaseImage + ".png'>";
                            document.getElementById("current_description_moon").innerHTML = "<span class='lbl_img_detail'>" + myMoonObject.phaseName + "</span>";
                        }

                        // Populate the fields of 5 containers
                        fNewDay(containers[i], dataDate, dataImgTemp, dataTemp, dataDescTemp, dataWind, dataHumi, dataUVI, dataImgMoon, dataDescMoon, dataPercentageMoon);
                    }

                })
                .catch(err => console.error('weather fetch failed', err));

        })
        .catch(err => {
            window.location.href = "#open-modal";
            console.log('CATCH 3: error is:', err);
        });
}


function fNewDay(pContainer, pDate, pTempImg, pTemp, pDescTemp, pWind, pHum, pUVI, pMoonImg, pDescMoon, pPercentageMoon) {

    let containerEl = document.getElementById(pContainer);
    // Date
    let lblDate = document.createElement("div");
    lblDate.className = "label-forecast ";
    lblDate.innerText = pDate;
    containerEl.appendChild(lblDate);

    //Create the container for both images
    let divg = document.createElement('div');
    divg.className = 'pure-g';

    let divu1El = document.createElement('div');
    divu1El.className = 'pure-u-1-2 center-content';
    let divu2El = document.createElement('div');
    divu2El.className = 'pure-u-1-2 center-content';


    //Temp img
    let lblImage = document.createElement('img');
    lblImage.setAttribute('src', pTempImg);
    lblImage.className = "pure-img";
    // append to divu1
    divu1El.appendChild(lblImage);

    // Temp label
    let lblImgTemp = document.createElement('span');
    lblImgTemp.className = 'lbl-image-daily';
    lblImgTemp.innerText = pDescTemp;
    divu1El.appendChild(lblImgTemp);


    //Moon Phase
    let imgMoon = document.createElement('img');
    imgMoon.setAttribute('src', pMoonImg);
    imgMoon.className = "pure-img imgMoon";
    divu2El.appendChild(imgMoon);

    //Moon Phase label
    let lblMoon = document.createElement('span');
    lblMoon.className = "lbl-image-daily";
    lblMoon.innerText = pDescMoon;
    divu2El.appendChild(lblMoon);

    // Append to divg
    divg.appendChild(divu1El);
    divg.appendChild(divu2El);

    // Append divg to the container
    containerEl.appendChild(divg);

    //temp
    let lblTemp = document.createElement('div');
    lblTemp.innerText = "Temp: " + pTemp + " °F";
    lblTemp.className = "label-forecast";
    containerEl.appendChild(lblTemp);

    //wind
    let lblWind = document.createElement('div');
    lblWind.innerText = "Wind: " + pWind;
    lblWind.className = "label-forecast";
    containerEl.appendChild(lblWind);

    //humidity
    let lblHum = document.createElement('div');
    lblHum.innerText = "Humidity: " + pHum;
    lblHum.className = "label-forecast";
    containerEl.appendChild(lblHum);

    //UVIndex
    let lblUVI = document.createElement('div');
    lblUVI.innerHTML = "UV Index: <span class='" + fFindUVColor(pUVI) + "'>" + pUVI + "</span>"
    lblUVI.className = "label-forecast";
    containerEl.appendChild(lblUVI);

}

function fFindUVColor(pUVIndex) {
    const uvValue = Number(pUVIndex);
    if (Number.isNaN(uvValue)) {
        return "uvGreen";
    }
    if (uvValue >= 8) {
        return "uvRed";
    } else if (uvValue >= 6) {
        return "uvYellow";
    }
    return "uvGreen";
}



























