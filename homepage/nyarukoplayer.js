/* Yashi NyarukoPlayer 
                   ,;;77;
                 ...     7
            .;;;,       7D
          .7;.          S
         ::           ;3;.,.
       ..        ..;:;T;,;;;;, :.
      :.       ,,,77TJ:,::;:;: .,,.               .
     :        JY.;;Y;;:::;;;.  ..:;.             ..
    :        Jh;.:J;.,7:;;:   ..:,;;            ...
   :.       .3J7,7;.,:;;.:,::;..;;:;:           ::
  .,        cT;;JY;.:;:7,;7:;;;.;;:;;         ..:;...
  :        .C;7vU17.:7;Y:777;:7,:7::;.     ..:..:. ..,.
  .       . YJU77;Y,7c7;Y:..c;Y:;J;.;.    : .:,.:..   7::
            xhTT7C97v7,.TTGZv7v:YJ7;;;       ..;:::. .7; ;
,          .7xuH7 @7.   .7@@c;,;E77777;      .:,,.,;7;v, ,
:            :H1T  .      7: ..;7Tc7777v777Ic,:: 7;, ;7 .:
;             EYh           ,.7vGhh3c7;;;;7;..: ,;.,TT;.,
,            T7:CT.  ;;;   ::I@@R37UC3c77v: .,  ;::7;.:
:           :J .UUT;;  .  uH;@b    .7I1SS. .,. 7T77;.
;          .7  7IY ;@@BH:@B.@R   .:T.  .. ... :CJcJc7;:::.
.     .   .;.  v;.  @@BJYR Y@c .:.Z;  . .... .T7vcITTcc;;;7
          ;        :Z;;T;,:@Bu..;;JY      ...Tv;,  .;YUI7;;c
  IYYcvc;::  .;;. ;H,:TT:.J3@B, :. ;.:7;77YYIvJv7;.   ,.:;;;.
 .b  .,:v;:;::GE7cZuc;bR.7 ;b@U  :. ,YcYJJTJ;cYcJYcv.     77.
 :Y    ;.     ;  777;1@;:Y77u@b  : ;bHG7;;;;  .7TJ77Y;. .  c:
  .   ;c      ;: 37:@@b.ZSx7;@@D.  YY  ,.,,;7;  .777;77;   7;
     .;;       7 ;, ;cx,@YJ ;;CB@H.;Zv7IHUGZ;77    ;7;777  ;;
     ;..;      ,;      ;RT.,c.ZG6B6bB@@@bB@GU777    ;Y;77: ;
     ;: v;.     .:,   :: G1U@@BEb7x@6h0b9GDC, :;7    ;;,cc;
      ;  ..       .:,,;; ;@@bbb@bB1YDDHbRBB6T  ;v;    ; ;;7
      .,             E@.b@B6R9b@Y7;,uRE6bBBb@@@REbh  .. ; 7.
                   :;@@,;@b99Rb@;  .:@60bb;   .  T@3    7 7.
                ... 0;bT Yb696@RU;..ERGubb7c      S7   ;, :
             .,,     7BB;7669b;  ;T;UR3SR@.TTb    ;.   .
            ,.       .;Y@3Bb9DUvhB@CG096@J ;U7   ..
           .        .  7J.@bRbBBbR@@@Rb@ 7:YU@
         .:     ..;;;;;:;vI;@HBBBDb@xR@.:U 6;T
        :;,..:;;;;:::...   .E;u07@S7TC,;B.76
        .;;;;;;.  .        3@    x7 RI YR
           .               G:      :
                                  .;  .
                                  .;...
                                   ;; .
                                   ;:.
                                   ;:.
                                  ::
                                 ;;;
                                ;;;;
                              ,;:7:
                              RS7
                https://www.yoooooooooo.com/yashi/
*/
//PUBLIC: 以下变量根据需要调整
//初始歌词语言
var nyarukoplayer_cnlrc = true;
//歌词偏移时间
var nyarukoplayer_lrctime = 1;
//标题栏歌词
var nyarukoplayer_titlelrc = false;
//在控制台输出信息
var nyarukoplayer_consolelog = false;
//主图片扩展名
var nyarukoplayer_imgtype = "jpg";
//WEBP支持
var nyarukoplayer_webp = true;
//图片路径,支持相对绝对URL路径
var nyarukoplayer_imgdir = "https://www.yoooooooooo.com/yashi/homepage/nyarukoplayer/";
//音乐按钮图片路径
var nyarukoplayer_musicbtnimg = "https://www.yoooooooooo.com/yashi/resources/btn_audio.png";
//配置文件路径,需要在外部自行下载,使用 nyarukoplayer_init(JSON) 导入.
var nyarukoplayer_conffile = "https://www.yoooooooooo.com/yashi/homepage/nyarukoplayer/nyaruko.json";
//歌词文件路径,需要在外部自行下载,使用 nyarukoplayer_audioinit(TEXT) 导入.
var nyarukoplayer_lrcfile = "https://www.yoooooooooo.com/yashi/homepage/nyarukoplayer/nyaruko.lrc";
//音频文件路径
var nyarukoplayer_musicfile = "https://www.yoooooooooo.com/yashi/homepage/nyarukoplayer/nyaruko.mp3";

