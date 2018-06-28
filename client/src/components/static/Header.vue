<template>
  <v-toolbar fixed class="blue" dark>
    <v-toolbar-title class="mr-4">
      JustVue
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark to="/contracts" v-if="$store.state.isUserLoggedIn">
        Overview
      </v-btn>
      <v-btn flat dark to="/contracts/add" v-if="$store.state.isUserLoggedIn">
       Add Contracts
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/login" flat dark v-if="!$store.state.isUserLoggedIn">
        Login
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/register" flat dark v-if="!$store.state.isUserLoggedIn">
        Sign Up
      </v-btn>
    </v-toolbar-items>
        <v-toolbar-items>
      <v-btn @click="logout" flat dark v-if="$store.state.isUserLoggedIn">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>

</style>
