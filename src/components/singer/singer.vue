<template lang="pug">
  .singer(ref='singer')
    list-view(v-bind:data="singers")
</template>

<script lang="coffeescript">
  import ListView from 'base/listview/listview'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'

  HOT_SINGER_LEN = 10
  HOT_NAME = '热门'

  export default {

    data: ->
      singers: []

    created: ->
      @_getSingerList()

    methods:
      _getSingerList: ->
        getSingerList().then (res) =>
          if res.code is ERR_OK
            @singers = @_normalizeSinger(res.data.list)

      _normalizeSinger: (list)->
        map =
          hot:
            title: HOT_NAME
            items:[]
        for item,index in list
          if index < HOT_SINGER_LEN
            map.hot.items.push new Singer
              name: item.Fsinger_name
              id: item.Fsinger_mid
          key = item.Findex

          map[key] ?=
            title: key
            items: []

          map[key].items.push new Singer
            name: item.Fsinger_name
            id: item.Fsinger_mid

        ret = []
        hot = []

        for key, val of map
          if val.title.match /[a-zA-Z]/
            ret.push val
          else if val.title is HOT_NAME
            hot.push val

        ret.sort (a, b)=>
          a.title.charCodeAt(0) - b.title.charCodeAt(0)

        hot.concat ret

    components: {ListView}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
