<template>
  <div class="shop-cart-sticky">
    <shop-cart
    :deliveryPrice = "deliveryPrice"
    :minPrice = "minPrice"
    :selectFoods = "selectFoods"
  ></shop-cart>
  </div>
</template>

<script>
  import ShopCart from 'components/shop-cart/shop-cart'
  export default {
    name: 'shop-cart-sticky',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    components: {
      ShopCart
    }
  }
</script>

<style lang="stylus" scoped>
  .shop-cart-sticky
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 999
</style>
