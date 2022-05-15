<template>
    <a-layout style="height: 400px;">
        <a-layout-header class="navbar">
            <Nav></Nav>
        </a-layout-header>
        <a-layout-content class="my-body">
            <div class="container">
                <router-view></router-view>
            </div>

        </a-layout-content>
        <a-layout-footer>
            <Footer></Footer>
        </a-layout-footer>
    </a-layout>
</template>

<script setup>
    import Nav from "../components/user/Nav.vue";
    import Footer from "../components/Footer.vue";


</script>

<style scoped>
    .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 3;
    }
    .my-body {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
    }
    .container {
        width: 1200px;
    }
</style>