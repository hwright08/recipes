export const state = () => ({
  recipes: [],
  recipeDetails: {}
});

export const mutations = {
  setRecipes(state, recipes) {
    state.recipes = recipes;
  },

  setRecipeDetails(state, details) {
    state.recipeDetails = details;
  }
};

export const actions = {
  async getRecipes({ commit }) {
    let { docs } = await this.$fire.firestore.collection('recipe').get();
    let recipes = docs
      .map(d => {
        let data = d.data();
        let favorite = data.favorite == 'TRUE';
        return {
          ...data,
          id: d.id,
          favorite
        }
      }).sort((a, b) => a.title > b.title ? 1 : -1);

    commit('setRecipes', recipes);
  },

  async getRecipeDetails({ commit, state }, id) {
    let recipe = state.recipes.find(r => r.id === id);
    commit('setRecipeDetails', recipe);
  }
}
