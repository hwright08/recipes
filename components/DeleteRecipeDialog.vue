<template>
  <v-dialog v-model="dialogOpen" max-width="600px">
    <template #activator="{ on }">
      <v-btn
        v-on="on"
        v-bind="$attrs"
        color="red"
        outlined
      >Delete Recipe</v-btn>
    </template>

    <v-card>
      <v-card-title>Delete Recipe</v-card-title>
      <v-card-text>
        <div>
          Are you sure you want to delete <span class="font-weight-bold">{{ recipeDetails.title }}</span>?
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-6">
        <v-row>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="dialogOpen = false">Cancel</v-btn>
          <v-btn @click="deleteRecipe" color="error">Delete</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'DeleteRecipe',

  data: () => ({
    dialogOpen: false
  }),

  computed: {
    ...mapState(['recipeDetails'])
  },

  methods: {
    ...mapActions(['getRecipes']),

    async deleteRecipe() {
      let ref = await this.$fire.firestore.collection('recipe').doc(this.recipeDetails.id);
      ref.delete();

      await this.getRecipes();
      this.dialogOpen = false;
    }
  }
}
</script>
