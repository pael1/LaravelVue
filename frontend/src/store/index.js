import { createStore } from 'vuex'
import axiosClient from '@/axios';

export default createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  },
  getters: {
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  actions: {
    login({commit}, user){
      return axiosClient.post('/login', user) 
      .then(({data}) => {
        commit('setUser', data);
        return data;
      })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
      .then(response => {
        commit('logout')
        return response;
      })
    }
  },
  modules: {
  }
})
