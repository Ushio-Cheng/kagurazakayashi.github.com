$(document).ready(function(){
    $.getJSON("linkpage/yashilink.json",function(responseTxt,statusTxt,xhr,data){
        $(".spinner").remove();
        if(statusTxt == "success") {
            var items = xhr.responseJSON;
            datdatacount = items.length;
            console.log("数据 "+datdatacount+": "+xhr.status+": "+xhr.statusText);
            console.log(responseTxt);
            $("#d2").html(responseTxt);
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