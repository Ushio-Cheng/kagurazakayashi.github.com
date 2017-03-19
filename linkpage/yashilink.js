$(document).ready(function(){
    $.getJSON("linkpage/yashilink.json",function(responseTxt,statusTxt,xhr,data){
        $(".spinner").remove();
        if(statusTxt == "success") {
            var items = xhr.responseJSON;
            datdatacount = items.length;
            console.log("数据 "+datdatacount+": "+xhr.status+": "+xhr.statusText);
            console.log(responseTxt);
            loaddata(items);
            $('body,html').scrollTop = 0;
        }
        if(statusTxt == "error") {
            $("#contents").html("<center><h1>数据加载失败，请稍后刷新再试。</h1></center>");
            console.error("数据加载失败: "+xhr.status+": "+xhr.statusText);
        }
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
    resize(true);
}
function resize(ani) {
}
$(window).scroll(function() {
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
});
$(window).resize(function() {
    resize(true);
});