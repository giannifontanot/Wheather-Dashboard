function fFindOwnLocation(){

    if(!navigator.geolocation){
        console.log("geolocation not supported by this browser");
    }else{
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

function success(pPosition){
        let lat = pPosition.coords.latitude;
        let lon = pPosition.coords.longitude;
        let apiLocation = "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox="+lat+"%2C"+lon+"%2C1000&mode=retrieveAddresses&gen=9&apiKey=Vb05SMLVt5twJcJrHjDAEfBZzb0leAHu6Wg8d0qLW2A";

        // Find the name of the city we are in
        fetch(apiLocation)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            let cityGeolocated = data.Response.View[0].Result[0].Location.Address.City;
            document.getElementById("input_city").value = cityGeolocated;

            fGetWeather();
        });

}
function error(){
        console.log("Error on geolocation");
}

//30.2672,-97.7431