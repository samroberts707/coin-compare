<template>
  <div class="coin-selector">
    <input placeholder="Search" class="coin-search" v-model="filterVal" />
    <Loading v-if="filteredAllCoins.length == 0"></Loading>
    <div class="coin-list" v-if="filteredAllCoins.length != 0">
      <div
        class="popular selection"
        :class="{ open: openSelection == 'popular' }"
      >
        <button @click="chooseSelection('popular')">Popular</button>
        <div class="coin-wrapper">
          <div
            class="coin"
            :class="{ active: coin.id == coinSelected }"
            v-for="coin in filteredPopCoins"
            :key="coin.id"
            v-on:click="selectCoin(coin.id)"
          >
            {{ coin.name }} ({{ coin.symbol }})
          </div>
        </div>
      </div>
      <!-- <div class="favourite">
        <button>Favourite</button>
      </div> -->
      <div class="all selection" :class="{ open: openSelection == 'all' }">
        <button @click="chooseSelection('all')">All</button>
        <div class="coin-wrapper">
          <div
            class="coin"
            :class="{ active: coin.id == coinSelected }"
            v-for="coin in filteredAllCoins"
            :key="coin.id"
            v-on:click="selectCoin(coin.id)"
          >
            {{ coin.name }} ({{ coin.symbol }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "CoinSelector",
  props: ["coins", "coin_to_control"],
  data: function () {
    return {
      filterVal: null,
      openSelection: "popular",
    };
  },
  computed: {
    filteredAllCoins() {
      if (!this.filterVal) return this.$store.state.coin_list;

      let searchText = this.filterVal.toLowerCase();

      return this.$store.state.coin_list.filter((p) => {
        return (
          p.name.toLowerCase().includes(searchText) ||
          p.symbol.toLowerCase().includes(searchText)
        );
      });
    },
    filteredPopCoins() {
      if (!this.filterVal) return this.$store.state.popular_coin_list;

      let searchText = this.filterVal.toLowerCase();

      return this.$store.state.popular_coin_list.filter((p) => {
        return (
          p.name.toLowerCase().includes(searchText) ||
          p.symbol.toLowerCase().includes(searchText)
        );
      });
    },
    coinSelected() {
      return this.$store.state["coin_" + this.coin_to_control].id;
    },
  },
  methods: {
    selectCoin: function (coin_id) {
      this.$data.coinSelected = coin_id;
      this.$store.dispatch("selectCoin", [coin_id, this.coin_to_control]);
    },
    chooseSelection: function (selection) {
      this.$data.openSelection = selection;
    },
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss" scoped>
div.coin-selector {
  display: grid;
  position: relative;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "search toggle"
    "coin-list coin-list";
  grid-template-columns: 1fr 50px;
  grid-template-rows: 50px 1fr;
  overflow-y: scroll;
  overflow-x: hidden;
  border-left: 1px solid #0a0a0a;
  border-right: 1px solid #0a0a0a;
  box-shadow: 0px 0px 13px 0px #0a0a0a;
  overflow: hidden;
  &:first-child {
    transition: left 0.4s ease-in-out;
    left: 0;
  }
  &:last-child {
    transition: right 0.4s ease-in-out;
    right: 0;
  }
  input.coin-search {
    display: block;
    position: relative;
    grid-area: search;
    width: calc(100% - 50px);
    background-color: var(--deep-purple);
    padding: 15px 25px;
    border: none;
    border-bottom: 1px solid #0a0a0a;
    box-shadow: none;
    outline: none;
    color: var(--yellow);
  }
  div.coin-list {
    display: block;
    position: relative;
    grid-area: coin-list;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
    div.selection {
      display: block;
      width: 100%;
      height: calc(100% - 37px);
      max-height: 37px;
      overflow: hidden;
      transition: max-height 0.4s ease-in-out;
      will-change: max-height;
      &.open {
        max-height: 1000px;
        div.coin-wrapper {
          display: block;
        }
      }
      button {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid #0a0a0a;
        cursor: pointer;
        transition: opacity 0.3s ease-in-out;
        border-radius: 0;
        background-color: var(--green);
        font-size: 20px;
        padding: 5px;
        &:hover {
          opacity: 0.7;
        }
      }
      div.coin-wrapper {
        display: none;
        height: calc(100% - 37px);
        overflow-y: scroll;
        div.coin {
          display: block;
          position: relative;
          padding: 10px 30px;
          cursor: pointer;
          color: var(--blue);
          transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          will-change: bakcground-color;
          &:hover,
          &.active {
            background-color: var(--purple);
          }
        }
      }
    }
  }
}
</style>
