<template>
<div class="shop-cart">
  <div class="content">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{'highlight': totalCount>0}">
          <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
        </div>
        <div class="num" v-show="totalCount>0">
          <bubble :num="totalCount"></bubble>
        </div>
      </div>
      <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
      <div class="desc">另需配送费{{deliveryPrice}}</div>
    </div>
    <div class="content-right">
      <div class="pay" :class="payClass">{{payDesc}}</div>
    </div>
  </div>
</div>
</template>

<script>
  import Bubble from 'components/bubble/bubble'
  export default {
    name: 'shop-cart',
    props: {
      deliveryPrice: {
        type: Number,
        default() {
          return 0
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      totalPrice() {
        let price = 0
        this.selectFoods.forEach((food) => {
          if (food.count) {
            price += food.count * food.price
          }
        })
        return price
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          if (food.count) {
            count += food.count
          }
        })
        return count
      },
      payClass() {
        if (this.selectFoods.count || this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          const diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      }
    },
    methods: {
      drop(el) {

      }
    },
    components: {
      Bubble
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .shop-cart
    height: 100%
    .content
      display: flex
      background-color: $color-background
      color: $color-light-grey
      .content-left
        flex: 1
        .logo-wrapper
          position: relative
          display: inline-block
          vertical-align: top
          top: -10px
          margin: 0 12px
          padding: 6px
          height: 56px
          width: 56px
          box-sizing: border-box
          border-radius: 50%
          background-color: $color-background
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background-color: $color-dark-grey
            &.highlight
              background-color: $color-blue
            .icon-shopping_cart
              line-height: 44px
              font-size: $fontsize-large-xxx
              color: $color-light-grey
              &.highlight
                color: $color-white
          .num
            position: absolute
            top: 0
            right: 0
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-weight: 700
          font-size: $fontsize-large
          &.highlight
            color: $color-white
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: $fontsize-small-s
      .content-right
        flex: 0 0 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          font-size: $fontsize-small
          &.not-enough
            background-color: $color-dark-grey
          &.enough
            background: $color-green
            color: $color-white
</style>
