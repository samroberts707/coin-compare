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
      // TODO - Need to Cache these requests to reduce API hits - Completed By Aslam

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
                });
              } else {
                commit("SET_COIN_" + data[1].toUpperCase(), res);
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
            });
          }
        });
      });
    },
  },
  modules: {},
});
