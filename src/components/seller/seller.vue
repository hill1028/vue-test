<template>
  <cube-scroll class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-bottom-1px">
          <star :size="36" :score="seller.score" >{{seller.score}}</star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
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
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      seller() {
        return this.data.seller || {}
      }
    },
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
      .title
        margin-bottom: 8px
        line-height: 14px
        color: $color-dark-grey
        font-size: $fontsize-medium
      .desc
        display: flex
        align-items: center
        padding-bottom: 18px
        .star
          margin-right: 8px
        .text
          margin-right: 12px
          font-size: $fontsize-small-s
          color: $color-grey
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid $color-col-line
    .bulletin
      padding: 18px 18px 0 18px
</style>
