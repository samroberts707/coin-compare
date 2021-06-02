<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&display=swap");
@import url("./assets/sass/reset.scss");

@font-face {
  font-family: "Olympic Carrier";
  src: url("./assets/fonts/olympic_carrier/olympiccarrierhalfital.ttf");
  font-display: swap;
}

body {
  scroll-behavior: smooth;
  background-color: var(--deep-purple);
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  a,
  button,
  span,
  input,
  textarea,
  div {
    font-family: "IBM Plex Mono", monospace;
  }
  h1 {
    font-size: 30px;
  }
  h2 {
    font-size: 23px;
  }
  p,
  li,
  a,
  span,
  input,
  textarea {
    font-size: 16px;
  }
}
:root {
  --deep-purple: #141736;
  --purple: #9d72ff;
  --green: #01ffc3;
  --blue: #75d5fd;
  --red: #f21a1d;
  --yellow: #fef900;
}
</style>
