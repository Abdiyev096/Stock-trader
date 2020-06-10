<template>
    <div class="my-portfolio">
        <form class="form-inline">
            <input  class="form-control mr-sm-2"
                     type="search" placeholder="Search" 
                     aria-label="Search"
                     v-model="searchText">
        </form>

        <div>
            <PortfolioStock v-for="stock in filteredStocks" 
                        :key="stock.stockID"
                        :stock="stock"/>
        </div>
    </div>
</template>

<script>
import PortfolioStock from './PortfolioStock'

    export default {

        data() {
            return {
                searchText: ''
            }
        },

        computed: {
            myStocks() {
                return this.$store.getters.getMyStocks
            },

            filteredStocks() {
                return this.myStocks.filter(el => {
                    return el.stockName.toLowerCase().match(this.searchText.toLowerCase())
                })
            }
        },
        
        components: {
            PortfolioStock
        }
    }
</script>

<style lang="less">

    .my-portfolio{
        display: flex;
        flex-direction: column;
    }

    .form-inline{
        align-self: flex-end;
        margin-bottom: 15px;
        margin-right: 15px;
    }

</style>