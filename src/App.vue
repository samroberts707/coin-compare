<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&display=swap');
@import url("./assets/sass/reset.scss");

body {
  scroll-behavior: smooth;
  background-color: var(--deep-purple);
  h1, h2, h3, h4, h5, h6, p, li, a, button, span {
    font-family: 'IBM Plex Mono', monospace;
  }
  h1 {
    font-size: 30px;
  }
  p {
    font-size: 16px;
  }
}
:root {
  --deep-purple: #141736;
  --purple: #9d72ff;
  --green: #01ffc3;
  --red: #f21a1d;
  --yellow: #fef900;
}
</style>
