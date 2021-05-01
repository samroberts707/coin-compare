import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coin_list: [],
  },
  mutations: {
    SET_COIN_LIST(state, coins) {
      state.coin_list = coins;
    },
  },
  actions: {
    getCoinList({ commit }) {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
        )
        .then((response) => {
          commit("SET_COIN_LIST", response.data);
        });
    },
  },
  modules: {},
});
