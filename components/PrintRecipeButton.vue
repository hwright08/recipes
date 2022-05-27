<template>
  <v-btn outlined @click="print" block>Print Recipe</v-btn>
</template>

<script>
import { mapState } from 'vuex';
import formatTime from '~/mixins/formatTime';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: 'PrintRecipeButton',

  mixins: [formatTime],

  computed: {
    ...mapState(['recipeDetails'])
  },

  methods: {
    print() {
      let { title, category, description, serving_size, cook_time, prep_time, instructions, notes } = this.recipeDetails;
      let ingredients = this.recipeDetails.ingredients.map(i => `${i.amount || ''} ${i.item}`);
      let docDefinitions = {
        content: [
          { text: title, fontSize: 24, bold: true },
          { text: category, background: '#e0e0e0' },
          '\n',
          description,
          '\n',
          {
            columns: [
              { text: `Serving Size: ${serving_size}`, width: '25%' },
              { text: `Total Time: ${this.formatTime(cook_time + prep_time)}`, width: '25%' },
              { text: `Prep Time: ${this.formatTime(prep_time)}`, width: '25%' },
              { text: `Cook Time: ${this.formatTime(cook_time)}`, width: '25%' },
            ]
          },
          '\n',
          { text: 'Ingredients', fontSize: 18, bold: true },
          '\n',
          { ul: ingredients },
          '\n',
          { text: 'Instructions', fontSize: 18, bold: true },
          '\n',
          { ol: instructions },
          '\n',
          { text: 'Notes', fontSize: 18, bold: true },
          '\n',
          { ol: notes }
        ]
      };

      pdfMake.createPdf(docDefinitions).open();
    }
  }


}
</script>
