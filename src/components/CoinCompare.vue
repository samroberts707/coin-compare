<template>
  <div class="coin-compare">
    <Loading v-if="coinOneLoading || coinTwoLoading"></Loading>
    <div class="content" v-if="!coinOneLoading && !coinTwoLoading">
      <input class="coin-count" v-model="coinCount" />
      <h1>
        {{ coinOne.name }} ==
        {{
          (coinCount * coinOne.market_data.current_price.usd) /
          coinTwo.market_data.current_price.usd
        }}
        {{ coinTwo.name }}
      </h1>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "CoinCompare",
  data: function () {
    return {
      coinCount: 1,
    };
  },
  computed: {
    coinOne() {
      return this.$store.state.coin_one;
    },
    coinOneLoading() {
      return this.$store.state.coin_one_loading;
    },
    coinTwo() {
      return this.$store.state.coin_two;
    },
    coinTwoLoading() {
      return this.$store.state.coin_two_loading;
    },
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss" scoped>
div.coin-compare {
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 40px;
  div.content {
    input {
      display: inline;
      position: relative;
      font-size: 24px;
      border: 2px solid var(--purple);
      border-radius: 10px;
      box-shadow: 1px 1px 11px var(--purple);
      background-color: var(--deep-purple);
      color: var(--green);
      width: 60px;
      padding: 5px 10px;
      &:focus {
        outline: none;
      }
    }
    h1 {
      display: inline;
      color: var(--green);
      text-align: center;
    }
  }
}
</style>
