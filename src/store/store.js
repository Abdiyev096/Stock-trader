import Vue from 'vue';
import Vuex from 'vuex';
import stocksData from '../data/stocksData';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        funds: 1000,
        stocks: [],
        myStocks: []
    },

    getters: {
        getFunds: (state) => state.funds,

        getStocks: (state) => state.stocks,

        getMyStocks: (state) => state.myStocks
    },

    mutations: {
        setStocks: (state, stocks) => {
            state.stocks = stocks
        },

        buyStocks: (state, order) => {
            state.funds -= order.price * order.quantity
            const index = state.myStocks.findIndex(el => el.stockID == order.stockID)

            if(index !== -1) {
                state.myStocks[index].quantity += order.quantity
            } else {
                state.myStocks.push(order)
            }
        },

        sellStocks: (state, order) => {
            state.funds += order.price * order.quantity
            const index = state.myStocks.findIndex(el => el.stockID == order.stockID)

            if(state.myStocks[index].quantity > order.quantity) {
                state.myStocks[index].quantity -= order.quantity
            } else if (state.myStocks[index].quantity == order.quantity) {
                state.myStocks.splice(index, 1)
            }
            
        },

        randomStocks: (state) => {
            state.stocks.forEach(el => {
                const randomNumber = 1 + Math.random() - 0.5;
                const index = state.myStocks.findIndex(myStock => el.id == myStock.stockID)

                if(index !== -1) {
                    el.price = Math.round(el.price * randomNumber)
                    state.myStocks[index].price = el.price
                } else {
                    el.price = Math.round(el.price * randomNumber)
                }
            })
        },

        setFunds: (state, funds) => {
            state.funds = funds
        },

        setMyStocks: (state, myStocks) => {
            state.myStocks = myStocks ? myStocks : []
        }
    },

    actions: {
        buyStocks: ({commit}, order) => {
            commit('buyStocks', order)
        },

        initStocks: ({commit}) => {
            commit('setStocks', stocksData)
        },

        sellStocks: ({commit}, order) => {
            commit('sellStocks', order)
        },

        randomStocks: ({commit}) => {
            commit('randomStocks')
        },

        loadData: ({commit}) => {
            axios.get('https://stock-trader-2969.firebaseio.com/data.json')
                    .then(response => {
                        if(response.data) {
                            const data = response.data
                            commit('setFunds', data.funds)
                            commit('setStocks', data.stocks)
                            commit('setMyStocks', data.myStocks)
                        }
                    })
                    .catch(err => console.log(err))
        }
    }
})

export default store;
