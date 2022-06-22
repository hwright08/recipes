<template>
  <v-app-bar app clipped-left outlined flat>
    <v-toolbar-title>My Recipes</v-toolbar-title>

    <v-spacer></v-spacer>

    <RecipeDialog v-if="loggedInUser.uid" />
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',

  computed: {
    ...mapState(['loggedInUser'])
  },

  methods: {
    async logOut() {
      await this.$fire.auth.signOut();
      this.$router.replace('/');
    }
  }
}
</script>
