// components/realm/index.js
import {FenceGroup} from "../../components/modles/fence-group";
import {Judger} from "../../components/modles/judger";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    skuList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    fences: Array
  },

  observers: {
    "spu": function (spu){
      if (!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup);
      this.bindInitData(fenceGroup)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData: function (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    }
  }
})
