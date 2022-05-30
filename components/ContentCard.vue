<template>
  <div class="card border-dark mb-3 mt-3 mx-auto text-center w-50" >
    <div class="card-header bg-transparent border-dark">    
      <input type="text" v-model="city_name" placeholder="Enter a city name" class="form-control" @keyup.enter="fetchLocation($event)">
    </div>
    <div class="card-body" v-if="weather.current !== undefined">
        <div class="location-box text-center h6">
          <div class="location">{{ location.display_name }}</div>
        </div>

        <div class="weather-box">
          <div class="weather-name h1 text-center">{{ weather.current.weather[0].main }} </div>
          <div class="weatherInfo container">
            <div class="row pt-3">
              <div class="col-sm">
                  <img v-bind:src="'http://openweathermap.org/img/wn/'+weather.current.weather[0].icon+'@4x.png'" alt="Weather"> 
              </div>
              <div class="col-sm pt-5 text-start">
                <p class="h1">
                  {{ Math.round(weather.current.temp) }}°c 
                </p>
                <p class="h6 pt-2">
                  <font-awesome-icon icon="temperature-high" />
                  {{ Math.round(weather.daily[0].temp.max) }}°c  &nbsp;&nbsp;
                  <font-awesome-icon icon="temperature-low"  />
                  {{ Math.round(weather.daily[0].temp.min) }}°c
                </p>
                <p class="h6 pt-3">
                  Feels like: {{ Math.round(weather.current.feels_like) }}°c
                </p>
              </div>
                  
              <div class="col-sm-6 weatherDetails pt-5">
                <div class="row detailRow text-start">
                  <div class="col h6 pt-3">Humidity:{{weather.current.humidity}},</div>
                  <div class="col h6 pt-3"> UVI: {{weather.current.uvi}}</div>
                </div>
                <div class="row detailRow text-start">
                  <div class="col h6 pt-3">Wind direction: {{wind_dir}},</div>
                  <div class="col h6 pt-3">Wind speed : {{weather.current.wind_speed}}m/sec </div>
                </div>
              
                <div class="row detailRow text-start">
                  <div class="col h6 pt-3">Pressure:  {{weather.current.pressure}} hPa,</div>
                  <div class="col h6 pt-3">Visibility: {{Math.round(weather.current.visibility)/1000}} km</div>
                </div>
              </div><!-- weatherDetails -->
            </div> <!-- row -->
          
            <hr class="line"/>
            <!--  display 8 days forcast -->
            <div class="row forcast">
              <div class="col px-md-2" v-for="forcast in forcasts" v-bind:key="forcast.date">
                <p class="grid-content forcastInfo"> 
                  {{forcast.dayName}} 
                  <br/>
                  <img v-bind:src="'http://openweathermap.org/img/wn/'+forcast.icon+'.png'" alt="Weather"/>
                  <br/>
                  <span class="highTemp">{{Math.round(forcast.temp)}}°c </span> 
                  <br/>
                  <span class="lowTemp"> 
                    {{ Math.round(weather.daily[0].temp.min) }} °c
                  </span>
                </p>
              </div>
            </div><!-- row forcast -->
          </div><!-- temp -->
        </div><!-- //weather-box -->
    </div> <!-- //card-body -->
  <div class="card-footer bg-transparent border-success">MonicaYam 2022</div>
</div>
</template>

<script>
//for location API
const location_api_key = '';
const location_url_base = 'https://us1.locationiq.com/v1/search.php?key=';
//for weather API
const weather_api_key = '';
const weather_url_base = 'https://api.openweathermap.org/data/2.5/onecall?';

export default {
  name: 'App',
  data () {
    return {
      location_api_key,
      location_url_base,
      weather_api_key,
      weather_url_base,
      city_name: '',
      wind_dir:'',
      weather: {},
      forcasts: [],
      location: {}
    }
  },

  methods: {
    fetchLocation (e) {
      console.log(`${this.location_url_base}${this.location_api_key}&q=${this.city_name}&format=json`);
      if (e.key == "Enter") {

        fetch(`${this.location_url_base}${this.location_api_key}&q=${this.city_name}&format=json`)
          .then(res => {
            return res.json();
          }).then(this.setLocationResults).then(this.fetchWeather);
          
      }
    },

    fetchWeather(){
      const url = this.weather_url_base+"lat="+this.location.lat+"&lon="+this.location.lon;
      console.log(url);
      console.log("&exclude=hourly,minutely&units=metric&appid="+this.weather_api_key);
      fetch(`${this.weather_url_base}lat=${this.location.lat}&lon=${this.location.lon}&exclude=hourly,minutely&units=metric&appid=${this.weather_api_key}`)
        .then(res => {
          return res.json();
        })
        .then(json => {
          this.forcasts.length=0;
          this.weather = json;
          for (let i = 0; i <= 7; ++i) {
            let info = json.daily[i];
            const date = new Date (info.dt*1000);
            this.forcasts.push({dayName:date.toLocaleString("en-US", {weekday: "short"}), temp:info.temp.day,maxTemp:info.temp.max,minTemp:info.temp.min, icon:info.weather[0].icon});
          }

          this.getWindDirection(Math.round(json.current.wind_deg));
          
        });


    },
    setLocationResults (results){
      this.location = results[0];
    },

    getWindDirection(wind_deg){
      let deg = Math.round((wind_deg/22.5));
      const arr=['N','NNE','NE','ENE','E','ESE', 'SE', 'SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
      this.wind_dir=arr[(deg%16)];
    }
  }
}
</script>