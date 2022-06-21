export const state = () => ({
  loggedInUser: {}
});

export const mutations = {
  SET_USER(state, user) {
    state.loggedInUser = user;
  }
};

export const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      state.commit('SET_USER', null);

    } else {
      const { uid, email, name } = authUser;
      state.commit('SET_USER', { uid, email, name });
    }
  },

  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user;

      await dispatch('onAuthStateChangedAction', { authUser, claims, token });
    }
  }
};
