// pages/goods_detail/index.js
import { request } from "../../request/index.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        isCollect: false,
    },

    GoodsInfo: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let pages =  getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        const { goods_id } = options;
        this.getGoodsDetail(goods_id);

    },

    getGoodsDetail(goods_id) {
        request({ url: "/goods/detail", data: {goods_id }})
        .then(goodsObj => {
            this.GoodsInfo = goodsObj;
            this.goodsObj = goodsObj;
            console.log(goodsObj);
            let collect = wx.getStorageSync("collect") || [];
            let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
            this.setData({
                goodsObj: {
                    goods_name: goodsObj.goods_name,
                    goods_price: goodsObj.goods_price,
                    // iphone部分手机 不识别 webp图片格式 
                    // 最好找到后台 让他进行修改 
                    // 临时自己改 确保后台存在 1.webp => 1.jpg 
                    goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                    pics: goodsObj.pics
                  },
                isCollect,
            })

        })
    },

    handlePreviewImage(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid); 
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls,
        });
    },

    handleCartAdd() {
        let cart = wx.getStorageSync("cart")||[];
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
        if (index === -1) {
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo);
        } else {
            cart[index].num++;
        }
        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        })
    },

    handleCollect() {
        let isCollect = false;
        let collect = wx.getStorageSync("collect") || [];
        let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
        if (index !== -1) {
            collect.splice(index,1);
            isCollect = false;
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true,
            });
        } else {
            collect.push(this.GoodsInfo);
            isCollect = true;
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true,
            });
        }
        wx.setStorageSync("collect", collect);
        this.setData({
            isCollect
        })
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