<template>
  <v-app-bar app clipped-left outlined flat>
    <v-toolbar-title>My Recipes</v-toolbar-title>

    <v-spacer></v-spacer>

    <RecipeDialog v-if="showActions" />
    <v-btn
      v-if="showActions"
      text
      @click="logOut"
    >Log Out</v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',

  computed: {
    ...mapState(['loggedInUser']),
    showActions() {
      return this.loggedInUser && this.loggedInUser.uid;
    }
  },

  methods: {
    async logOut() {
      await this.$fire.auth.signOut();
      this.$router.push('/');
    }
  }
}
</script>
