export default function ({ store, route, redirect }) {
  const loggedInUser = store.state.loggedInUser;

  if (!loggedInUser) return redirect('/');

  if (loggedInUser && ['/', ''].includes(route.path)) {
    return redirect('/recipes');
  }

}
