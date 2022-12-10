<template>
  <div class="index-txt"><span>RH模型</span></div>
</template>

<script setup>
defineOptions( {
  name : 'index'
} )
</script>

<style lang="scss" scoped>
.index-txt {
  width: 100%;
  height: 100vh;
  text-align: center;
  font-size: 85px;
  line-height: 85vh;
  font-family: '隶书', 'Dosis', sans-serif;
  text-shadow: 0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0, 0px 4px 0px #909090,
    0px 5px 10px rgba(0, 0, 0, 0.6);
  transform: skewX(-15deg);
}
</style>
