<template lang="pug">
  .recommend(ref='recommend')
    scroll(ref="scroll" class="recommend-content" v-bind:data="discList")
      div
        .slider-wrapper(ref="sliderWrapper" v-if="recommends.length")
          slider
            div(v-for="item in recommends")
              a(v-bind:href="item.linkUrl")
                img(class="needsclick" v-on:load="loadImage" v-bind:src="item.picUrl")
        .recommend-list
          h1.list-title 热门歌单推荐
          ul
            li(v-for="item in discList" class="item")
              .icon
                img(width="60" height="60"  v-lazy="item.imgurl")
              .text
                h2.name(v-html="item.creator.name")
                p.desc(v-html="item.dissname")

      .loading-container(v-show="!discList.length")
        loading

</template>

<script lang="coffeescript">
  import {getRecommend, getDiscList} from 'api/recommend.js'
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'
  import Loading from 'base/loading/loading'
  import {ERR_OK} from 'api/config'

  export default {
    data: ->
      recommends: []
      discList: []

    created: ->
      @_getRecommend()
      @_getDiscList()

    methods:
      loadImage: ->
        unless @checkloaded
          @checkloaded = true
          @$refs.scroll.refresh()

      _getDiscList: ->
        getDiscList().then (res)=>
          if res.code is ERR_OK
            @discList = res.data.slider

      _getRecommend: ->
        getRecommend().then (res)=>
          if res.code is ERR_OK
            @recommends = res.data.slider

    components: {Scroll, Slider, Loading}

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
