<template>
  <div class='home'>
    <CoinSelector />
    <CoinSelector />
  </div>
</template>

<script>
import CoinSelector from "@/components/CoinSelector.vue";
export default {
  name: 'Home',
  components: {
    CoinSelector
  },
};
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    display: grid;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 300px 1fr 300px;
    grid-template-rows: 150px 1fr 1fr 1fr 150px;
    gap: 0px 0px;
    grid-template-areas:
      "coin-one header coin-two"
      "coin-one coin-one-price coin-two"
      "coin-one coin-compare coin-two"
      "coin-one coin-two-price coin-two"
      "coin-one footer coin-two";

    .coin-selector:first-child { grid-area: coin-one; }
    .coin-selector:last-child { grid-area: coin-two; }
    .footer { grid-area: footer; }
    .header { grid-area: header; }
    .coin-one-price { grid-area: coin-one-price; }
    .coin-two-price { grid-area: coin-two-price; }
    .coin-compare { grid-area: coin-compare; }
  }
</style>