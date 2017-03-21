$(document).ready(function(){
    var audio = document.getElementById("mp3Btn");
    var audiodiv = $("#audiodiv");
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