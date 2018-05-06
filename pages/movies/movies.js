var app = getApp();
var util = require("../../utils/utils.js");
// pages/movies/movies.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        containerShow: true,
        searchPanelShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?apikey=" + app.globalData.apikey + "&start=0&count=3";
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?apikey=" + app.globalData.apikey + "&start=3&count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250?apikey=" + app.globalData.apikey + "&start=6&count=3";

        this.getMovieListData(inTheaterUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "top250");
    },

    getMovieListData: function (url, settedKey, categoryTitle) {
        var that = this;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                "Content-Type": "application/xml"
            },
            success: function (res) {
                // console.log(res);
                that.processDoubanData(res.data, settedKey, categoryTitle);
            },
            fail: function (error) {
                console.log(error);
            },
        })
    },

    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: util.covertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }
        var readyData = {};
        readyData[settedKey] = {
            categoryTitle,
            "movies": movies
        };
        this.setData(readyData);
    },

    // 点击更多
    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category,
        })
    },

    onBindFoucs: function (event) {
        this.setData({
            containerShow: false,
            searchPanelShow: true
        });
    },

    onCancelImgTap: function () {
        this.setData({
            containerShow: true,
            searchPanelShow: false
        });
    },

    onBindChange: function (event) {
        var text = event.detail.value;
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?apikey=" + app.globalData.apikey + "&q=" + text;
        this.getMovieListData(searchUrl, "searchResult", "");
    },

    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?id=' + movieId,
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