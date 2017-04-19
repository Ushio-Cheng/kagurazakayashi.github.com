$(document).ready(function(){
    $.getJSON("linkpage/yashilink.json",function(responseTxt,statusTxt,xhr,data){
        $(".spinner").remove();
        if(statusTxt == "success") {
            var items = xhr.responseJSON;
            datdatacount = items.length;
            console.log("数据 "+datdatacount+": "+xhr.status+": "+xhr.statusText);
            console.log(responseTxt);
            loaddata(items);
            $("#d2").prepend('<div id="yashiplanetbtn">☆ 点此加载内容聚合 ☆</div>');
            $('body,html').scrollTop = 0;
            window.location = "#top";
            $(".tbtn").click(function() {
                window.location = $(this).attr("href");
            });
            $("#yashiplanetbtn").click(function() {
                loadplanet();
            });
        }
        if(statusTxt == "error") {
            $("#contents").html("<center><h1>数据加载失败，请稍后刷新再试。</h1></center>");
            console.error("数据加载失败: "+xhr.status+": "+xhr.statusText);
        }
    });
    switchtab();
    $("#showprivacy").click(function(){
        showprivacy();
    });
});
function loaddata(data) {
    var contents = $("#contents");
    var chtml = "";
    $.each(data, function(i, items) {
        chtml = chtml+'<div id="webview'+i+'" class="webview" style="background-image:url(linkpage/sitepic/'+items[4]+'.jpeg)"><div id="urlinfo'+i+'" class="urlinfo" style="opacity:0">'+items[2]+'</div><div class="infobtnbg"><div id="infobtn'+i+'" class="infobtn"><a href="'+items[3]+'">ⓘ</a></div></div><div class="webinfo"><h1>'+items[0]+'</h1><h2>'+items[1]+'</h2><h3>'+items[5]+'</h3></div></div>';
    });
    $("#contents").html(chtml);
    $.each(data, function(i, items) {
        var webview = $("#webview"+i);
        webview.click(function() {
            window.location = items[2];
        });
        webview.hover(
            function () {
                $("#urlinfo"+i).animate({
                    "opacity":1
                });
            },
            function () {
                $("#urlinfo"+i).animate({
                    "opacity":0
                });
            }
        );
        var infobtn = $("#infobtn"+i);
        infobtn.click(function() {
            window.location = items[3];
        });
    });
    ceramictiles_setting["datacount"] = data.length;
    resize(false);
    setTimeout(function() {
        resize(true);
    },100);
}
function loadplanet() {
    if ($(window).height() > $(window).width()) {
        if (confirm('雅诗提醒：可能会产生较多的流量，继续吗？')) {
            loadplanet2();
        }
    } else {
        loadplanet2();
    }
}
function loadplanet2() {
    var yashiplanetbtn = $("#yashiplanetbtn");
    yashiplanetbtn.css("pointer-events","none");
    yashiplanetbtn.css("background-color","#808080");
    yashiplanetbtn.html("正在加载内容聚合……");
    $("#yashiplanet").load("linkpage/planet/index.html",function(responseTxt,statusTxt,xhr,data) {
        if(statusTxt == "success") {
            $("#yashiplanet").prepend('<div id="d2titlebar"></div>');
            $("#yashiplanetbtn").remove();
            $('body,html').scrollTop = $("#d2").top;
        } else if(statusTxt == "error") {
            $("#yashiplanetbtn").html("内容聚合加载失败,点击重试");
            console.error("聚合加载失败: "+xhr.status+": "+xhr.statusText);
            yashiplanetbtn.css("pointer-events","auto");
            yashiplanetbtn.css("background-color","#ffbcde");
        }
    });
}
function resize(ani=false) {
    var contentsframe = ceramictiles_resize_old(ani);
    $("#d2").css("top",contentsframe[1]+300);
}
function resize_old(ani) {
    var screenwidth = $(window).width();
    var cw = 20;
    var ch = 20;
    var y = ch;
    var w = 320;
    var h = 400;
    var e = 0;
    var tw = -1;
    if (screenwidth <= (w + cw * 4)) {
        cw = 0;
        // w = screenwidth;
        console.log("应用手机版式。"+screenwidth);
    }
    for (var i=0;i<datdatacount;i++) {
        x = cw + (w + cw) * i - e;
        if (x > screenwidth - (w + cw) - cw) {
            if (tw == -1) {
                tw = cw + (w + cw) * i;
            }
            e += x - cw;
            x = cw;
            y += (h + ch);
        }
        var webview = $("#webview"+i);
        if (ani == false) {
            webview.css("top",y);
            webview.css("left",x);
        } else {
            webview.animate({
                top:y,
                left:x
            });
        }
    }
    y += (h + ch);
    var contents = $("#contents");
    contents.css("left",screenwidth/2-tw/2-cw/2);
    contents.css("width",tw);
    contents.css("height",y);
    $("#d2").css("top",y+300);
}
$(window).scroll(function () {
    var scrtop = $(window).scrollTop();
    if (scrtop >= 250) {
        $("#bannerr").css("visibility","hidden");
    } else {
        $("#bannerr").css("visibility","visible");
    }
    if (scrtop >= 140) {
        $("#bannerl").css("visibility","hidden");
    } else {
        $("#bannerl").css("visibility","visible");
    }
    switchtab(scrtop);
});
$(window).resize(function() {
    resize(true);
});
function switchtab(scrtop = 0) {
    var youlian = $("#tbtn1");
    var juhe = $("#tbtn2");
    if (scrtop >= ($("#d2").offset().top-60)) {
        juhe.css("border-bottom","4px solid #FE99CC");
        youlian.css("border-bottom","none");
    } else {
        juhe.css("border-bottom","none");
        youlian.css("border-bottom","4px solid #FE99CC");
    }
}
function showprivacy() {
    if ($(".yashiprivacy").length == 0) {
        $("body").append("<div class='yashiprivacy'></div>");
        $(".yashiprivacy").load('privacy.html .yashiprivacyw');
    }
}