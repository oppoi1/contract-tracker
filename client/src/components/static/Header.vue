<template>
  <v-toolbar fixed class="blue" dark>
    <v-toolbar-title class="mr-4" to="/">
    <v-btn slot="activator" flat dark class="elevation-11" to="/">
      JustVue
    </v-btn>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-menu offset-y>
        <v-btn slot="activator" flat dark v-if="$store.state.isUserLoggedIn">
          Contracts
        </v-btn>
        <v-list>
          <v-list-tile to="/contracts">
            Overview
          </v-list-tile>
          <v-list-tile to="/contract/add">
            Add Contracts
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <v-btn slot="activator" flat dark v-if="$store.state.isUserLoggedIn">
          Partner
        </v-btn>
        <v-list>
          <v-list-tile to="/partner">
            Overview
          </v-list-tile>
          <v-list-tile to="/partner">
            Add Partner
          </v-list-tile>
        </v-list>
      </v-menu>
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
