<template>
  <transition name="fade">
    <cube-popup
      v-show="visible"
      :mask-closable="true"
      @mask-click="maskClick"
      position="bottom"
      type="shop-cart-list"
      :z-index="90"
    >
      <transition name="move">
        <div v-if="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <cube-scroll class="list-content">
            <ul>
            <li
              class="food"
              v-for="(food, index) in selectFoods"
              :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price}}</span>
              </div>
              <div class="cart-control-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
  import CartControl from 'components/cart-control/cart-control'

  const EVENT_HIDE = 'hide'

  export default {
    name: 'shop-cart-list',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      empty() {
      },
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
        this.$emit(EVENT_HIDE)
      },
      maskClick() {
        this.hide()
      }
    },
    components: { CartControl }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .cube-shop-cart-list
    bottom: 48px
    &.fade-enter, &.fade-leave-to
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.3s ease-in-out
      opacity: 1
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: $color-background-ssss
      .title
        float: left
        font-size: $fontsize-medium
        color: $color-dark-grey
      .empty
        float: right
        font-size: $fontsize-small
        color: $color-blue

    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: $color-white
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        .name
          line-height: 24px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-weight: 700
          font-size: $fontsize-medium
          color: $color-red
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 6px
</style>
