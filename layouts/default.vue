<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" app clipped></v-navigation-drawer>

    <v-app-bar v-if="$vuetify.breakpoint.mdAndDown" app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar> -->

    <v-app-bar app>
      <v-toolbar-title>My Recipes</v-toolbar-title>
    </v-app-bar>

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
}
</script>
