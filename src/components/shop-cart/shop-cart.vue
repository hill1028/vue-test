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
  <div class="ball-container">
    <div v-for="(ball,index) in balls" :key="index">
      <transition
        @before-enter="beforeDrop"
        @enter="dropping"
        @after-enter="afterDrop"
      >
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
  import Bubble from 'components/bubble/bubble'

  const BALL_LEN = 10

  const innerClsHook = 'inner-hook'
  function createBalls () {
    const balls = []
    for (let i = 0; i < BALL_LEN; i++) {
      balls.push({
        show: false
      })
    }
    return balls
  }

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
    data() {
      return {
        balls: createBalls()
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
    created () {
      this.dropBalls = []
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) {
            const ball = this.balls[i]
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            // console.log(ball.show)
            return
          }
        }
      },
      beforeDrop(el) {
        const ball = this.dropBalls[this.dropBalls.length - 1]
        const rect = ball.el.getBoundingClientRect()
        const x = rect.left - 32
        const y = -(window.innerHeight - rect.top - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
      },
      dropping(el, done) {
        this._reflow = document.body.offsetHeight
        el.style.transform = el.style.webkitTransform = 'translate3d(0, 0, 0)'
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      },
      afterDrop(el) {
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
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
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: $color-blue
          transition: all 0.4s linear
</style>
