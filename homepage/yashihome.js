var timer_subtitle = null;
var timer_subtitles = "KagurazakaYashi's Blog";
var timer_subtitlei = 0;
$(document).ready(function(){
    loadnyarukoplayer();
    loadaboutme();
});
function loadnyarukoplayer() {
    nyarukoplayer_init("homepage/nyarukoplayer/nyaruko.json",true);
    $("#showprivacy").click(function(){
        showprivacy();
    });
    // $("#disablemedia").click(function(){
    //     disablemedia();
    // });
    //nyarukoplayer callback:
    nyarukoplayerCallback_AnimateStart = function() {
        $("#titlebox").css("background","linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))");
    }
    nyarukoplayerCallback_AnimateEnd = function() {
        $("#titlebox").css("background","transparent");
    }
    nyarukoplayerCallback_AnimateReady = function(autoplay) {
        // if (autoplay == false) {
        //     nyarukoplayer_playnow();
        // }
    }
    timer_subtitle_start();
}
function loadaboutme() {
    $('#yashipage').fullpage({
        navigationTooltips: [
            '生活(博客)',
            '梦想(作品)',
            '感恩(开源)',
            '欢乐(游戏)',
            '二维(动漫)',
            '绮丽(换装)',
            '友情(友链)',
            '神楽(来源)',
            '个性(性格)',
            '神楽坂雅詩'
        ],
        navigation: true,
        navigationColor: "#FE99CC",
        scrollingSpeed: 700,
        slidesNavigation: false,
        controlArrowColor: "transparent",
        afterLoad: function(anchorLink,index) {
            //console.log("afterLoad=",index,", anchorLink=",anchorLink);
            var h1 = $("#section"+index+" h1");
            var h2 = $("#section"+index+" .sub");
            h1.fadeIn(500,function() {
                h2.fadeIn(500,null);
            });
        },
        onLeave: function(index,direction) {
            //console.log("onLeave=",index,", direction=",direction);
            var h1 = $("#section"+index+" h1");
            var h2 = $("#section"+index+" .sub");
            h1.css("display","none");
            h2.css("display","none");
        }
    });
}
function unloadaboutme() {
    $('#yashipage').unbind();
    $('#fp-nav').remove();
    $('#closeyashipage').remove();
    nyarukoplayer_playnow();
    $('#yashipage').animate({
        "left":"200%"
    },1000,function () {
        $('#yashipage').remove();
    });
}
function showprivacy() {
    if ($(".yashiprivacy").length == 0) {
        $("body").append("<div class='yashiprivacy'></div>");
        $(".yashiprivacy").load('privacy.html .yashiprivacyw');
    }
}
function disablemedia() {
    if ($.cookie("disable") == "true") {
        nyarukoplayer_disable(false);
    } else {
        nyarukoplayer_disable(true);
    }
}
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        nyarukoplayer_titlelrc = true;
    } else  {
        nyarukoplayer_titlelrc = false;
        document.title = "神楽坂雅詩的个人网站 - 神楽坂雅詩的小世界";
    }
}, false);
function timer_subtitle_start(){  
    $("#subtitle").text('');
    $("#titlebox").unbind("click");
    timer_subtitle = setInterval(function(){  
        $("#subtitle").append(timer_subtitles.charAt(timer_subtitlei));  
        if(timer_subtitlei ++ === timer_subtitles.length){  
            clearInterval(timer_subtitle);
            timer_subtitlei = 0;
            $("#titlebox").click(function(){
                timer_subtitle_start();
            });
            timer_subtitle = null;
        }
    },100);
}