<template>
  <div class="home">
    <CoinSelector coin_to_control="one" />
    <Header />
    <CoinPrice coin_to_view="one" />
    <CoinCompare />
    <CoinPrice coin_to_view="two" />
    <Footer />
    <CoinSelector coin_to_control="two" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CoinSelector from "@/components/CoinSelector.vue";
import CoinPrice from "@/components/CoinPrice.vue";
import CoinCompare from "@/components/CoinCompare.vue";
export default {
  name: "Home",
  components: {
    CoinSelector,
    CoinPrice,
    CoinCompare,
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("getCoinList");
    this.$store.dispatch("getPopularCoinList");
    this.$store.dispatch("selectCoin", ["bitcoin", "one"]);
    this.$store.dispatch("selectCoin", ["ethereum", "two"]);
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
  grid-template-rows: 150px 1fr 2fr 1fr 100px;
  gap: 0px 0px;
  grid-template-areas:
    "coin-one header coin-two"
    "coin-one coin-one-price coin-two"
    "coin-one coin-compare coin-two"
    "coin-one coin-two-price coin-two"
    "coin-one footer coin-two";
  overflow: hidden;
  transition: grid-template-columns 0.4s ease-in-out;
  .coin-selector:first-child {
    grid-area: coin-one;
  }
  .coin-selector:last-child {
    grid-area: coin-two;
  }
  .footer {
    grid-area: footer;
  }
  .header {
    grid-area: header;
  }
  .coin-one-price {
    grid-area: coin-one-price;
  }
  .coin-two-price {
    grid-area: coin-two-price;
  }
  .coin-compare {
    grid-area: coin-compare;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: 200px 1fr 200px;
  }
  @media screen and (max-width: 960px) {
    grid-template-columns: 0 1fr 0;
    overflow-y: scroll;
  }
}
</style>
