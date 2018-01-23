<template lang="pug">
  scroll.listview(v-on:scroll="scroll" v-bind:listen-scroll="listenScroll" v-bind:probe-type="probeType" v-bind:data="data" ref="listview")
    ul
      li.list-group(v-for="group in data" ref="listGroup")
        h2.list-group-title {{group.title}}
        ul
          li.list-group-item(v-for="item in group.items")
            img.avatar(v-lazy="item.avatar")
            span.name {{item.name}}
    .loading-container(v-show='!data.length')
      loading

</template>

<script lang="coffeescript">

  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'

  export default {
    props:
      data:
        type: Array
        default: null

    computed:
      shortcutList: ->
        []

      fixedTitle: ->

    data: ->
      scrollY: -1
      currentIndex: 0
      diff: -1

    created: ->
      @probeType = 3
      @listenScroll = true
      @touch = {}
      @listHeight = []

    methods:
      onShortcutTouchStart: (e)->

      onShortcutTouchMove: (e)->

      refresh: ->

      scroll: ->

      _calculateHeight: ->

      _scrollTo: ->


    watch:
      data: ->
        setTimeout =>
          @_calculateHeight()
        , 20

      scrollY: (newY)->

      diff: (newVal)->

    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
