import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coin_list: [],
    coin_list_loading: true,
    popular_coin_list: [],
    popular_coin_list_loading: true,
    coin_one: [],
    coin_one_loading: true,
    coin_two: [],
    coin_two_loading: true,
  },
  mutations: {
    SET_COIN_LIST(state, coins) {
      state.coin_list = coins;
    },
    SET_COIN_LIST_LOADING(state, bool) {
      state.coin_list_loading = bool;
    },
    SET_POPULAR_COIN_LIST(state, coins) {
      state.popular_coin_list = coins;
    },
    SET_POPULAR_COIN_LIST_LOADING(state, bool) {
      state.popular_coin_list_loading = bool;
    },
    SET_COIN_ONE(state, coin) {
      state.coin_one = coin;
    },
    SET_COIN_ONE_LOADING(state, bool) {
      state.coin_one_loading = bool;
    },
    SET_COIN_TWO(state, coin) {
      state.coin_two = coin;
    },
    SET_COIN_TWO_LOADING(state, bool) {
      state.coin_two_loading = bool;
    },
    // TODO -- Optimize setting coin loading to one mutation
  },
  actions: {
    getCoinList({ commit }) {
      commit("SET_COIN_LIST_LOADING", true);
      const coinList = localStorage.getItem("coin-list");
      if (coinList) {
        commit("SET_COIN_LIST", JSON.parse(coinList));
        commit("SET_COIN_LIST_LOADING", false);
      } else {
        axios
          .get(
            "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
          )
          .then((response) => {
            localStorage.setItem("coin-list", JSON.stringify(response.data));
            commit("SET_COIN_LIST", response.data);
            commit("SET_COIN_LIST_LOADING", false);
          });
      }
    },
    getPopularCoinList({ commit }) {
      commit("SET_POPULAR_COIN_LIST_LOADING", true);
      const coinList = localStorage.getItem("pop-coin-list");
      if (coinList) {
        commit("SET_POPULAR_COIN_LIST", JSON.parse(coinList));
        commit("SET_POPULAR_COIN_LIST_LOADING", false);
      } else {
        axios
          .get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
          )
          .then((response) => {
            localStorage.setItem(
              "pop-coin-list",
              JSON.stringify(response.data)
            );
            commit("SET_POPULAR_COIN_LIST", response.data);
            commit("SET_POPULAR_COIN_LIST_LOADING", false);
          });
      }
    },
    selectCoin({ commit }, data) {
      // TODO - Need to Cache these requests to reduce API hits - Completed By Aslam

      commit("SET_COIN_" + data[1].toUpperCase() + "_LOADING", true);

      // pulls from api if cached version older than specified time: default 10 mins
      var refresh_duration = 10;
      var current_date = new Date();
      var req =
        "https://api.coingecko.com/api/v3/coins/" +
        data[0] +
        "?tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false";

      caches.open("coin-compare_coins_v1").then((cache) => {
        return cache.match(req).then((response) => {
          if (response) {
            response.json().then((res) => {
              var cache_age =
                (current_date - new Date(res.last_updated)) / 60000;

              if (cache_age > refresh_duration) {
                axios.get(req).then((response) => {
                  cache.put(
                    req,
                    new Response(
                      JSON.stringify(response.data),
                      response.headers
                    )
                  );
                  commit("SET_COIN_" + data[1].toUpperCase(), response.data);
                  commit(
                    "SET_COIN_" + data[1].toUpperCase() + "_LOADING",
                    false
                  );
                });
              } else {
                commit("SET_COIN_" + data[1].toUpperCase(), res);
                commit("SET_COIN_" + data[1].toUpperCase() + "_LOADING", false);
              }
            });
          } else {
            // If req isn't cached then get request and store data
            axios.get(req).then((response) => {
              cache.put(
                req,
                new Response(JSON.stringify(response.data), response.headers)
              );
              commit("SET_COIN_" + data[1].toUpperCase(), response.data);
              commit("SET_COIN_" + data[1].toUpperCase() + "_LOADING", false);
            });
          }
        });
      });
    },
  },
  modules: {},
});
