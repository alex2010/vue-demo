<template lang="pug">
  div(ref='wrapper')
    slot
</template>

<script lang="coffeescript">
  import BScroll from 'better-scroll'

  export default {
    props:
      probeType:
        type: Number
        default: 1

      click:
        type: Boolean
        default: true

      data:
        type: Array
        default: null

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

      enable: ->
        @scroll && @scroll.enable()

      disable: ->
        @scroll && @scroll.disable()

      refresh: ->
        @scroll && @scroll.refresh()

    watch:
      data: ->
        setTimeout =>
          @refresh()
        , 20
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
