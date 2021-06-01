import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coin_list: [],
    coin_one: [],
    coin_two: [],
  },
  mutations: {
    SET_COIN_LIST(state, coins) {
      state.coin_list = coins;
    },
    SET_COIN_ONE(state, coin) {
      state.coin_one = coin;
    },
    SET_COIN_TWO(state, coin) {
      state.coin_two = coin;
    },
  },
  actions: {
    getCoinList({ commit }) {
      const coinList = localStorage.getItem("coin-list");
      coinList
        ? commit("SET_COIN_LIST", JSON.parse(coinList))
        : axios
            .get(
              "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
            )
            .then((response) => {
              localStorage.setItem("coin-list", JSON.stringify(response.data));
              commit("SET_COIN_LIST", response.data);
            });
    },
    selectCoin({ commit }, data) {
      // TODO - Need to Cache these requests to reduce API hits
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/" +
            data[0] +
            "?tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false"
        )
        .then((response) => {
          commit("SET_COIN_" + data[1].toUpperCase(), response.data);
        });
    },
  },
  modules: {},
});
