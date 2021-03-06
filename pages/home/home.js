import {Theme} from "../../modles/theme";
import {Banner} from "../../modles/banner";
import {Category} from "../../modles/category";
import {Activity} from "../../modles/activity";
import {SpuPaging} from "../../modles/spu-paging";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    gridC: [],
    activityD: null,
    themeE: null,
    themeSpuList: [],
    themeF: null,
    bannerG: null,
    spuPaging: null,
    loadingType: 'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initLocation()
    await this.initBottomSpuList()
  },

  async initBottomSpuList(){
    const spuPaging = SpuPaging.getSpuPaging();
    const spuList = await spuPaging.getMoreData()
    this.data.spuPaging = spuPaging;
    wx.lin.renderWaterFlow(spuList.items)
  },

  async initLocation(){
    const theme = new Theme()
    await theme.getThemeAll()
    const themeA = await theme.getHomeLocationA()
    const bannerB = await Banner.getLocationB()
    const gridC = await Category.getLoncationC()
    const activityD = await Activity.getLocationD()
    const themeE = await theme.getHomeLocationE()
    let themeSpuList = []
    if(themeE.online){
      const data = await Theme.getLocationESpuList()
      if (data) {
        themeSpuList = data.spu_list.slice(0, 8)
      }
    }

    const themeF = await theme.getHomeLocationF()
    const bannerG = await Banner.getLocationG()
    const themeH = await theme.getHomeLocationH()

    this.setData({
      themeA,
      themeE,
      bannerB,
      gridC,
      activityD,
      themeSpuList,
      themeF,
      bannerG,
      themeH
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    let spuList = await this.data.spuPaging.getMoreData()
    if(!spuList){
      this.setData({
        loadingType: 'end'
      })
      return
    }
    wx.lin.renderWaterFlow(spuList.items)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})