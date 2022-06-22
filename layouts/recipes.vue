<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <RecipeDialog />
      <v-expansion-panels accordion multiple>
        <v-expansion-panel
          v-for="group in groupedRecipes"
          :key="group.category"
        >
          <v-expansion-panel-header class="grey lighten-4 py-4" style="min-height: 24px">{{ group.category }}</v-expansion-panel-header>
          <v-expansion-panel-content class="pa-0">
            <v-list class="pa-0" dense>
              <v-list-item
                v-for="recipe in group.items"
                :key="recipe.title"
                :value="recipe.id"
                single-line
                @click="updateDetails(recipe.id)"
              >
                <v-list-item-icon class="mr-3">
                  <v-icon v-if="recipe.favorite" color="amber">mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ recipe.title}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <Header />

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

  middleware: ['recipe'],

  created() {
    if (!this.$vuetify.breakpoint.mdAndUp) this.drawer = false;
  },

  data: () => ({
    drawer: true,
  }),

  computed: {
    ...mapState('recipe', ['recipes']),

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
    ...mapActions('recipe', ['getRecipeDetails']),

    updateDetails(recipeId) {
      this.getRecipeDetails(recipeId)
    }
  }
}
</script>
