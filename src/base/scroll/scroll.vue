<template lang="pug">
  div(ref='wrapper')
    slot
</template>

<script lang="coffeescript">
  import BScroll from 'better-scroll'

  DIRECTION_H = 'horizontal'
  DIRECTION_V = 'vertical'

  export default {
    props:
      probeType:
        type: Number
        default: 1

      click:
        type: Boolean
        default: true

      listenScroll:
        type: Boolean
        default: true

      data:
        type: Array
        default: null

      pullup:
        type: Boolean
        default: false

      beforeScroll:
        type: Boolean
        default: false

      refreshDelay:
        type: Number
        default: 20

      direction:
        type: String
        default: DIRECTION_V

    mounted: ->
      setTimeout =>
        @_initScroll()
      , 20

    methods:
      _initScroll: ->
        unless @$refs.wrapper
          return

        @scroll = new BScroll @$refs.wrapper,
          probeType: @probeType
          click: @click
          eventPassthrough: if this.direction is DIRECTION_V then DIRECTION_H else DIRECTION_V

        if @listenScroll
          @scroll.on 'scroll', (pos)=>
            @$emit 'scroll', pos

        if @pullup
          @scroll.on 'scrollEnd', =>
            if @scroll.y <= @scroll.maxScrollY + 50
              @$emit 'scrollToEnd'

        if @beforeScroll
          @scroll.on 'beforeScrollStart', =>
            @$emit 'beforeScroll'

      enable: ->
        @scroll && @scroll.enable()

      disable: ->
        @scroll && @scroll.disable()

      refresh: ->
        @scroll && @scroll.refresh()

      scrollTo: ->
        @scroll && @scroll.scrollTo.apply(@scroll, arguments)

      scrollToElement: ->
        @scroll && @scroll.scrollToElement.apply(@scroll, arguments)

    watch:
      data: ->
        setTimeout =>
          @refresh()
        , @refreshDelay
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
