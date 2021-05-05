<template>
  <div class="coin-selector">
    <input placeholder="Search" class="coin-search" v-model="filterVal" />
    <div class="coin-wrapper">
      <div
        class="coin"
        v-for="coin in filteredCoins"
        :key="coin.id"
        v-on:click="selectCoin(coin.id)"
      >
        {{ coin.name }} ({{ coin.symbol }})
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinSelector",
  props: ["coins", "coin_to_control"],
  data: function () {
    return {
      filterVal: null,
    };
  },
  computed: {
    filteredCoins() {
      if (!this.filterVal) return this.coins;

      let searchText = this.filterVal.toLowerCase();

      return this.coins.filter((p) => {
        return (
          p.name.toLowerCase().includes(searchText) ||
          p.symbol.toLowerCase().includes(searchText)
        );
      });
    },
  },
  methods: {
    selectCoin: function (coin_id) {
      this.$store.dispatch("selectCoin", [coin_id, this.coin_to_control]);
    },
  },
};
</script>

<style lang="scss" scoped>
div.coin-selector {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-left: 1px solid #0a0a0a;
  border-right: 1px solid #0a0a0a;
  box-shadow: 0px 0px 13px 0px #0a0a0a;
  overflow: hidden;
  input.coin-search {
    display: block;
    position: relative;
    width: calc(100% - 50px);
    background-color: var(--deep-purple);
    padding: 15px 25px;
    border: none;
    border-bottom: 1px solid #0a0a0a;
    box-shadow: none;
    outline: none;
    color: var(--yellow);
  }
  div.coin-wrapper {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 0;
    overflow-y: scroll;
    div.coin {
      display: block;
      position: relative;
      padding: 10px 30px;
      cursor: pointer;
      color: var(--blue);
    }
  }
}
</style>
