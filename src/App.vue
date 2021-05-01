<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("./assets/sass/reset.scss");

body {
  scroll-behavior: smooth;
  background-color: var(--deep-purple);
}
:root {
  --deep-purple: #141736;
  --purple: #9d72ff;
  --green: #01ffc3;
  --red: #f21a1d;
  --yellow: #fef900;
}
</style>
