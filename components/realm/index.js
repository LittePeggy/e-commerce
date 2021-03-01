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
    judger: Object,
    prevewImg: String,
    title: String,
    stock: null
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
      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku){
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSpuData: function () {
      const spu = this.properties.spu
      this.setData({
        prevewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price
      })
    },
    bindSkuData: function (sku) {
      console.log(sku)
      this.setData({
        prevewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock
      })
    },
    bindInitData: function (fenceGroup, judger) {
      this.setData({
        fences: fenceGroup.fences,
        judger
      })
    },
    onCellTap: function (event) {
      const detail = event.detail
      this.data.judger.judger(detail);
      this.setData({
        fences: this.data.judger.fenceGroup.fences
      })
    }
  }
})
