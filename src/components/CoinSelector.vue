<template>
  <div
    class="coin-selector"
    :class="{ hidden: isHidden }"
    :controlling="coin_to_control"
  >
    <input placeholder="Search" class="coin-search" v-model="filterVal" />
    <Toggle v-on:click.native="isHidden = !isHidden" />
    <div class="coin-list">
      <div
        class="popular selection"
        :class="{ open: openSelection == 'popular' }"
      >
        <button @click="chooseSelection('popular')">Popular</button>
        <Loading v-if="popularCoinListLoading" />
        <div class="coin-wrapper" v-if="!popularCoinListLoading">
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
        <Loading v-if="coinListLoading" />
        <div class="coin-wrapper" v-if="!coinListLoading">
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
import Toggle from "@/components/Toggle.vue";
export default {
  name: "CoinSelector",
  props: ["coin_to_control"],
  data: function () {
    return {
      filterVal: null,
      openSelection: "popular",
      isHidden: false,
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
    coinListLoading() {
      return this.$store.state.coin_list_loading;
    },
    popularCoinListLoading() {
      return this.$store.state.popular_coin_list_loading;
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
  mounted() {
    if (window.innerWidth <= 960) {
      this.$data.isHidden = true;
    }
  },
  components: {
    Loading,
    Toggle,
  },
};
</script>

<style lang="scss" scoped>
div.coin-selector {
  display: grid;
  position: relative;
  width: 100%;
  height: 100%;
  grid-template-rows: 50px 1fr;
  border-left: 1px solid #0a0a0a;
  border-right: 1px solid #0a0a0a;
  box-shadow: 0px 0px 13px 0px #0a0a0a;
  background-color: var(--deep-purple);
  overflow: visible;
  transition: right 0.8s ease-in-out, left 0.8s ease-in-out;
  z-index: 3;
  &:first-child {
    transition: left 0.4s ease-in-out;
    left: 0;
  }
  &:last-child {
    transition: right 0.4s ease-in-out;
    right: 0;
  }
  &[controlling="one"] {
    left: 0;
    grid-template-areas:
      "search toggle"
      "coin-list coin-list";
    grid-template-columns: 1fr 50px;
    will-change: left;
    &.hidden {
      left: -300px;
      div.toggle {
        transform: translateX(50px);
      }
    }
  }
  &[controlling="two"] {
    right: 0;
    grid-template-areas:
      "toggle search"
      "coin-list coin-list";
    grid-template-columns: 50px 1fr;
    will-change: right;
    &.hidden {
      right: -300px;
      div.toggle {
        transform: translateX(-50px);
      }
    }
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
  div.toggle {
    grid-area: toggle;
    transition: transform 0.4s ease-in-out;
    will-change: transform;
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
        max-height: 1215px;
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
  @media screen and (max-width: 1200px) {
    &[controlling="one"] {
      &.hidden {
        left: -200px;
      }
    }
    &[controlling="two"] {
      &.hidden {
        right: -200px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    width: 100vw;
    height: 100vh;
    &[controlling="one"] {
      &.hidden {
        z-index: 2;
        left: -100vw;
      }
    }
    &[controlling="two"] {
      right: 100vw;
      &.hidden {
        z-index: 2;
        right: 0;
      }
    }
  }
}
</style>
