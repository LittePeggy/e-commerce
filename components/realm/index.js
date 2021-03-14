// components/realm/index.js
import {FenceGroup} from "../../components/modles/fence-group";
import {Judger} from "../../components/modles/judger";
import {Cell} from "../../components/modles/cell";
import {Spu} from "../../modles/spu";
import {Cater} from "../modles/cater"

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
    judger: null,
    prevewImg: String,
    title: String,
    stock: null,
    isNoSpece: false,
    isIntact: false,
    overStock: false,
    currentCount: Cater.sku_min_count
  },

  observers: {
    "spu": function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpece(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec: function (spu) {
      this.bindSkuData(spu.sku_list[0])
      this.setStockStatus(spu.sku_list[0].stock, this.data.currentCount)
      this.setData({
        isNoSpece: true
      })
    },
    processHasSpec: function (spu) {
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup);
      this.bindFenceGroupData(fenceGroup, judger)
      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
        this.setStockStatus(defaultSku.stock, this.data.currentCount)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
    },
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
      this.setData({
        prevewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock
      })
    },
    bindFenceGroupData: function (fenceGroup, judger) {
      this.setData({
        fences: fenceGroup.fences,
        judger
      })
    },
    bindTipData: function () {
      this.setData({
        isIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeysTitle()
      })
    },
    onCellTap: function (event) {
      const data = event.detail
      const cell = new Cell(data.cell.spec)
      cell.status = data.cell.status
      const judger = this.data.judger
      judger.judger(cell, data.x, data.y);
      const isIntact = judger.isSkuIntact()
      if (isIntact) {
        const currentSku = judger.getDeterminateSku()
        this.bindSkuData(currentSku)
        this.setStockStatus(currentSku.stock, this.data.currentCount)
      }
      this.bindTipData()
      this.setData({
        fences: this.data.judger.fenceGroup.fences
      })
    },
    isOutOfStock: function(stock, currentCount){
      return currentCount > stock
    },
    setStockStatus: function(stock, currentCount){
      this.setData({
        overStock: this.isOutOfStock(stock, currentCount)
      })
    },
    onSelectCount: function(event){
      this.data.currentCount = event.detail.count
      const currentSku = this.data.judger.getDeterminateSku()
      this.setStockStatus(currentSku.stock, event.detail.count)
    }
  }
})
