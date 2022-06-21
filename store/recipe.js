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
  async getRecipes({ commit, state, rootState }) {
    let { docs } = await this.$fire.firestore.collection('recipe').where('user_id', '==', rootState.loggedInUser.uid).get();
    let recipes = docs
      .map(d => {
        let data = d.data();
        return {
          ...data,
          id: d.id,
        }
      }).sort((a, b) => a.title > b.title ? 1 : -1);

    commit('setRecipes', recipes);
    commit('setRecipeDetails', recipes[0]);
  },

  async getRecipeDetails({ commit, state }, id) {
    let recipe = state.recipes.find(r => r.id === id);
    commit('setRecipeDetails', recipe);
  }
}
