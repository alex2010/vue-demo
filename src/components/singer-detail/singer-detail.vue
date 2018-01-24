<template lang="pug">
  transition(name="slide")
    music-list(v-bind:title="singer.name" v-bind:bg-image="bgImage" v-bind:songs="songs")
</template>

<script lang="coffeescript">
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'

  export default {
    computed: Object.assign
      title: ->
        @singer.name
      bgImage: ->
        @singer.avatar
    , mapGetters(['singer'])

    data: ->
      songs: []

    created: ->
      @_getDetail()

    methods:
      _getDetail: ->
        unless @singer.id
          @$router.push '/singer'
          return
        getSingerDetail(@singer.id).then (res)=>
          if res.code is ERR_OK
            @songs = @_normalizeSongs res.data.list

      _normalizeSongs: (list)->
        ret = []
        for item in list
          {musicData} = item
          if musicData.songid && musicData.albummid
            ret.push createSong musicData
        ret

    components: {MusicList}

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
