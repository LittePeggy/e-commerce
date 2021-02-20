// components/realm/index.js
import {FenceGroup} from "../../components/modles/fence-group";

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

  },

  observers: {
    "spu": function (spu){
      if (!spu){
        return
      }
      const fanceGroup = new FenceGroup(spu);
      fanceGroup.initFences1()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
