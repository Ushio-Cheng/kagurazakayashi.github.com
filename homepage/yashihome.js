$(document).ready(function(){
    nyarukoplayer_audioinit();
    $.getJSON("homepage/nyarukoplayer/nyaruko.json",function(responseTxt,statusTxt,xhr,data){
        if(statusTxt == "success") {
            var items = xhr.responseJSON;
            datdatacount = items.length;
            console.log("数据 "+datdatacount+": "+xhr.status+": "+xhr.statusText);
            console.log(responseTxt);
            nyarukoplayer_init(items);
        }
        if(statusTxt == "error") {
            $("#nyarukoplayer").html("<center><h1>数据加载失败，请稍后刷新再试。</h1></center>");
            console.error("数据加载失败: "+xhr.status+": "+xhr.statusText);
        }
    });
});
$(window).resize(function() {
    nyarukoplayer_resizeendimg();
});