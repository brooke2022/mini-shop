import { request } from "../../request/index.js";

// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrollTop: 0
    },
    // 接口的返回数据
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCates();
    },

    getCates() {
        request({ url: "/categories"})
        .then(res => {
            this.Cates = res;
            let leftMenuList = this.Cates.map(v => v.cat_name);
            let rightContent = this.Cates[0].children;
            this.setData({
                leftMenuList,
                rightContent
            })
        })
    },

    handleItemTap(e) {
        const { index } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent
        })

    },

    //{index}是es6的解构方式，e.currentTarget.dataset获取的是一个对象;

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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