//PRIVATE:
var nyarukoplayer_imgcache = [];
var nyarukoplayer_from = [];
var nyarukoplayer_to = [];
var nyarukoplayer_width = [];
var nyarukoplayer_height = [];
var nyarukoplayer_time = [];
var nyarukoplayer_count = 0;
var nyarukoplayer_loaded = 0;
var nyarukoplayer_now = 0;
var nyarukoplayer_lrc = null;
var nyarukoplayer_webpok = false;
function nyarukoplayer_init(data) {
    console.log("[nyarukoplayer.js] Powered by KagurazakaYashi");
    var brow = nyarukoplayer_browserok();
    if (brow != null) {
        nyarukoplayer_error(brow);
        return;
    }
    nyarukoplayer_webpok = nyarukoplayer_checkWebpSupport();
    if ($.cookie("disable") == "true") {
        console.warn("[Yashi NyarukoPlayer] Disabled by user.");
        $("#nyarukoplayer_loading").remove();
        $("#titlebox").css("background","transparent");
        return;
    }
    nyarukoplayer_count = data.length;
    if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] Config Load complete.");
    if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] Loading images...");
    $.each(data, function(i, items) {
        if (nyarukoplayer_webp && nyarukoplayer_webpok) {
            nyarukoplayer_imgtype = "webp";
        }
        imgurl = nyarukoplayer_imgdir+items[0]+"."+nyarukoplayer_imgtype;
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
            if (nyarukoplayer_consolelog) console.log("Loading... "+nyarukoplayer_loaded+"/"+nyarukoplayer_count+" : "+progress+"%");
            var nyarukoplayer_loadingok = $("#nyarukoplayer_loadingok");
            nyarukoplayer_loadingok.html("载入中 "+progress.toFixed(0)+"%");
            nyarukoplayer_loadingok.css("width",progress+"%");
            if (nyarukoplayer_loaded == nyarukoplayer_count) {
                if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] Load complete.");
                if ($("#nyarukoplayer_audiodiv").length != 0 && $("#nyarukoplayer_musiccontrol") != 0) {
                    $("#nyarukoplayer_audiodiv").css("background","url('"+nyarukoplayer_musicbtnimg+"') no-repeat");
                    //仅手机提示是否播放音乐
                    // if (jQuery.browser.mobile) {
                    //     nyarukoplayer_musicdiglog_open();
                    // } else {
                    //     nyarukoplayer_playmusic(true);
                    //     nyarukoplayer_ready();
                    // }
                    //全部提示
                    nyarukoplayer_musicdiglog_open();
                } else {
                    console.error("[Yashi NyarukoPlayer] 没有导入相关div或 播放地区/语言限制，无法播放音频。");
                    nyarukoplayer_ready();
                }
            }
        };
        nimg.onerror=function(){
            console.error("加载失败。");
            nyarukoplayer_error("一些资源加载失败，请稍后刷新再试。");
        };
    });
}
function nyarukoplayer_ready() {
    $("#nyarukoplayer_loading").remove();
    if ($("#nyarukoplayer") != 0) {
        nyarukoplayer_play();
    } else {
        console.error("[Yashi NyarukoPlayer] 没有导入相关div，无法播放动画。");
        $("#titlebox").css("background","transparent");
    }
}
function nyarukoplayer_playmusic(play) {
    if (play) {
        $("#nyarukoplayer_audiodiv").css("animation","change 2s linear infinite");
        document.getElementById("nyarukoplayer_musiccontrol").play();
    } else {
        $("#nyarukoplayer_audiodiv").css("animation","none");
        document.getElementById("nyarukoplayer_musiccontrol").pause();
    }
}
function nyarukoplayer_error(msg) {
    $("#nyarukoplayer_loadingok").css({"width":"100%","background-color":"#FF0033","background":"linear-gradient(#FF6666, #FF0033)","text-align":"center"});
    $("#nyarukoplayer_loadingok").html(msg);
    $("#titlebox").css("background","transparent");
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
        if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] "+(nyarukoplayer_now+1)+"/"+nyarukoplayer_count);
        if (nyarukoplayer_now < nyarukoplayer_count-1) {
            nyarukoplayer_now++;
            nyarukodiv.remove();
            nyarukoplayer_play();
        } else {
            if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] Animate End.");
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
    if (nyarukoplayer_consolelog) console.log(x+","+y+","+w+","+h+","+imgwh);
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
    // if (nyarukoplayer_consolelog) console.log(cw+","+ch+","+screenwidth+","+imgwidth+","+screenheight+","+imgheight+","+imgwh+","+(cw/ch));
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
function nyarukoplayer_audioinit(lrc) {
    if ($.cookie("disable") == "true") {
        if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] Disabled by user.");
        return;
    }
    var lang = navigator.language.substr(0,2);
    if (lang == "ja" && $.cookie('nochkarea') != 'true') { //可设定：内容限制
        console.warn("[Yashi NyarukoPlayer] このページはお住まいの地域からご利用になれません Cannot use this page from the area to live");
        $("#nyarukoplayer_audiodiv").remove();
        return;
    }
    $("#nyarukoplayer_musiccontrol").html('<source src="'+nyarukoplayer_musicfile+'" />');
    var audio = document.getElementById("nyarukoplayer_musiccontrol");
    var audiodiv = $("#nyarukoplayer_audiodiv");
    audio.load();
    audio.pause();
    audiodiv.click(function(){
        event.stopPropagation();
        if(audio.paused)
        {
            nyarukoplayer_playmusic(true);
            return;
        }
        nyarukoplayer_playmusic(false);
        $("#nyarukoplayer_lrc").html("");
    });
    if (lrc) {
        var lines = lrc.split('\n');
        var pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
        var result = [];
        while (!pattern.test(lines[0])) {    
            lineslines = lines.slice(1);
        };
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function(v, i, a) {
            var time = v.match(pattern);
            var value = v.replace(pattern, '');
            time.forEach(function(v1, i1, a1) {
                var t = v1.slice(1, -1).split(':');
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
            });
        });
        // result.sort(function(a, b) {
        //     nyarukoplayer_lrc = a[0] - b[0];
        // });
        // nyarukoplayer_lrc = result;
        var mi = 0;
        var mlen = result.length;
        var mj, md;
        for (; mi < mlen; mi++) {
            for (mj = 0; mj < mlen; mj++) {
                if (result[mi][0] < result[mj][0]) {
                    md = result[mj];
                    result[mj] = result[mi];
                    result[mi] = md;
                }
            }
        }
        nyarukoplayer_lrc = [];
        for(var i = 0; i < result.length; i++){
            var lang = result[i][1];
            if (lang == "") {
                lang = ["　","　"];
            } else {
                lang = lang.split('|');
            }
            //if (nyarukoplayer_consolelog) console.log(result[i][0]+" : "+result[i][1]);
            nyarukoplayer_lrc[i] = [result[i][0]+nyarukoplayer_lrctime,lang[0],lang[1]];
            // li=$('<li>'+nyarukoplayer_lrc[i][1]+'</li>');
            // $('#gc ul').append(li);
        }
        audio.ontimeupdate = function() {
            for (var i = 0, l = nyarukoplayer_lrc.length; i < l; i++) {
                if (this.currentTime > nyarukoplayer_lrc[i][0]) {
                    //$("#nyarukoplayer_lrc").html(this.currentTime+">"+nyarukoplayer_lrc[i][0]);
                    var nowlrc = "";
                    if (nyarukoplayer_cnlrc) {
                        nowlrc = nyarukoplayer_lrc[i][2];
                    } else {
                        nowlrc = nyarukoplayer_lrc[i][1];
                    }
                    if (nowlrc == "END") {
                        nyarukoplayer_musicend = true;
                        nowlrc = "";
                        if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] LRC End.");
                    }
                    if ($("#nyarukoplayer_lrc").html() != nowlrc) {
                        var lrcdiv = $("#nyarukoplayer_lrc");
                        // lrcdiv.css("alpha",0);
                        // lrcdiv.animate({"alpha":1},0.5,function(){
                        // });
                        lrcdiv.html(nowlrc);
                        if (nyarukoplayer_titlelrc) {
                            document.title = "♪" + nowlrc;
                        }
                        //lrcdiv.html("["+this.currentTime+"]["+nyarukoplayer_lrc[i][0]+"]["+i+"]"+nowlrc);
                    }
                }
            }
        }
        $("#nyarukoplayer_lrc").click(function(){
            nyarukoplayer_cnlrc = !nyarukoplayer_cnlrc;
            if (nyarukoplayer_cnlrc) {
                $(this).html("(切换为中文歌词...)");
            } else {
                $(this).html("(切换为原版歌词...)");
            }
        });
        if (nyarukoplayer_consolelog) console.log("[Yashi NyarukoPlayer] LRC Load complete.");
    }
}
function nyarukoplayer_nochkarea(val = false) {
    $.cookie('nochkarea', val, { expires: 365 });
    location.reload(false);
}
function nyarukoplayer_disable(val = false) {
    $.cookie('disable', val, { expires: 365 });
    location.reload(false);
}
function nyarukoplayer_musicdiglog_open() {
    if ($.cookie('playmusic') == "1") {
        nyarukoplayer_playmusic(true);
        $("#nyarukoplayer_musicdiglog").remove();
        nyarukoplayer_ready();
    } else if ($.cookie('playmusic') == "2") {
        $("#nyarukoplayer_musicdiglog").remove();
        nyarukoplayer_ready();
    } else {
        $("body").append('<div id="nyarukoplayer_musicdiglog"><h1>要开启背景音乐吗？</h1><p><a id="nyarukoplayer_musicdiglog_yes">播放(推荐)</a></p><p><a id="nyarukoplayer_musicdiglog_no">不要播放</a></p><p><input type="checkbox" id="nyarukoplayer_musicdiglog_save" value="1" checked="checked" />今日不再询问</p></div>');
        $("#nyarukoplayer_musicdiglog_yes").click(function(){
            if ($("#nyarukoplayer_musicdiglog_save").prop("checked")) {
                $.cookie('playmusic', "1", { expires: 1 });
            }
            nyarukoplayer_playmusic(true);
            $("#nyarukoplayer_musicdiglog").remove();
            nyarukoplayer_ready();
        });
        $("#nyarukoplayer_musicdiglog_no").click(function(){
            if ($("#nyarukoplayer_musicdiglog_save").prop("checked")) {
                $.cookie('playmusic', "2", { expires: 1 });
            }
            $("#nyarukoplayer_musicdiglog").remove();
            nyarukoplayer_ready();
        });
    }
}
function nyarukoplayer_checkWebpSupport() {
    const canvas = document.createElement('canvas');
    if (Boolean(canvas.getContext && canvas.getContext('2d'))) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
}
function nyarukoplayer_browserok() {
    var brow = navigator.userAgent.toLowerCase();
    var bInfo="";
    if(/msie/.test(brow)){bInfo="IE";}
    if(/firefox/.test(brow)){bInfo="Firefox";}
    if(/opera/.test(brow)){bInfo="Opera";}
    if (bInfo=="") {return null;}
    return "抱歉,暂不支持"+bInfo+",建议使用最新版Chrome。";
}