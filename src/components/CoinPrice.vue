<template>
  <div class="coin-price-wrapper">
    <Loading v-if="coinLoading"></Loading>
    <div class="coin-price" v-if="!coinLoading">
      <div class="name">
        <img
          class="coin-logo"
          :src="coinData.image.small"
          :alt="coinData.localization.en"
        />
        <h2>{{ coinData.localization.en }} ({{ coinData.symbol }})</h2>
      </div>
      <div class="price">
        <h1>${{ coinData.market_data.current_price.usd }}</h1>
      </div>
      <div class="low-high">
        <p class="low">24h low - ${{ coinData.market_data.low_24h.usd }}</p>
        <p class="high">24h high - ${{ coinData.market_data.high_24h.usd }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "CoinPrice",
  props: ["coin_to_view"],
  computed: {
    coinData() {
      const coinString = "coin_" + this.coin_to_view;
      return this.$store.state[coinString];
    },
    coinLoading() {
      return this.$store.state["coin_" + this.coin_to_view + "_loading"];
    },
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss" scoped>
div.coin-price-wrapper {
  display: block;
  width: 50%;
  max-width: 390px;
  height: 100%;
  border: 2px solid var(--purple);
  border-radius: 25px;
  background-color: var(--deep-purple);
  box-shadow: 3px 3px 14px var(--purple);
  align-self: center;
  justify-self: center;
  div.coin-price {
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 20px;
    gap: 0px 0px;
    grid-template-areas:
      "name"
      "price"
      "low-high";
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;
    div.name {
      grid-area: name;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 20px;
      padding: 20px 40px 0px 40px;
      img {
        display: block;
        justify-self: center;
        height: 50px;
        width: 50px;
      }
      h2 {
        display: block;
        justify-self: left;
        color: var(--green);
      }
    }
    div.price {
      grid-area: price;
      h1 {
        color: var(--green);
      }
    }
    div.low-high {
      grid-area: low-high;
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: start;
      width: 90%;
      height: 100%;
      p {
        font-size: 12px;
        color: var(--yellow);
        &.low {
          justify-self: left;
          text-align: left;
        }
        &.high {
          justify-self: right;
          text-align: right;
        }
      }
    }
  }
}
</style>
