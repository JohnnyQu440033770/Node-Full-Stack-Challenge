<template>
  <RecordDisplay/>
</template>

<script>
import RecordDisplay from './components/RecordDisplay.vue'

export default {
  name: 'App',
  components: {
    RecordDisplay
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
