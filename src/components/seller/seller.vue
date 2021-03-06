<template>
  <cube-scroll class="seller" :options="sellerScrollOptions">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-bottom-1px">
          <star :size="36" :score="seller.score" >{{seller.score}}</star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
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
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-bottom-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul>
          <li
            v-for="(item, index) in seller.supports"
            :key="index"
            class="support-item border-bottom-1px"
          >
            <support-ico :size="4" :type="item.type"></support-ico>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <cube-scroll class="pic-wrapper" :options="picScrollOptions">
          <ul class="pic-list">
            <li
              v-for="(pic, index) in seller.pics"
              :key="index"
              class="pic-item">
              <img width="120" height="90" :src="pic">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li
            class="info-item border-bottom-1px"
            v-for="(item, index) in seller.infos"
            :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
  import { saveToLocal, loadFromLocal } from 'common/js/storage'
  import Split from 'components/split/split'
  import Star from 'components/star/star'
  import SupportIco from '../support-ico/support-ico'
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
    data() {
      return {
        favorite: false,
        sellerScrollOptions: {
          directionLockThreshold: 0,
          click: false
        },
        picScrollOptions: {
          scrollX: true,
          stopPropagation: true,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller() {
        return this.data.seller || {}
      },
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created () {
      this.favorite = loadFromLocal(this.seller.id, 'favorite', false)
    },
    methods: {
      toggleFavorite() {
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    },
    components: {
      SupportIco,
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
    /*white-space: normal*/
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
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: $fontsize-small-s
            color: $color-light-grey
          .content
            line-height: 24px
            font-size: $fontsize-small-s
            color: $color-dark-grey
            .stress
              font-size: $fontsize-large-xxx
      .favorite
        position: absolute
        right: 11px
        top: 18px
        text-align: center
        width: 50px
        .icon-favorite
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: $fontsize-large-xxx
          color: $color-light-grey-s
          &.active
            color: $color-red
        .text
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-grey
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .content-wrapper
        padding: 0 12px 16px 12px
        .content
          line-height: 24px
          font-size: $fontsize-small
          color: $color-red
          white-space: normal
      .support-item
        display: flex
        align-items: center
        padding: 16px 12px
        &:last-child
          border-none()
        .support-ico
          margin-right: 6px
        .text
          line-height: 16px
          font-size: $fontsize-small
          color: $color-dark-grey
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        color: $color-dark-grey
        font-size: $fontsize-medium
      .pic-wrapper
        display: flex
        align-items: center
        .pic-list
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .info
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .info-item
        padding: 16px 12px
        line-height: 16px
        font-size: $fontsize-small
        color: $color-dark-grey
</style>
