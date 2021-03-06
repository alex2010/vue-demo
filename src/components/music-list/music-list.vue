<template lang="pug">
  .music-list
    .back(v-on:click="back")
      i.iocn-back
    h1.title(v-html="title")
    .bg-image(v-bind:style="bgStyle" ref="bgImage")
      .play-wrapper
        .play(ref="playBtn" v-show="songs.length")
          i.icon-play
          span.text 随机播放全部
      .filter(ref="filter")
    .bg-layer(ref="layer")
    scroll.list(ref='list' v-bind:data="songs" v-on:scroll="scroll" v-bind:listen-scroll="listenScroll" v-bind:probe-type="probeType")
      .song-list-wrapper
        song-list(v-bind:songs="songs")
      .loading-container(v-show="!songs.length")
        loading

</template>

<script lang="coffeescript">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import SongList from 'base/song-list/song-list'
  import {prefixStyle} from 'common/js/dom'

  RESERVED_HEIGHT = 40
  transform = prefixStyle('transform')
  backdrop = prefixStyle('backdrop-filter')

  export default {
    props:
      bgImage:
        type: String
        default: ''

      songs:
        type: Array
        default: []

      title:
        type: String
        default: ''

    computed:
      bgStyle: ->
        "background-image:url(#{@bgImage})"
    data: ->
      scrollY: 0

    created: ->
      @probeType = 3
      @listenScroll = true

    mounted: ->
      @imageHeight = @$refs.bgImage.clientHeight
      @minTransalteY = -@imageHeight + RESERVED_HEIGHT
      @$refs.list.$el.style.top = "#{this.imageHeight}px"

    methods:
      scroll: (pos)->
        @scrollY = pos

      back: ->
        @$router.back()

    watch:
      scrollY: (newVal)->
        log newVal

    components: {Scroll, Loading, SongList}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
