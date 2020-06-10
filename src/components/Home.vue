<template>
    <div>
        <h1>Trade or View your Portfolio</h1>
        <br>
        <h5>You may Save & Load your Data. <br> (click Save, and then End Day. After this you can turn back the Time by clicking Load)</h5>
        <h5>Click on 'End Day' to see, how Stocks price will be changed</h5>
        <hr>
        <h5>Your funds: <strong> {{getMyFunds | currency}} </strong></h5>
    </div>
</template>

<script>

export default {
    computed: {
        getMyFunds() {
            return this.$store.getters.getFunds;
        }
    }
}

</script>