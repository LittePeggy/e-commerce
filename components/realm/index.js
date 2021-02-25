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
    fences: Array,
    judger: Object
  },

  observers: {
    "spu": function (spu){
      if (!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup);
      this.bindInitData(fenceGroup, judger)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData: function (fenceGroup, judger) {
      this.setData({
        fences: fenceGroup.fences,
        judger
      })
    },
    onCellTap: function (event) {
      console.log(event)
      const cell = event.detail.cell
      this.data.judger.judger(cell);
    }
  }
})
