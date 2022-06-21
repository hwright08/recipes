<template>
  <v-container v-if="recipeDetails.id" class="pa-12">
    <v-row no-gutters align="center">
      <v-col v-if="recipeDetails.favorite" cols="auto">
        <v-icon color="amber" large>mdi-star</v-icon>
      </v-col>
      <v-col>
        <h1 class="pl-2">
          {{ recipeDetails.title }}
          <v-chip>
            {{ recipeDetails.category }}
          </v-chip>
        </h1>
      </v-col>
      <v-col cols="12" md="auto">
        <PrintRecipeButton />
      </v-col>
    </v-row>

    <p class="my-4">{{ recipeDetails.description }}</p>

    <v-row>
      <v-col cols="12" sm="6" md="3">
        <span class="font-weight-bold">Serving Size:</span>
        {{ recipeDetails.serving_size || 0 }}
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <span class="font-weight-bold">Total Time:</span>
        {{ totalTime }}
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <span class="font-weight-bold">Prep Time:</span>
        {{ formatTime(recipeDetails.prep_time || 0) }}
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <span class="font-weight-bold">Cook Time:</span>
        {{ formatTime(recipeDetails.cook_time || 0) }}
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4" lg="3">
        <h2>Ingredients</h2>
        <p v-for="(ingredient, index) in recipeDetails.ingredients" :key="`ing-${index}`">
          {{ ingredient.amount }} {{ ingredient.item }}
        </p>
      </v-col>

      <v-divider v-if="$vuetify.breakpoint.smAndUp" vertical></v-divider>

      <v-col>
        <h2>Instructions</h2>
        <ol>
          <li v-for="(instruction, index) in recipeDetails.instructions" :key="`inst-${index}`" class="mb-4">
            {{ instruction }}
          </li>
        </ol>

        <template v-if="recipeDetails.notes.length">
          <h2>Notes</h2>
          <p v-for="(note, index) in recipeDetails.notes" :key="`note-${index}`">
            {{ getStars(index) }} {{ note }}
          </p>
        </template>
      </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="auto">
        <RecipeDialog edit />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <DeleteRecipeDialog />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <p>No Recipe Selected</p>
  </v-container>
</template>

<script>
import dayjs from 'dayjs';
import uniq from 'lodash/uniq';
import { mapState } from 'vuex';
import formatTime from '~/mixins/formatTime';

export default {
  name: 'AllRecipes',

  layout: 'recipes',

  mixins: [formatTime],

  computed: {
    ...mapState('recipe', ['recipes', 'recipeDetails']),

    totalTime() {
      let cookTime = this.recipeDetails.cook_time || 0;
      let prepTime = this.recipeDetails.prep_time || 0;
      return this.formatTime(cookTime + prepTime);
    },

    categories() {
      return uniq(this.recipes.map(r => r.category)).sort((a,b) => a > b ? 1 : -1);
    },

    groupedRecipes() {
      return this.categories.map(c => ({
        category: c,
        items: this.recipes.filter(r => r.category === c)
      }));
    },
  },

  methods: {
    getStars(index) {
      let num = index + 1;
      let arr = new Array(num);
      arr.fill('*');
      return arr.join('');
    }
  }
}
</script>
