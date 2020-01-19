<template>
  <div>
    <div class="container">
      <h1 class="mt-5">Vue Weather App</h1>
      <input v-model="city" type="text" class="mt-5 p-2 mr-2" placeholder="Enter a city">
      <button @click="getWeather()" class="btn p-2 ">Search</button>
      <div v-if="degree">
        <img :src="weatherIconSrc" class="mt-4">
        <h2 class="mt-3">{{ degree }}&deg;C</h2>
        <h3 class="mt-2">{{ humidity }}% Humidity</h3>
        <h3>{{ description }}</h3>
      </div>
      
      
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      city: '',
      degree: null,
      humidity: null,
      weatherIconSrc: '',
      condition: '',
      description: '',
      hovered: false
    }
  },
  methods: {
    getWeather(){
      Axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&appid=e166c3c460c1e13a7ea0da80c9f42bd8")
      .then(response => {
        this.degree = this.kelvinToCelsius(response.data.main.temp);
        this.humidity = response.data.main.humidity;
        this.condition = response.data.weather[0].main;
        this.description = response.data.weather[0].description.toUpperCase();
        this.setIconSrc(this.condition);
        //this.getForecast();
        //console.log(response);
        //console.log(this.condition);
      })
    },
    /*getForecast(){
      Axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + this.city + "&appid=e166c3c460c1e13a7ea0da80c9f42bd8")
      .then(response => {
        console.log(response);
      })
    },*/
    kelvinToCelsius(kelvin){
      return parseInt(kelvin - 273);
    },
    setIconSrc(condition){
      switch(condition){
        case 'Clouds':
          this.weatherIconSrc = require('../assets/cloudy.png');
          break;
        case 'Sun':
          this.weatherIconSrc = require('../assets/sunny.png');
          break;
        case 'Rain':
          this.weatherIconSrc = require('../assets/rainy.png');
          break;
        case 'Clear':
          this.weatherIconSrc = require('../assets/sunnyandcloudy.png');
          break;
        default:
          this.weatherIconSrc = '';
      }
    }
  }   
}
</script>

<style>
  .btn {
    border-radius: 0%;
    background-color:#C63E00;
    color: white;
    line-height: 1.6;
    vertical-align: 0%; 
  }
  .btn:hover {
    background-color: rgb(240, 120, 64);
  }

  body {
    background-color: rgb(209, 201, 209);
  }

  h2 {
    font-size: 40px;
  }
  
</style>
