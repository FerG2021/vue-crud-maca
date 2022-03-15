import { createApp } from 'vue'
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

//Vue.use(ElementUI);

createApp(App).use(store).use(router).mount('#app')
