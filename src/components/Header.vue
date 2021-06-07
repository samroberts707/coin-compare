<template>
  <div class="header">
    <h1>Coin Compare</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
div.header {
  display: block;
  position: relative;
  align-self: center;
  justify-self: center;
  h1 {
    font-family: "Olympic Carrier", sans-serif;
    font-size: 80px;
    color: var(--green);
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 60px;
      text-align: center;
    }
  }
}
</style>
