<template>
  <v-flex xs2>
    <panel title="Categories"> 
      <div v-for="item in categories" :key="item.name">
        <v-btn flat :to="{name: 'contract-category', params: {categoryId: item.name}}">{{item.name}}</v-btn>
      </div>
    </panel>
  </v-flex>
</template>

<script>
import CategoryService from '../../services/CategoryService';

export default {
  data() {
    return {
      categories: null
    }
  },
  async mounted() {
    this.categories = (await CategoryService.get()).data
  }
}
</script>

<style scoped>

</style>
