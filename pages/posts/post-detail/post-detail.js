// 只能用相对路径
var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    // this.data.postData1 = postData;
    this.setData(postData);
    var postCollected = wx.getStorageSync('posts_collected');
    if (postCollected) {
      var postCollected = postCollected[postId];
      this.setData({
        collected: postCollected
      });
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
  },

  onCollectionTap: function(event){
    var postsCollected = wx.getStorageSync("posts_collected");
    // postsCollected
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({
      collected: postCollected
    }); 
    this.showModal(postsCollected,  postCollected);
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? "收藏该文章?" : "取消收藏该文章?",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#4050f80",
      success: function (res) {
        if (res.confirm) {
            wx.setStorageSync('posts_collected', postsCollected);
            that.setData({
                collected: postCollected
            });
        }
      }
    })
  },
  onShareTap: function(event) {
      var itemList = [
          "分享给微信好友",
          "分享到朋友圈",
          "分享到QQ",
          "分享到微博",
      ];
    wx.showActionSheet({
        itemList: itemList,
        itemColor: "#405f80",
        success: function(res) {
            // res.cancel 用户是不是点击了取消
            // res.tapIndex  数组序号
            wx.showModal({
                title: "用户分享到了" + itemList[res.tapIndex],
                content: "现在无法实现分析功能，什么时候能支持呢"
            })
        }
    })
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