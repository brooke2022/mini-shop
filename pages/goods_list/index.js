// pages/goods_list/index.js
import { request } from "../../request/index.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 0,
                value: "销量",
                isActive: false
            },
            {
                id: 0,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: [],
        pagesize: 10,
    },
    QueryParams: {
        query:"",
        cid:"",
        pagenum: 1,
        pagesize: 10,
    },

    totalPages: 1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid=options.cid||"";
        this.QueryParams.query=options.query||"";
        this.getGoodsList();
    },

    getGoodsList() {
        request({
            url: "/goods/search",
            data: this.QueryParams,
        })
        .then(res => {
            const goodsList = res.goods;
            // 获取 总条数
            const total=res.total;
            // 计算总页数
            this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
            this.setData({
                goodsList,
            })
        })

        wx.stopPullDownRefresh();
    },

    handleTabsItemChange(e){
        // 1 获取被点击的标题索引
        const {index} = e.detail;
        // 2 修改源数组
        let tabs = this.data.tabs;
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
        // 3 赋值到data中
        this.setData({
          tabs
        })
      },

    //   是复制的
      onReachBottom(){
        //  1 判断还有没有下一页数据
          if(this.QueryParams.pagenum>=this.totalPages){
            // 没有下一页数据
            //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            wx.showToast({ title: '没有下一页数据' });
              
          }else{
            // 还有下一页数据
            //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            this.QueryParams.pagenum++;
            this.getGoodsList();
          }
        },
        // 下拉刷新事件 
        onPullDownRefresh(){
          // 1 重置数组
          this.setData({
            goodsList:[]
          })
          // 2 重置页码
          this.QueryParams.pagenum=1;
          // 3 发送请求
          this.getGoodsList();
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