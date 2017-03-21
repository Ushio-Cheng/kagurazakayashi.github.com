var nyarukoplayer_imgcache = [];
var nyarukoplayer_from = [];
var nyarukoplayer_to = [];
var nyarukoplayer_width = [];
var nyarukoplayer_height = [];
var nyarukoplayer_time = [];
var nyarukoplayer_count = 0;
var nyarukoplayer_loaded = 0;
var nyarukoplayer_now = 0;
function nyarukoplayer_init(data) {
    console.log("Yashi NyarukoPlayer");
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
            console.log("图片已加载 "+nyarukoplayer_loaded+"/"+nyarukoplayer_count);
            if (nyarukoplayer_loaded == nyarukoplayer_count) {
                console.log("加载完成。");
                nyarukoplayer_play();
            }
        };
        nimg.onerror=function(){
            console.error("加载失败。");
        };
    });
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
    var ntime = nyarukoplayer_time[nyarukoplayer_now];
    var nfromcss = nyarukoplayer_frame("D",imgwidth,imgheight,screenwidth,screenheight);
    nyarukodiv.css({"left":nfromcss[0],"top":nfromcss[1],"width":nfromcss[2],"height":nfromcss[3]});
}
function nyarukoplayer_frame(position,imgwidth,imgheight,screenwidth,screenheight) {
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var imgwh = imgwidth / imgheight;
    if (position == "L") { //左
        x = 0;
        w = imgwh * screenheight;
        if(w < screenwidth){
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
    }
    console.log(x+","+y+","+w+","+h);
    return [x,y,w,h];
}