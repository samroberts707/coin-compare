<template>
  <div class="footer">
    <p>
      Powered by
      <a href="https://www.coingecko.com/en" target="_blank">CoinGecko API</a>
      // Made by
      <a href="https://samroberts.dev" target="_blank">Sam Roberts</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
div.footer {
  position: relative;
  display: block;
  align-self: center;
  p {
    text-align: center;
    color: var(--green);
    a {
      color: var(--yellow);
    }
  }
}
</style>
