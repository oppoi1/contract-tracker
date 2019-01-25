<template>
  <v-footer 
  height="auto"
  color="blue"
  fixed
  >
  <v-layout justify-center row wrap>
    <v-flex blue py-3 text-xs-center white--text xs12>
      <div>&copy; 2018-{{ new Date().getFullYear() }} Wannemueller</div>
    </v-flex>
  </v-layout>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
