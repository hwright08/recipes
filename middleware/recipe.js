export default function ({ store, route }) {
  if (!store.state.recipe.recipes.length) {
    store.dispatch('recipe/getRecipes');
  }
}
