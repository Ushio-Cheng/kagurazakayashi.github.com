var yashiminer_info = document.getElementById('yashiminer_info');
var yashiminer_meterpic = document.getElementsByClassName('yashiminer_meterpic');
var yashiminer_meterinfo = document.getElementsByClassName('yashiminer_meterinfo');
var yashiminer_l1 = document.getElementById("yashiminer_l1");
var yashiminer_pici = 0;
var yashiminer_threadnum = 0;
var yashiminer_picani = 0;
var yashiminer_timer1 = null;
var yashiminer_timer2 = null;
var yashiminer_maxcore = 8;
var yashiminer_speed = 0;
var yashiminer_first = true;
var yashiminer = new ProjectPoi.Anonymous('xmpeJCiUaokkp3a9pkAfjxsO');
// Listen on events
yashiminer.on('found', function() { /* Hash found */ })
yashiminer.on('accepted', function() { /* Hash accepted by the pool */ })
yashiminer_timer1 = setInterval(function() {
    var hashesPerSecond = yashiminer.getHashesPerSecond();
    var totalHashes = yashiminer.getTotalHashes();
    var acceptedHashes = yashiminer.getAcceptedHashes();
    yashiminer_setmeterinfo('<div class="yashiminer_meterinfocell" id="yashiminer_meterinfo1">秒速&emsp;<br/>总计&emsp;<br/>接受&emsp;</div><div class="yashiminer_meterinfocell" id="yashiminer_meterinfo2">'+hashesPerSecond.toFixed(2)+'<br/>'+totalHashes+'<br/>'+acceptedHashes+'</div>');
    var shownum = hashesPerSecond * 5;
    if (shownum > 128) {
        shownum = 128;
    }
    yashiminer_l1.style.transform = "rotate("+shownum+"deg)";
}, 1000);
function yashiminer_picin() {
    yashiminer_pici++;
    if (yashiminer_pici > 2) {
        yashiminer_pici = 0;
    }
    var ny = 142 * yashiminer_pici;
    for (let i = 0; i < yashiminer_meterpic.length; i++) {
        if (yashiminer_meterpic[i].style.display != "none") {
            yashiminer_meterpic[i].style.backgroundPositionY = "-"+ny+"px";
        }
    }
}
function yashiminer_setthread(isadd) {
    var oldthreadnum = yashiminer_threadnum;
    if (isadd) {
        if (yashiminer_threadnum < yashiminer_maxcore) {
            yashiminer_threadnum++;
        }
    } else {
        if (yashiminer_threadnum > 0) {
            yashiminer_threadnum--;
        }
    }
    if (oldthreadnum != yashiminer_threadnum) {
        document.getElementById("yashiminer_thread").innerText = yashiminer_threadnum;
        if (yashiminer_threadnum > 0) {
            if (oldthreadnum == 0 && !yashiminer.isRunning()) {
                yashiminer_setmeterinfo('<div class="yashiminer_meterinfocell">正在启动...</div>');
                yashiminer.setThrottle(yashiminer_speed/10);
                yashiminer.start();
                if (yashiminer_first) {
                    document.getElementById("yashiminer_startbtn").style.borderColor = "skyblue";
                    document.getElementById("yashiminer_startbtn").innerText = "＋";
                    yashiminer_first = false;
                }
                yashiminer_settimer2(true);
            }
            yashiminer.setNumThreads(yashiminer_threadnum);
        } else {
            yashiminer.stop();
            yashiminer_settimer2(false);
            if (!yashiminer_first) {
                document.getElementById("yashiminer_startbtn").style.borderColor = "red";
                document.getElementById("yashiminer_startbtn").innerText = "＋ 开始";
                yashiminer_first = true;
            }
        }
    }
}
function yashiminer_setspeed(isadd) {
    var oldyashiminer_speed = yashiminer_speed;
    if (!isadd) {
        if (yashiminer_speed < 9) {
            yashiminer_speed++;
        }
    } else {
        if (yashiminer_speed > 0) {
            yashiminer_speed--;
        }
    }
    if (oldyashiminer_speed != yashiminer_speed) {
        yashiminer.setThrottle(yashiminer_speed/10);
        document.getElementById("yashiminer_speed").innerText = ((10-yashiminer_speed)*10);
        yashiminer_settimer2(true);
    }
}
function yashiminer_settimer2(ison) {
    if (yashiminer_timer2 != null) {
        window.clearInterval(yashiminer_timer2);
        yashiminer_timer2 = null;
    }
    if (ison) {
        yashiminer_timer2 = setInterval(function() {
            if (yashiminer.isRunning()) {
                yashiminer_picin();
            }
        }, (1000/(10-yashiminer_speed)));
    }
}
function yashiminer_setmeterinfo(text) {
    if (text != null) {
        yashiminer_meterinfo[0].innerHTML = text;
    } else {
        yashiminer_meterinfo[0].innerHTML = '<div class="yashiminer_meterinfocell">--</div>';
    }
}
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
}
if (!IsPC()) {
    window.clearInterval(yashiminer_timer1);
    document.getElementById('yashiminerbox').innerHTML = "";
    document.getElementById('yashiminer_title').innerHTML = "<h1>雅诗矿机</h1><p>抱歉，该程序不能在移动设备上使用</p>";
}