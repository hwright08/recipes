<template>
  <v-dialog v-model="dialogOpen" max-width="1000px" persistent>
    <template #activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        outlined
        block
      >Add Recipe</v-btn>
    </template>

    <v-card>
      <v-card-title>Add New Recipe</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col>
              <Label required for="title">Recipe Name</Label>
              <TextField
                v-model="formData.title"
                id="title"
                :rules="[required]"
              />

              <Label for="serving_size">Serving Size</Label>
              <TextField
                v-model="formData.serving_size"
                id="serving_size"
                type="number"
                min="1"
              />

              <Label for="prep_time">Prep Time (In minutes)</Label>
              <TextField
                v-model="formData.prep_time"
                id="prep_time"
                type="number"
                min="1"
              />

              <Label for="cook_time">Cook Time (In minutes)</Label>
              <TextField
                v-model="formData.cook_time"
                id="cook_time"
                type="number"
                min="1"
              />
            </v-col>
            <v-col>
              <Label required for="category">Category</Label>
              <TextField
                v-model="formData.category"
                id="category"
                :rules="[required]"
              />

              <Label required for="description">Description</Label>
              <TextArea
                v-model="formData.description"
                id="description"
                :rules="[required]"
              />

              <v-checkbox
                v-model="formData.favorite"
                label="Favorite"
                off-icon="mdi-star-outline"
                on-icon="mdi-star"
                color="amber"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col>
              <h2 class="mb-3">Ingredients</h2>
              <v-row v-for="(ingredient, index) in formData.ingredients" no-gutters :key="`ing-${index}`">
                <v-col>
                  <TextField
                    v-model="ingredient.amount"
                    placeholder="Amount"
                  />
                </v-col>
                <v-col>
                  <TextField
                    v-model="ingredient.item"
                    placeholder="Ingredient"
                    :rules="[required]"
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn :disabled="!index" icon color="red" @click="deleteIngredient(index)">
                    <v-icon>mdi-minus-circle-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn class="mt-4" outlined @click="addIngredient">Add Ingredient</v-btn>
            </v-col>

            <v-col>
              <h2 class="mb-3">Instructions</h2>

              <v-row
                v-for="(instruction, index) in formData.instructions"
                no-gutters
                :key="`inst-${index}`"
              >
                <v-col cols="auto" class="pr-2 pt-2">{{ index + 1 }}.</v-col>
                <v-col>
                  <TextArea
                    v-model="instruction.text"
                    rows="1"
                    :rules="[required]"
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn :disabled="!index" icon color="red" @click="deleteInstruction(index)">
                    <v-icon>mdi-minus-circle-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn class="mt-4" outlined @click="addInstruction">Add instruction</v-btn>
            </v-col>
          </v-row>

          <v-divider class="mt-4"></v-divider>

          <h2 class="my-3">Notes</h2>
          <v-row
            v-for="(note, index) in formData.notes"
            no-gutters
            :key="`note-${index}`"
          >
            <v-col cols="auto" class="pr-2 pt-2">{{ index + 1 }}.</v-col>
            <v-col>
              <TextArea
                v-model="note.text"
                rows="1"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn :disabled="!index" icon color="red" @click="deleteNote(index)">
                <v-icon>mdi-minus-circle-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-btn class="mt-4" outlined @click="addNote">Add note</v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn text @click.stop="cancel">Cancel</v-btn>
            <v-btn @click.stop="save">Save</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import required from '~/mixins/required';
import { cloneDeep } from 'lodash';

export default {
  name: 'AddRecipeDialog',

  mixins: [required],

  data: () => ({
    ingredientCount: 1,
    dialogOpen: false,
    formData: {
      ingredients: [{ amount: null, item: null }],
      instructions: [{ text: null }],
      notes: []
    }
  }),

  methods: {
    addIngredient() {
      this.formData.ingredients.push({
        amount: null,
        item: null
      });
    },

    deleteIngredient(index) {
      this.formData.ingredients.splice(index, 1);
    },

    addInstruction() {
      this.formData.instructions.push({
        text: null
      });
    },

    deleteInstruction(index) {
      this.formData.instructions.splice(index, 1);
    },

    addNote() {
      this.formData.notes.push({
        text: null
      });
    },

    deleteNote(index) {
      this.formData.notes.splice(index, 1);
    },

    cancel() {
      this.dialogOpen = false;
      this.formData = {
        ingredients: [{ amount: null, item: null }],
        instructions: [{ text: null }],
        notes: []
      };
    },

    async save() {
      if (!this.$refs.form.validate()) return;

      let data = cloneDeep(this.formData);
      data.instructions = data.instructions.map(i => i.text);
      data.notes = data.notes.map(i => i.text);

      debugger;

      // create a new recipe
      let ref = await this.$fire.firestore.collection('recipe').doc();
      ref.set(data);
    }
  }
}
</script>
