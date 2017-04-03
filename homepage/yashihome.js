var timer_subtitle = null;
var timer_subtitles = "KagurazakaYashi's Blog";
var timer_subtitlei = 0;
$(document).ready(function(){
    nyarukoplayer_init("homepage/nyarukoplayer/nyaruko.json",true);
    $("#showprivacy").click(function(){
        showprivacy();
    });
    // $("#disablemedia").click(function(){
    //     disablemedia();
    // });
    //nyarukoplayer callback:
    nyarukoplayerCallback_AnimateEnd = function() {
        $("#titlebox").css("background","transparent");
    }
    timer_subtitle_start();
});
$(window).resize(function() {
    nyarukoplayer_resizeendimg();
});
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
    timer_subtitle = setInterval(function(){  
        $("#subtitle").append(timer_subtitles.charAt(timer_subtitlei));  
        if(timer_subtitlei ++ === timer_subtitles.length){  
            clearInterval(timer_subtitle);
            timer_subtitlei = 0;
            //timer_subtitle_start();
        }
    },100);
}