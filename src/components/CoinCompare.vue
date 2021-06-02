<template>
  <div class="coin-compare">
    <Loading v-if="coinOne.length == 0 || coinTwo.length == 0"></Loading>
    <h1 v-if="coinOne.length != 0 && coinTwo.length != 0">
      1 {{ coinOne.name }} ==
      {{
        coinOne.market_data.current_price.usd /
        coinTwo.market_data.current_price.usd
      }}
      {{ coinTwo.name }}
    </h1>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "CoinCompare",
  computed: {
    coinOne() {
      return this.$store.state.coin_one;
    },
    coinTwo() {
      return this.$store.state.coin_two;
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
  h1 {
    color: var(--green);
    text-align: center;
  }
}
</style>
