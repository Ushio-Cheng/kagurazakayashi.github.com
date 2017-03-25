var nyarukoplayer_imgcache = [];
var nyarukoplayer_from = [];
var nyarukoplayer_to = [];
var nyarukoplayer_width = [];
var nyarukoplayer_height = [];
var nyarukoplayer_time = [];
var nyarukoplayer_count = 0;
var nyarukoplayer_loaded = 0;
var nyarukoplayer_now = 0;
function nyarukoplayer_audioinit() {
    var audio = document.getElementById("mp3Btn");
    var audiodiv = $("#audiodiv");
    audio.load();
    audio.pause();
    audiodiv.click(function(){
        event.stopPropagation();
        if(audio.paused)
        {
            audiodiv.css("animation","change 2s linear infinite");
            audio.play();
            return;
        }
        audiodiv.css("animation","none");
        audio.pause();
    });
}
function nyarukoplayer_init(data) {
    console.log("[Yashi NyarukoPlayer] Loading images...");
    nyarukoplayer_count = data.length;
    $.each(data, function(i, items) {
        imgurl = "homepage/nyarukoplayer/"+items[0];
        nyarukoplayer_width[i] = items[1];
        nyarukoplayer_height[i] = items[2];
        nyarukoplayer_from[i] = items[3];
        nyarukoplayer_to[i] = items[4];
        nyarukoplayer_time[i] = items[5];
        nimg = new Image();
        nimg.src = imgurl;
        nimg.onload=function(){
            nyarukoplayer_imgcache[i] = $(this);
            nyarukoplayer_loaded++;
            var progress = nyarukoplayer_loaded / nyarukoplayer_count * 100;
            console.log("Loading... "+nyarukoplayer_loaded+"/"+nyarukoplayer_count+" : "+progress+"%");
            var nyarukoplayerloadingok = $("#nyarukoplayerloadingok");
            nyarukoplayerloadingok.html("载入中 "+progress.toFixed(0)+"%");
            nyarukoplayerloadingok.css("width",progress+"%");
            if (nyarukoplayer_loaded == nyarukoplayer_count) {
                console.log("[yashi nyarukoplayer] Load complete.");
                if ($("#audiodiv") && $("mp3Btn") && $("#nyarukoplayer")) {
                    $("#audiodiv").css("background","url('resources/btn_audio.png') no-repeat");
                    $("#nyarukoplayerloading").remove();
                    if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                        console.log("[yashi nyarukoplayer] 检测到iOS,不自动播放。");
                    } else {
                        $("#audiodiv").css("animation","change 2s linear infinite");
                        document.getElementById("mp3Btn").play();
                    }
                    nyarukoplayer_play();
                } else {
                    console.error("[yashi nyarukoplayer] 没有导入相关div，无法播放。");
                }
            }
        };
        nimg.onerror=function(){
            console.error("加载失败。");
            nyarukoplayer_error();
        };
    });
}
function nyarukoplayer_error() {
    $("#nyarukoplayerloadingok").css({"width":"100%","background-color":"#FF0033","background":"linear-gradient(#FF6666, #FF0033)","text-align":"center"});
    $("#nyarukoplayerloadingok").html("一些资源加载失败，请稍后刷新再试。");
}
function nyarukoplayer_play() {
    var screenwidth = $(window).width();
    var screenheight = $(window).height();
    $("#nyarukoplayer").append('<div class="nyarukodiv"></div>');
    var nyarukodiv = $(".nyarukodiv");
    var nimg = nyarukoplayer_imgcache[nyarukoplayer_now];
    var imgwidth = nyarukoplayer_width[nyarukoplayer_now];
    var imgheight = nyarukoplayer_height[nyarukoplayer_now];
    nyarukodiv.append(nimg);
    var nfrom = nyarukoplayer_from[nyarukoplayer_now];
    var nto = nyarukoplayer_to[nyarukoplayer_now];
    var ntime = nyarukoplayer_time[nyarukoplayer_now] * 1000;
    var nfromcss = nyarukoplayer_frame(nfrom,imgwidth,imgheight,screenwidth,screenheight);
    var ntocss = nyarukoplayer_frame(nto,imgwidth,imgheight,screenwidth,screenheight);
    nyarukodiv.css({"left":nfromcss[0],"top":nfromcss[1],"width":nfromcss[2],"height":nfromcss[3]});
    nyarukodiv.animate({"left":ntocss[0],"top":ntocss[1],"width":ntocss[2],"height":ntocss[3]},ntime,function(){
        console.log("[Yashi NyarukoPlayer] "+(nyarukoplayer_now+1)+"/"+nyarukoplayer_count);
        if (nyarukoplayer_now < nyarukoplayer_count-1) {
            nyarukoplayer_now++;
            nyarukodiv.remove();
            nyarukoplayer_play();
        } else {
            console.log("[yashi nyarukoplayer] End.");
            $("#titlebox").css("background","transparent");
        }
    });
}
function nyarukoplayer_frame(position,imgwidth,imgheight,screenwidth,screenheight) {
    $("#nyarukoplayer").css({"width":screenwidth,"height":screenheight});
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var imgwh = imgwidth / imgheight;
    if (position == "L") { //左
        x = 0;
        w = imgwh * screenheight;
        if(w < screenwidth){1
            w = screenwidth;
        }
        h = w/imgwh;
        y = (screenheight - h)/2;
    } else if (position == "R") { //右
        w = imgwh * screenheight;
        if(w < screenwidth){
            w = screenwidth;
        }
        x = screenwidth - w;
        h = w/imgwh;
        y = (screenheight - h)/2;
    } else if (position == "U") { //上
        y = 0;
        h = screenwidth/imgwh;
        if(h < screenheight){
            h = screenheight;
        }
        w = h*imgwh;
        x = (screenwidth - w)/2;
    } else if (position == "D") { //下
        h = screenwidth/imgwh;
        if(h < screenheight){
            h = screenheight;
        }
        w = h*imgwh;
        y = screenheight - h;
        x = (screenwidth - w)/2;
    } else if (position == "C") { //中
        var ccss = nyarukoplayer_imgcenter(imgwidth,imgheight,screenwidth,screenheight);
        x = ccss[0];
        y = ccss[1];
        w = ccss[2];
        h = ccss[3];
    } else if (position == "B") { //大
        var cw = screenwidth - imgwidth;
        var ch = screenheight - imgheight;
        if(cw > ch){
            w = screenwidth*1.2;
            h = w/imgwh;
            x = (screenwidth - w)/2;
            y = (screenheight - h)/2;
        }else{
            h = screenheight*1.2;
            w = h*imgwh;
            x = (screenwidth - w)/2;
            y = (screenheight - h)/2;
        }
    }
    console.log(x+","+y+","+w+","+h+","+imgwh);
    return [x,y,w,h];
}
function nyarukoplayer_resizeendimg() {
    var screenwidth = $(window).width();
    var screenheight = $(window).height();
    var imgwidth = nyarukoplayer_width[nyarukoplayer_now];
    var imgheight = nyarukoplayer_height[nyarukoplayer_now];
    var ccss = nyarukoplayer_imgcenter(imgwidth,imgheight,screenwidth,screenheight);
    x = ccss[0];
    y = ccss[1];
    w = ccss[2];
    h = ccss[3];
    // console.log(cw+","+ch+","+screenwidth+","+imgwidth+","+screenheight+","+imgheight+","+imgwh+","+(cw/ch));
    $(".nyarukodiv").css({"left":x,"top":y,"width":w,"height":h});
}
function nyarukoplayer_imgcenter(imgwidth,imgheight,screenwidth,screenheight) {
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var imgwh = imgwidth / imgheight;
    var cw = screenwidth - imgwidth;
    var ch = screenheight - imgheight;
    var cwh = cw / ch;
    if (cw > ch) {
        w = screenwidth;
        h = w/imgwh;
        y = (screenheight - h) / 2;
    }else{
        h = screenheight;
        w = h*imgwh;
        x = (screenwidth - w) / 2;
    }
    if (imgwh > 1) {
        if(cwh > 1.01 && cwh < imgwh){
            if(cw < ch){
                w = screenwidth;
                h = w/imgwh;
                y = (screenheight - h) / 2;
                x = 0;
            }else{
                h = screenheight;
                w = h*imgwh;
                x = (screenwidth - w) / 2;
                y = 0;
            }
        }
    } else {
        if(cwh > imgwh && cwh < 1){
            if(cw < ch){
                w = screenwidth;
                h = w/imgwh;
                y = (screenheight - h) / 2;
                x = 0;
            }else{
                h = screenheight;
                w = h*imgwh;
                x = (screenwidth - w) / 2;
                y = 0;
            }
        }
    }
    return [x,y,w,h];
}