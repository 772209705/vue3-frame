import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    login({ commit }, token) {
      // 在这里，您可以进行API调用来验证用户并检索令牌
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('setToken', '');
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    }
  }
});

export default store;