<template>
    <div class="col-md-6">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.name}}
                    <small>(Price: {{stock.price}})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input 
                        type="number"
                        class="form-control"
                        placeholder="quantity"
                        v-model="quantity">
                </div>
                <div class="pull-right">
                    <button 
                        class="btn btn-success"
                        @click="buyStocks"
                        :disabled='quantity <= 0 || !Number.isInteger(+quantity) || quantity * stock.price > getCurrentFunds'>
                        Buy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            stock: Object
        },

        data() {
            return {
                quantity: ''
            }
        },

        methods: {
            buyStocks() {
                const order = {
                    stockID: this.stock.id,
                    stockName: this.stock.name,
                    quantity: +this.quantity,
                    price: this.stock.price
                }

                if(this.getCurrentFunds >= order.quantity * order.price) {
                    this.$store.dispatch('buyStocks', order)
                    this.quantity = ''
                }
            }
        },

        computed: {
            getCurrentFunds() {
                return this.$store.getters.getFunds
            }
        }
    }

</script>