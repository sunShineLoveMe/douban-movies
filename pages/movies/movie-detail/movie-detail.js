// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var util = require("../../../utils/utils.js");
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
    var movieId = options.id;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/subject/" + movieId + "?apikey="+ app.globalData.apikey;
    util.http(searchUrl, this.processDoubanData);

  },

  // 回调函数  
  processDoubanData: function(data) {
    // console.log(data);
    var director = {
        avator: "",
        name: "",
        id: ""
    }
    if(data.directors[0] != null) {
        if (data.directors[0].avator !=null) {
            director.avator = data.directors[0].avatars.large
        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id;
    }
    var movie = {
        movieImg: data.images ? data.images.large : "",
        country: data.countries[0],
        title: data.title,
        originalTitle: data.original_title,
        wishCount: data.wish_count,
        commentCount: data.comments_count,
        year: data.year,
        generes: data.genres.join("、"),
        stars: util.covertToStarsArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        casts: util.covertToCastString(data.casts),
        castsInfo: util.covertToCastInfos(data.casts),
        summary: data.summary
    }
    this.setData({
        movie: movie
    });
  }

})