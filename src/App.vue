<template>
  <div id="app" class="container">
    <Header />
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',

  components: {
    Header
  }
}
</script>

<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 40px;
  }

  @keyframes slide-in {
    from{
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to{
      transform: translateY(-30px);
      opacity: 0;
    }
  }

  .slide-enter-active{
    animation: slide-in 0.3s ease-out forwards;
  }

  .slide-leave-active{
    animation: slide-out 0.3s ease-out forwards;
  }

  html {
      font-size: 10px;
  }

  body{
      overflow-x: hidden;
  }

  img{
      width: 100%;
      max-width: 100%;
  }

  a{
      text-decoration: none;
  }

  p{
      font-size: 1.6rem;
  }

</style>
