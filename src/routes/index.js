import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import Portfolio from '../components/portfolio/Portfolio';
import Stocks from '../components/stocks/Stocks';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/portfolio', component: Portfolio},
    {path: '/stocks', component: Stocks}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;