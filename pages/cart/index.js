import { request } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0,
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const address = wx.getStorageSync("address");
        const cart = wx.getStorageSync("cart") || [];

        this.setData({ address });
        this.setCart(cart);
    },

    handleChooseAddress() {
        // 它现在好像没有权限问题了，取消确认弹框无了
        wx.chooseAddress({
            success: (result)=>{
                console.log('ch',result)
            },
        });
        // try {
            // wx.getSetting({
            //     success: (result)=>{
            //      console.log(result)
            //     },
            // });
        // } catch (e) {
        //     console.log(e);
        // }
    },
    
    // 商品的选中
    handleItemChange(e) {
        const goods_id = e.currentTarget.dataset.id;
        let { cart } = this.data;
        // 找到被修改的商品对象
        let index = cart.findIndex(v => v.goods_id === goods_id);
        cart[index].checked = !cart[index].checked;

        this.setCart(cart);

    },

    setCart(cart) {
        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num;
            } else {
                allChecked = false;
            }
        });
        // 判断数组是否为空
        allChecked = cart.length != 0 ? allChecked : false;

        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked,
        })
        wx.setStorageSync("cart", cart);
    }
})