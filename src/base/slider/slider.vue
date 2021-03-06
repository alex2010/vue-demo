<template lang="pug">
  .slider(ref='slider')
    .slider-group(ref='sliderGroup')
      slot
    .dots
      span.dot(v-bind:class='{active: currentPageIndex === index }', v-for='(item, index) in dots')
</template>

<script lang="coffeescript">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider'
    props:
      loop:
        type: Boolean
        default: true

      autoPlay:
        type: Boolean
        default: true

      interval:
        type: Number
        default: 4000

    data: ->
      dots: []
      currentPageIndex: 0

    mounted: ->
      setTimeout =>
        @_setSliderWidth()
        @_initDots()
        @_initSlider()
        if @autoPlay
          @_play()
      , 20

      window.addEventListener 'resize', =>
        unless @slider
          return
        @_setSliderWidth true
        @slider.refresh()

    deactivated: ->
      @slider.disable()
      clearTimeout @timer

    beforeDestroy: ->
      @slider.disable()
      clearTimeout @timer

    activated: ->
      if @autoPlay
        @_play()

    methods:
      refresh: ->
        if @slider
          @_setSliderWidth(true)
          @slider.refresh()

      _setSliderWidth: (isResize)->
        @children = @$refs.sliderGroup.children
        width = 0
        sliderWidth = @$refs.slider.clientWidth
        for child in @children
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth

        if @loop and !isResize
          width += 2 * sliderWidth

        @$refs.sliderGroup.style.width = width + 'px'

      _initSlider: ->
        @slider = new BScroll @$refs.slider,
          scrollX: true
          scrollY: false
          momentum: false
          snap:
            loop: @loop
            threshold: 0.3
            speed: 400

        @slider.on 'scrollEnd', @_onScrollEnd

        @slider.on 'touchend', =>
          if @autoPlay
            @_play()

        @slider.on 'beforeScrollStart', =>
          if @autoPlay
            clearTimeout @timer

      _onScrollEnd: ->
        pageIndex = @slider.getCurrentPage().pageX
        @currentPageIndex = pageIndex
        if @autoPlay
          @_play()

      _initDots: ->
        @dots = new Array(@children.length)

      _play: ->
        clearTimeout(@timer)
        @timer = setTimeout =>
          @slider.next()
        , @interval
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
