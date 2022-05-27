<template>
  <v-app>
    <v-navigation-drawer app>
      <v-expansion-panels accordion multiple>
        <v-expansion-panel
          v-for="group in groupedRecipes"
          :key="group.category"
        >
          <v-expansion-panel-header class="grey lighten-4 py-4" style="min-height: 24px">{{ group.category }}</v-expansion-panel-header>
          <v-expansion-panel-content class="pa-0">
            <v-list class="pa-0" dense>
              <v-list-item-group @change="updateDetails">
                <v-list-item
                  v-for="recipe in group.items"
                  :key="recipe.title"
                  :value="recipe.id"
                  single-line
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon v-if="recipe.favorite" color="amber">mdi-star</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ recipe.title}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <v-main >
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import uniq from 'lodash/uniq';

export default {
  name: 'DefaultLayout',

  middleware: ['auth'],

  computed: {
    ...mapState(['recipes']),

    categories() {
      return uniq(this.recipes.map(r => r.category)).sort((a,b) => a > b ? 1 : -1);
    },

    groupedRecipes() {
      return this.categories.map(c => ({
        category: c,
        items: this.recipes.filter(r => r.category === c)
      }));
    }
  },

  methods: {
    ...mapActions(['getRecipeDetails']),

    updateDetails(recipeId) {
      this.getRecipeDetails(recipeId)
    }
  }
}
</script>

<style lang="scss">
  .v-expansion-panel-content__wrap {
    padding: 0;
  }
</style>
