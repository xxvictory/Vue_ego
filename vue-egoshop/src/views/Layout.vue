<template>
    <div>
        <Nav />
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

import Nav from "../components/Nav"

export default {
    name:"Layout",
    components:{
        Nav
    }
}
</script>
<style scoped>
.container{
    padding: 0 200px;
}
</style>