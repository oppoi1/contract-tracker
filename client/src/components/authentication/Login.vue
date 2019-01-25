<template>
<v-layout row wrap>
  <v-flex xs7 offset-xs3>
    <panel title="Login">
      <v-text-field
        label="name"
        v-model="name"
      ></v-text-field>
        <v-text-field
        type="password"
        label="Password"
        v-model="password"
        @keyup.enter="login"
      ></v-text-field>
      <div class="danger-alert" v-html="error"></div>
      <v-btn class="blue" dark @click="login">Login</v-btn>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService';
export default {
  data() {
    return {
      name: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          name: this.name,
          password: this.password
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>
<style scoped>
.danger-alert {
  color: red;
}
</style>
