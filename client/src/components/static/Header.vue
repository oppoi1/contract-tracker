<template>
  <v-toolbar fixed class="blue" dark>
    <v-toolbar-title class="mr-4">
      JustVue
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark to="/songs">
        Browse
      </v-btn>
    </v-toolbar-items>
    <!-- <v-toolbar-items>
      <v-btn flat dark to="/contract">
        Contracts
      </v-btn>
    </v-toolbar-items> -->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="login" flat dark v-if="!$store.state.isUserLoggedIn">
        Login
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="register" flat dark v-if="!$store.state.isUserLoggedIn">
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
      // TODO: redirect
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>

</style>
