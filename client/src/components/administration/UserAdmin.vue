<template>
  <v-layout>
    <div class="danger-alert" v-html="error"></div>
    <v-flex xs4>
      <h4>Angelegte Benutzer</h4>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Benutzername</th>
              <th>Erstellt am</th>
            </tr>
          </thead>
          <tbody v-for='user in usrArray' :key='user.id'>
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ StripAndReverse(user.createdAt) }}</td>
              <!-- <v-btn color="info" :to="{name: 'user-administration-edit', params: {userId: user.id}}">Bearbeiten</v-btn> -->
              <v-btn color="info" v-on:click='seen = !seen' @click='showPanel(user)'>Bearbeiten</v-btn>
              <v-btn color="error">Loeschen</v-btn>
            </tr>
          </tbody>
        </table>
      </div>
   </v-flex>
   <v-flex xs4>
    <div v-if="seen">
      <p>{{ id }}</p>
      <p>{{ name }}</p>
      <label>Neues Passwort:
        <br>
        <input name="password" type="password" v-model="password" placeholder="min. 4 Zeichen">
      </label>
      <br>
      <div class="fieldset">
        <legend>Zugriff auf Admin:</legend>
        <input type="radio" id="a1" v-model='admin' value="0">
        <label for="a1"> Nein</label>
        <input type="radio" id="a2" v-model='admin' value="1">
        <label for="a2"> Ja</label>
      </div>
      <br />
      <v-btn color="success" @click="updateUser">Speichern</v-btn>
      <p>
        <v-btn color="info" v-if='seen' v-on:click='seen = !seen'>Hide</v-btn>
      </p>
    </div>
   </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService';
import utilityMixins from '../../mixins/Main'
export default {
  mixins: [utilityMixins],
  data () {
    return {
      usrArray: [],
      seen: false,
      id: 'yrdy',
      name: '',
      password: '',
      admin: '',
      error: null
    }
  },
  /**
   * Load users on pageload
   */
  async mounted() {
    try {
      this.users = (await AuthenticationService.get()).data
      for(var i = 0; i < this.users.length; i++) {
        this.usrArray.push(this.users[i])        
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    /**
     * Show user edit panel 
     */
    showPanel: (user) => {
      console.log(user)
      this.seen = !this.seen
      this.id = user.id
      this.name = user.name
    },
    /**
     * Send data to backend and update
     */
    async updateUser() {
      try {
        const response = await AuthenticationService.updateUser({
          name: this.name,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
