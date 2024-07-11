import {
    YanWasFamous,
    YanFamous,
    YanGreatWork,
    YanLuoFamous,
    OtherCouple,
    Unforgettable,
    Unknown
} from '../../source/songsConfig'
const app = getApp()
//const innerAudioContext = wx.createInnerAudioContext();
//const answerBgm = wx.createInnerAudioContext();
Page({
    data: {
        songindex: 0,
        song: null,
        testsongs: [],
        answerRecord: {
            type: [],
            author: [],
            correct: 0
        },
        isPlayAudio: false,
        answer: '',
        hint: false,
        audioSeek: 0,
        audioDuration: 0,
        audioTime: 0,
        wrong: false,
        submitted: false,
        content: ''
    },
    onLoad: function () {
        this.chooseSong();
    },
    onShow: function () {
        this.getNewPage();
    },
    nextSong: function () {
        let nextIndex = this.data.songindex + 1;
        if (nextIndex === 11) {
            wx.redirectTo({
                url: "/pages/result/result?result=" + JSON.stringify(this.data.answerRecord)
            })
            return;
        }
        this.setData({
            songindex: nextIndex,
            wrong: false,
            isPlayAudio: false,
            answer: '',
            hint: false,
            audioSeek: 0,
            audioDuration: 0,
            audioTime: 0,
            submitted: false,
            content: ''
        });
        if (this.data.isPlayAudio) {
            this.playAudio();
        }
        this.innerAudioContext.stop();
        this.innerAudioContext.destroy();
        this.answerBgm.stop();
        this.answerBgm.destroy();
        this.getNewPage();
    },
    getNewPage: function () {
        clearInterval(this.data.durationIntval);
        let Nowsong = this.data.testsongs[this.data.songindex];
        this.setData({
            song: Nowsong
        });
        this.Initialization();
        this.loadaudio();
    },
    chooseSong: function () {
        let songs = [];
        let song1 = Math.floor(Math.random() * (YanWasFamous.length));
        if (song1 === 6) {
            console.log('yes')
        }
        songs.push(YanWasFamous[song1]);

        let song2 = Math.floor(Math.random() * (Unforgettable.length));
        songs.push(Unforgettable[song2]);

        let song3 = Math.floor(Math.random() * (YanLuoFamous.length));
        songs.push(YanLuoFamous[song3]);

        let song4 = Math.floor(Math.random() * (YanGreatWork.length));
        songs.push(YanGreatWork[song4]);

        let song5 = Math.floor(Math.random() * (YanFamous.length));
        songs.push(YanFamous[song5]);

        let song6 = Math.floor(Math.random() * (OtherCouple).length);
        songs.push(OtherCouple[song6]);

        let song7 = Math.floor(Math.random() * (Unforgettable).length);
        while (song7 === song2) {
            song7 = Math.floor(Math.random() * (Unforgettable).length);
        }
        songs.push(Unforgettable[song7]);

        let song8 = Math.floor(Math.random() * (Unknown).length);
        songs.push(Unknown[song8]);

        let song9 = Math.floor(Math.random() * (YanLuoFamous.length));
        while (song9 === song3) {
            song9 = Math.floor(Math.random() * (YanLuoFamous.length));
        }
        songs.push(YanLuoFamous[song9]);

        let song10 = Math.floor(Math.random() * (YanGreatWork.length));
        while (song10 === song4) {
            song10 = Math.floor(Math.random() * (YanGreatWork.length));
        }
        songs.push(YanGreatWork[song10]);

        let song11 = Math.floor(Math.random() * (YanWasFamous.length));
        while (song11 === song1) {
            song11 = Math.floor(Math.random() * (YanWasFamous.length));
        }
        songs.push(YanWasFamous[song11]);

        this.setData({
            testsongs: songs
        });
    },
    getAnswer: function (e) {
        console.log(e.detail.value)
        this.setData({
            answer: e.detail.value
        })
    },
    checkAnswer: function () {
        console.log(this.data.song.name)
        console.log(this.data.answer)
        this.setData({
            submitted: true
        })
        if (this.data.song.name === '拉文克劳') {
            if (!this.data.answer.includes('拉文克劳') && !this.data.answer.includes('哈利波特'))
                this.setData({
                    wrong: true
                })
        } else if (this.data.song.alias?.length > 0) {
            let answer = this.data.answer.replace(/\s/g, "");
            let answers = this.data.song.alias;
            if (answers.indexOf(answer) < 0)
                this.setData({
                    wrong: true
                })

        } else if (this.data.answer !== this.data.song.name) {
            this.setData({
                wrong: true
            })
        }
        if (this.data.isPlayAudio) {
            this.playAudio();
        }
        if (this.data.wrong) {
            this.recordAnswer();
        } else {
            let newCorrect = this.data.answerRecord.correct + 1;
            this.recordCorrect();
            this.setData({
                ['answerRecord.correct']: newCorrect
            })
        }
        this.answerBgm.play();
    },
    recordType(type) {
        let index = this.data.answerRecord.type.findIndex(one => {
            if (one.name === type) return true;
            else return false;
        })

        let allTypes = this.data.answerRecord.type;
        if (index > -1) {
            allTypes[index].num++;
        } else {
            allTypes.push({
                name: type,
                num: 1
            })
        }
        this.setData({
            ['answerRecord.type']: allTypes
        })
    },
    recordCorrect() {
        if (this.data.songindex === 7 || this.data.song.type.includes('HARD')) //困难
            this.recordType("HARD");
        if (this.data.song.type.includes("SERIES")) //系列；企划
            this.recordType("SERIES");
        if (this.data.song.type.includes("COLLAB")) //联动
            this.recordType("COLLAB");
        if (this.data.song.type.includes('OLD')) //答对老歌
            this.recordType("ROLD");

    },
    recordAnswer() {
        this.data.song.author.forEach(author => {
            let index = this.data.answerRecord.author.findIndex(one => {
                if (one.name === author) return true;
                else return false;
            })
            let allAuthors = this.data.answerRecord.author;
            if (index > -1) {
                allAuthors[index].num++;
            } else {
                allAuthors.push({
                    name: author,
                    num: 1
                })
            }
            this.setData({
                ['answerRecord.author']: allAuthors
            })
        })
        let correctType = ["COLLAB", "SERIES", "HARD"];
        let _this = this;
        this.data.song.type.forEach(type => {
            if (correctType.indexOf(type) > -1) return;
            _this.recordType(type);
        })
    },
    copyUrl() {
        let that = this;
        wx.getClipboardData({
            success(res) {
                wx.setClipboardData({
                    data: that.data.song.address,
                    success(res) {}
                })
            }
        })
    },
    info: function (content) {
        wx.showToast({
            title: content,
            icon: 'success',
            duration: 500,
            mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false
            success: function () {}, //接口调用成功的回调函数
            fail: function () {}, //接口调用失败的回调函数
            complete: function () {} //接口调用结束的回调函数
        })
    },
    //开启提示
    hintOn() {
        this.setData({
            hint: true
        });
    },
    //初始化播放器，获取duration
    Initialization() {
        var t = this;
        this.innerAudioContext = wx.createInnerAudioContext();
        this.answerBgm = wx.createInnerAudioContext();
        if (this.data.song.hint.length != 0) {
            //设置src
            this.innerAudioContext.src = this.data.song.hint;
            this.answerBgm.src = this.data.song.answer;
            //运行一次
            this.innerAudioContext.onCanplay(() => {
                //初始化duration
                setTimeout(function () {
                    //延时获取音频真正的duration
                    var duration = t.innerAudioContext.duration;
                    console.log(duration);
                    var min = parseInt(duration / 60);
                    var sec = parseInt(duration % 60);
                    if (min.toString().length == 1) {
                        min = `0${min}`;
                    }
                    if (sec.toString().length == 1) {
                        sec = `0${sec}`;
                    }
                    t.setData({
                        audioDuration: duration,
                        showTime2: `${min}:${sec}`
                    });
                }, 1000)
            })
        }
    },
    //拖动进度条事件
    sliderChange(e) {
        var that = this;
        this.innerAudioContext.src = this.data.song.hint;
        //获取进度条百分比
        var value = e.detail.value;
        this.setData({
            audioTime: value
        });
        var duration = this.data.audioDuration;
        //根据进度条百分比及歌曲总时间，计算拖动位置的时间
        value = parseInt(value * duration / 100);
        //更改状态
        this.setData({
            audioSeek: value,
            isPlayAudio: true
        });
        //调用seek方法跳转歌曲时间
        this.innerAudioContext.seek(value);
        //播放歌曲
        this.innerAudioContext.play();
    },
    //播放、暂停按钮
    playAudio() {
        //获取播放状态和当前播放时间
        var isPlayAudio = this.data.isPlayAudio;
        var seek = this.data.audioSeek;
        this.innerAudioContext.pause();
        var that = this;
        //更改播放状态
        this.setData({
            isPlayAudio: !isPlayAudio
        })
        if (isPlayAudio) {
            //如果在播放则记录播放的时间seek，暂停
            this.setData({
                audioSeek: that.innerAudioContext.currentTime
            });
        } else {
            //如果在暂停，获取播放时间并继续播放
            this.innerAudioContext.src = this.data.song.hint;
            if (this.innerAudioContext.duration != 0) {
                this.setData({
                    audioDuration: that.innerAudioContext.duration
                });
            }
            //跳转到指定时间播放
            this.innerAudioContext.seek(seek);
            this.innerAudioContext.play();
        }
    },
    inputAnswer() {},
    loadaudio() {
        var that = this;
        //设置一个计步器
        this.data.durationIntval = setInterval(function () {
            //当歌曲在播放时执行
            if (that.data.isPlayAudio == true) {
                //获取歌曲的播放时间，进度百分比
                var seek = that.data.audioSeek;
                var duration = that.innerAudioContext.duration;
                var time = that.data.audioTime;
                time = parseInt(100 * seek / duration);
                //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数

                //当进度条完成，停止播放，并重设播放时间和进度条
                if (time >= 100) {
                    that.innerAudioContext.stop();
                    that.setData({
                        audioSeek: 0,
                        audioTime: 0,
                        audioDuration: duration,
                        isPlayAudio: false
                    });
                    return false;
                }
                //正常播放，更改进度信息，更改播放时间信息
                that.setData({
                    audioSeek: seek + 0.005,
                    audioTime: time,
                    audioDuration: duration,
                });
            }
        }, 5);
    },
    onUnload: function () {
        //卸载页面，清除计步器
        clearInterval(this.data.durationIntval);
    },
})