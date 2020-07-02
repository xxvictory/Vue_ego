<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            isRouterAlive: true
        };
    },
    provide() {
        return {
            reload: this.reload
        };
    },
    methods: {
        reload() {
          this.isRouterAlive = false;
          this.$nextTick(() =>this.isRouterAlive = true);
        }
    },
    components: {}
};
</script>
