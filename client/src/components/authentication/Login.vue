<template>
<v-layout row wrap>
  <v-flex xs7 offset-xs3>
    <panel title="Login">
      <v-text-field
        label="Email"
        v-model="email"
      ></v-text-field>
        <v-text-field
        type="password"
        label="Password"
        v-model="password"
      ></v-text-field>
      <div class="danger-alert" v-html="error"></div>
      <v-btn class="blue" dark @click="login">Login</v-btn>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from "../../services/AuthenticationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push("songs");
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
