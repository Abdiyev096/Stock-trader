<template>
    <div class="stocks">
        <form class="form-inline">
            <input  class="form-control mr-sm-2"
                     type="search" placeholder="Search" 
                     aria-label="Search"
                     v-model="searchText">
        </form>

        <div>
            <Stock
                    v-for="stock in filteredStocks"
                    :key="stock.id"
                    :stock="stock" />
        </div>
    </div>
</template>

<script>
import Stock from './StocksStock';
import {mapActions} from 'vuex';

    export default {

        data() {
            return {
                searchText: ''
            }
        },

        computed: {
            stocks() {
                return this.$store.getters.getStocks
            },

            filteredStocks() {
                return this.stocks.filter(el => {
                    return el.name.toLowerCase().match(this.searchText.toLowerCase())
                })
            }
        },

        components: {
            Stock
        },

        methods: {
            ...mapActions(['initStocks'])
        },

        mounted() {
          this.initStocks()  
        }
    }

</script>

<style lang="less">

    .stocks{
        display: flex;
        flex-direction: column;
    }

    .form-inline{
        align-self: flex-end;
        margin-bottom: 15px;
        margin-right: 15px;
    }
</style>