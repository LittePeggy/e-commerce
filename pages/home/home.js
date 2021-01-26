import {Theme} from "../../modle/theme";
import {Banner} from "../../modle/banner";
import {Category} from "../../modle/category";
import {Activity} from "../../modle/activity";

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
    bannerG: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initLocation()
  },

  async initLocation(){
    const theme = new Theme()
    await theme.getThemeAll()
    const themeA = await theme.getHomeLocationA()
    const bannerB = await Banner.getLocationB()
    const gridC = await Category.getLoncationC()
    const activityD = await Activity.getLocationD()
    const themeE = await theme.getHomeLocationE()
    let themeSpuList = await Theme.getLocationESpuList()
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})