$(document).ready(function(){
    nyarukoplayer_audioinit();
    try {
        $.ajaxSetup({
            error: function (x, e) {
                console.error("数据加载失败: "+e);
                nyarukoplayer_error();
                return false;
            }
        });
        $.getJSON("homepage/nyarukoplayer/nyaruko.json",function(responseTxt,statusTxt,xhr,data){
            if(statusTxt == "error") {
                console.error("数据加载失败: "+xhr.status+": "+xhr.statusText);
                nyarukoplayer_error();
            }
            if(statusTxt == "success") {
                var items = xhr.responseJSON;
                datdatacount = items.length;
                console.log("数据 "+datdatacount+": "+xhr.status+": "+xhr.statusText);
                console.log(responseTxt);
                nyarukoplayer_init(items);
            }
        });
        $("#showprivacy").click(function(){
            showprivacy();
        });
    } catch (ex) {
        console.error("数据加载失败: "+ex);
        nyarukoplayer_error();
    }
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