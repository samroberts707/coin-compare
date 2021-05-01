<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
 @import url('./assets/sass/reset.scss');

body {
  scroll-behavior: smooth;
  background-color: var(--deep-purple);
}
:root {
  --deep-purple: #141736;
  --purple: #9D72FF;
  --green: #01FFC3;
  --red: #F21A1D;
  --yellow: #FEF900;
}
</style>
