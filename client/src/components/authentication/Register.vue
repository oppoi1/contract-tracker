<template>
<v-layout row wrap>
  <v-flex xs7 offset-xs3>
    <panel title="Register">
      <form name="contract-tracker-form" autocomplete="off">
        <v-text-field
          label="name"
          v-model="name"
        ></v-text-field>
        <v-text-field
          label="email"
          v-model="email"
        ></v-text-field>
          <v-text-field
          type="password"
          label="Password"
          v-model="password"
          autocomplete="new-password"
          @keyup.enter="register"
        ></v-text-field>
      </form>
      <div class="danger-alert" v-html="error"></div>
      <v-btn class="blue" dark @click="register" @keyup.enter="register">Register</v-btn>
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
      email: '',
      error: null
    };
  },
  methods: {
    /**
     * Send data to backend
     */
    async register() {
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          email: this.email,
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
