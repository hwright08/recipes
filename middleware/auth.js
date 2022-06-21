export default function ({ store, route }) {
  const loggedInUser = store.state.loggedInUser;

  if (['/signin', '/', ''].includes(route.path) && loggedInUser) {
    return redirect('/recipes');
  }

  if (!loggedInUser) return redirect('/signin');
}
