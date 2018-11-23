<template>
  <v-layout>
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
          <tbody v-for='user in usrArray' :key='user'>
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.createdAt }}</td>
              <v-btn color="info">Bearbeiten</v-btn>
              <v-btn color="error">Loeschen</v-btn>
            </tr>
          </tbody>
        </table>
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
        this.usrArray.push(this.users[i])        
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
