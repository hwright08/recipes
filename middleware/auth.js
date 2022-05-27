export default function ({ store }) {
  if (!store.state.recipes.length) {
    store.dispatch('getRecipes');
  }
}
