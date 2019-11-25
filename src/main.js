import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue';
import echarts from 'echarts'
import  'echarts/theme/infographic.js'
import HelloWorld from './components/HelloWorld'
import Home from './components/Home'
import TedingChaxun from './components/TedingChaxun'
import FanweiChaxun from './components/FanweiChaxun'
import LuruSiji from './components/LuruSiji'
import LuruWeizhang from './components/LuruWeizhang'
import LuruQiche from './components/LuruQiche'
import ChaxunSijiweizhang from './components/ChaxunSijiweizhang'
import ChaxunCheduiweizhang from './components/ChaxunCheduiweizhang'

Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.use(VueRouter);

Vue.prototype.$echarts = echarts;

//配置路由
const router = new VueRouter({
	routes:[
		{path:"/", component:FanweiChaxun},
		{path:"/hello", component:HelloWorld},
		{path:"/tdcx", component:TedingChaxun},
		{path:"/fwcx", component:FanweiChaxun},
		{path:"/lrsj", component:LuruSiji},
		{path:"/lrwz", component:LuruWeizhang},
		{path:"/lrqc", component:LuruQiche},
		{path:"/sjwz", component:ChaxunSijiweizhang},
		{path:"/cdwz", component:ChaxunCheduiweizhang},
	],
	mode:"history"

})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
