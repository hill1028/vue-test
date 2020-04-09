<template>
  <transition @after-leave="afterLeave" name="fade">
    <div v-show="visible" class="food">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}元</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}元</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control @add="onAdd" :food="food"></cart-control>
            </div>
            <transition name="fade">
              <div @click="addFirst" class="buy" v-show="!food.count">加入购物车</div>
            </transition>
          </div>
          <split></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
  import Split from 'components/split/split'
  import popupMixin from 'common/mixins/popup'
  import CartControl from 'components/cart-control/cart-control'
  const EVENT_LEAVE = 'leave'
  const EVENT_ADD = 'add'
  export default {
    name: 'food',
    mixins: [popupMixin],
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      afterLeave() {
        this.$emit(EVENT_LEAVE)
      },
      addFirst(event) {
        this.$set(this.food, 'count', 1)
        this.$emit(EVENT_ADD, event.target)
      },
      onAdd(target) {
        this.$emit(EVENT_ADD, target)
      }
    },
    components: {
      Split,
      CartControl
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 30
    background: $color-white
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.3s linear
    &.fade-enter, &.fade-leave-to
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: $fontsize-large-xx
          color: $color-white

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: $fontsize-medium
        font-weight: 700
        color: $color-dark-grey
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        .sell-count, .rating
          font-size: $fontsize-small-s
          color: $color-light-grey
        .sell-count
          margin-right: 12px

      .price
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: $color-red
        .old
          text-decoration : line-through
          font-size: $fontsize-small-s
          color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: $fontsize-small-s
        color: $color-white
        background-color: $color-blue
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all .3s linear
        &.fade-enter, &.fade-leave-to
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .text
        padding: 0 8px
        line-height: 24px
        font-size: $fontsize-small
        color: $color-grey

</style>
