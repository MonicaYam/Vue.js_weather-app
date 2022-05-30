import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'

/* font-awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTemperatureHigh, faTemperatureLow } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTemperatureHigh, faTemperatureLow)

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount('#app')

import "bootstrap/dist/js/bootstrap.js"