<template lang="pug">
  .song-list
    ul
      li.item(v-for="song in songs")
        .content
          h2.name {{song.name}}
          p.desc {{getDesc(song)}}
</template>

<script lang="coffeescript">

  export default {
    props:
      songs:
        type: Array
        default: []

    methods:
      getDesc: (song)->
        "#{song.singer}·#{song.album}"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
