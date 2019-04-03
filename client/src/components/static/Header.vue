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
          {{$t('menuContracts')}}
        </v-btn>
        <v-list>
          <v-list-tile to="/contracts">
            {{$t('menuOverview')}}
          </v-list-tile>
          <v-list-tile to="/contract/add">
            {{$t('menuAddContracts')}}
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <v-btn slot="activator" flat dark v-if="$store.state.isUserLoggedIn">
          Partner
        </v-btn>
        <v-list>
          <v-list-tile to="/partner">
            {{$t('menuOverview')}}
          </v-list-tile>
          <v-list-tile to="/partner">
            {{$t('menuAddPartner')}}
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        <flag :iso="entry.flag" v-bind:squared=false />
        {{ entry.title }}
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/login" flat dark v-if="!$store.state.isUserLoggedIn">
        {{$t('login')}}
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/register" flat dark v-if="!$store.state.isUserLoggedIn">
        {{$t('signUp')}}
      </v-btn>
    </v-toolbar-items>
        <v-toolbar-items>
      <v-btn @click="logout" flat dark v-if="$store.state.isUserLoggedIn">
        {{$t('logout')}}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import i18n from '../../plugins/i18n'
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    },
    changeLocale(locale) {
      i18n.locale = locale
    }
  },
  data () {
    return {
      languages: [
        { flag: 'us', language: 'en', title: 'English'},
        { flag: 'de', language: 'de', title: 'Deutsch'}
      ]
    }
  }
}
</script>

<style scoped>
.active {
  color: red
}
</style>
