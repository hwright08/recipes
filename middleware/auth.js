export default function ({ store, route, redirect }) {
  const loggedInUser = store.state.loggedInUser;

  if (!loggedInUser && route.path != '/') return redirect('/');

  if (loggedInUser && loggedInUser.uid && ['/', ''].includes(route.path)) {
    return redirect('/recipes');
  }

}
