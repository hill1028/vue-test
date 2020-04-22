<template>
  <cube-scroll class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title"></h1>
        <div class="desc border-left-1px">
          <star :size="24" ></star>
          <span class="text"></span>
          <span class="text">月售</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin"></div>
    </div>
  </cube-scroll>
</template>

<script>
  import Split from 'components/split/split'
  import Star from 'components/star/star'
  export default {
    name: 'seller',
    components: {
      Split,
      Star
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .seller
    height: 100%
    text-align: left
    .overview
      padding: 18px
    .bulletin
      padding: 18px 18px 0 18px
</style>
