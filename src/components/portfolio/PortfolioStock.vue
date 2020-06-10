<template>
    <div class="col-md-6">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.stockName}}
                    <small>(Price: {{stock.price}}) | (Quantity: {{stock.quantity}})</small>
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
                        class="btn btn-info"
                        @click="sellStock"
                        :disabled='quantity <= 0 || quantity > stock.quantity || !Number.isInteger(+quantity)'>
                        Sell
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
            sellStock() {
                const order = {
                    stockID: this.stock.stockID,
                    stockName: this.stock.stockName,
                    quantity: +this.quantity,
                    price: this.stock.price
                }

                this.$store.dispatch('sellStocks', order)
                this.quantity = ''
            }
        },
    }

</script>