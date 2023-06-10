<template>
    <Navbar/>
    <main>
      <router-view/>
    </main>
    <Footer/>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'HomeView',
  components: {
    Footer,
    Navbar,
  }
}
</script>


<style lang="scss">
//Variables
$font-1 : 'Syne', sans-serif;
$font-2 : 'Heebo', sans-serif;

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


</style>
