<template>
    <cube-scroll class="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left"></div>
          <div class="overview-right"></div>
        </div>
      </div>
    </cube-scroll>
</template>

<script>
  export default {
    name: 'ratings'
  }
</script>

<style lang="stylus" scoped>
  .ratings
    height: 100%
    .ratings-content
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        padding: 6px 0
        border-right: 1px solid $color-col-line
        text-align: center
</style>
