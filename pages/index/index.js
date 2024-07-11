// index.js
Page({
  startTest() {
    console.log('redirect')
    wx.redirectTo({
      url: '/pages/song/song'
    })
  },
  question(){
    wx.openEmbeddedMiniProgram({
        appId: 'wxebadf544ddae62cb',
        path: 'pages/survey/index?sid=14942539&hash=81c1&navigateBackMiniProgram=true',
      });
  },
  intro() {
    console.log('redirect')
    wx.redirectTo({
      url: '/pages/hint/hint'
    })
  },
})