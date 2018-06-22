<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <songs-search-panel />
      <songs-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  async mounted () {
    // do request to backend for all songs
  }
}
</script>

<style>
.song {
  padding: 20px;
  height: 150px;
  overflow: hidden;
}

.song-title {
 font-size: 24px;
}

.song-artist {
font-size: 20px;
}

.song.genre {
font-size: 16px;
}

.album-image {
 width: 30%;
 margin: 0 auto;
}
</style>
