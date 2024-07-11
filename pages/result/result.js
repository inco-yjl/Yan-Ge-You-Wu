import {
    tags,
    authors
} from '../../source/songsConfig'
Page({

    data: {
        score: 95,
        recommends: [{
                name: '无敌',
                style: 'red-label'
            }, {
                name: '真爱',
                style: 'green-label'
            },
            {
                name: '时代的眼泪',
                style: 'blue-label'
            },
            {
                name: '假粉吧',
                style: 'yellow-label'
            },
        ],
        author: [{
            name: 'Creuzer',
            icon: 'https://i0.hdslb.com/bfs/face/a04ec584c3fb44535268f8541e19a77b14ae7294.jpg@240w_240h_1c_1s_!web-avatar-search-videos.webp'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let result = JSON.parse(options.result);
        console.log(result);
        let listauthors = [];
        result.author.forEach(author => {
            if (author.num > 1 && !listauthors.includes(author.name)) {
                listauthors.push(author.name)
            }
        })
        if (listauthors.length < 3) {
            result.author.forEach(author => {
                if (author.num > 0 && listauthors.length < 3 && !listauthors.includes(author.name)) {
                    listauthors.push(author.name)
                }
            })
        }
        let resultAuthors = [];
        listauthors.forEach(author => {
            let index = authors.findIndex(one => {
                if (one.name === author) return true;
                else return false;
            })
            if (index > -1) resultAuthors.push({
                name: authors[index].realName,
                icon: authors[index].icon
            })
        })
        this.setData({
            author: resultAuthors
        });
        let score = 0;
        switch (result.correct) {
            case 0:
                score = 0;
                break;
            case 1:
                score = 10;
                break;
            case 2:
                score = 20;
                break;
            case 3:
                score = 30;
                break;
            case 4:
                score = 50;
                break;
            case 5:
                score = 60;
                break;
            case 6:
                score = 70;
                break;
            case 7:
                score = 80;
                break;
            case 8:
                score = 85;
                break;
            case 9:
                score = 90;
                break;
            case 10:
                score = 95;
                break;
            case 11:
                score = 100;
                break;
            default:
                break;
        }
        this.setData({
            score: score
        })
        let indexes = [];
        let mytag = [];
        result.type.forEach(type => {
            if (type.name === 'ROLD' && type.num >= 2 && !indexes.includes(4)) { //时泪；蓝
                indexes.push(4);
                mytag.push(tags[4])
            }
            if (type.name === 'HARD' && type.num >= 2 && !indexes.includes(1)) { //真爱；绿
                indexes.push(1);
                mytag.push(tags[1])
            }
            if (score > 90 && !indexes.includes(0)) { //分数->无敌；红
                indexes.push(0);
                mytag.push(tags[0])
            }
            if (type.name === 'HARD' && type.num >= 4 && !indexes.includes(0)) { //无敌；红
                indexes.push(0);
                mytag.push(tags[0])
            }
            if (type.name === 'SERIES' && type.num >= 2 && !indexes.includes(9)) { //企划; 黄
                indexes.push(9);
                mytag.push(tags[9])
            }
            if (type.name === 'COLLAB' && type.num >= 2 && !indexes.includes(7)) { //梦幻联动; 红
                indexes.push(7);
                mytag.push(tags[7])
            }
            //以上为答对的成就
            if (type.name === 'ANNI' && type.num >= 2 && !indexes.includes(8)) { //忙点好啊；橙
                indexes.push(8);
                mytag.push(tags[8])
            }
            if (type.name === 'OLD' && type.num >= 2 && !indexes.includes(3)) { //听老歌；蓝
                indexes.push(3);
                mytag.push(tags[3])
            }
            if (type.name === 'ALBUM' && type.num >= 2 && !indexes.includes(6)) { //买砖；绿
                indexes.push(6);
                mytag.push(tags[6])
            }
            if (type.name === 'OFFICIAL' && !indexes.includes(2)) { //路人；官方歌曲答错；红
                indexes.push(2);
                mytag.push(tags[2])
            }
            if (type.name === 'EASY' && !indexes.includes(5)) { //假粉；黄
                indexes.push(5);
                mytag.push(tags[5])
            }

        })
        this.setData({
            recommends: mytag
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})