<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Stock Trader</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
                    <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: {{funds | currency}}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li v-show="!isEnd">
                        <a href="#" @click.prevent="endDay">End Day</a>
                    </li>
                    <li v-show="isEnd">
                        <a href="#">{{timer}}</a>
                    </li>
                    <li
                            class="dropdown"
                            :class="{open: isDropdownOpen}"
                            @click="isDropdownOpen = !isDropdownOpen">
                        <a
                                href="#"
                                class="dropdown-toggle"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false">Save & Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click="saveData">Save Data</a></li>
                            <li><a href="#" @click="loadData">Load Data</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios'

    export default {
        data() {
          return {
              isDropdownOpen: false,
              isEnd: false,
              timer: 30
          }
        },

        computed: {
            funds() {
                return this.$store.getters.getFunds
            }
        },

        methods: {
            ...mapActions(['randomStocks']),

            endDay() {
                this.randomStocks()
                this.isEnd = true
                const id = setInterval(() => {
                    this.timer -= 1
                }, 1000)

                setTimeout(() => {
                    this.isEnd = false
                    this.timer = 30
                    clearInterval(id)
                }, 30000)
            },

            saveData() {
                const data = {
                    funds: this.funds,
                    stocks: this.$store.getters.getStocks,
                    myStocks: this.$store.getters.getMyStocks
                }

                axios.put('https://stock-trader-2969.firebaseio.com/data.json', data)
                        .then(res => console.log(res))
                        .catch(error => console.log(error))
            },

            loadData() {
                this.$store.dispatch('loadData')
            }
        }
    }
    
</script>

<style lang="less">
    .navbar{
        margin: 40px 0 20px 0;
    }
</style>