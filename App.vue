<template>
  <MainHeader/>
  <ContentCard/>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import ContentCard from './components/ContentCard.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    ContentCard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>