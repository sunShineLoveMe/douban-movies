// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../../utils/utils.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // navigateTitle: "",
        totalCount: 0,
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var category = options.category;
        this.data.navigateTitle = category;
        var dataUrl = '';
        switch (category) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?apikey=" + app.globalData.apikey;
                break;
            case "即将热映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?apikey=" + app.globalData.apikey;
                break;
            case "豆瓣Top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?apikey=" + app.globalData.apikey;
                break;
        }
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData);
    },
    processDoubanData: function (moviesDouban) {
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
        var totalMovies = [];
       
        if(!this.data.isEmpty) {
            totalMovies = this.data.movies.concat(movies);
        } else {
            totalMovies = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMovies
        });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
    },
    onScrollLower: function(event) {
        // console.log("加载更多@");
        var nextUrl = this.data.requestUrl + "&start=" + this.data.totalCount + "&count=20";
        wx.showNavigationBarLoading();
        util.http(nextUrl, this.processDoubanData);
    },
    onPullDownRefresh: function(event) {
        var refreshUrl = this.data.requestUrl + "&start=0&count=20";
        wx.showNavigationBarLoading();
        this.data.movies = {};
        this.data.isEmpty = true;
        util.http(refreshUrl, this.processDoubanData);
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle,
        })
    }

})