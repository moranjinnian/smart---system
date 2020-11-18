<template>
    <div class="amap-wrapper">
        <div style="width: 200px;height: 600px">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                map: null,
            };
        },
        mounted() {
            this.initMapData();
        },

        methods: {
            initMapData() {

            }
        }
    }
</script>
