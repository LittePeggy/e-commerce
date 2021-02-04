// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: Array,
    h: null
  },

  observers: {
    'data': function (data){
      if (!data || !data.tags){
        return
      }
      const tags = data.tags.split('$');
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoadImg: function (event){
      const {width, height} = event.detail;
      const h = height * 340 / width
      this.setData({
        h
      })
    }
  }
})
