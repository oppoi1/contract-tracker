<template>
  <v-layout>
    <v-flex xs4>
      <div v-for="user in usrArray" :key="user.name">
        <v-btn>{{user.name}}</v-btn>
      </div>
   </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default {
  data () {
    return {
      usrArray: [],

    }
  },
  async mounted() {
    try {
      this.users = (await AuthenticationService.get()).data
      for(var i = 0; i < this.users.length; i++) {
        this.usrArray.push(this.users[i].name)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
