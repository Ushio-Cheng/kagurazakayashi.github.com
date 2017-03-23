var yachat_server = 'http://192.168.2.99/http-bind/';
var yachat_connection = null;
var yachat_connected = false;
var yachat_jid = "";
function yachat_connect(status) {
    console.log("yachat info : "+status)  
    switch (status) {
        case 0: //Status.ERROR
            console.error("错误");
            break;
        case 1: //Status.CONNECTING
            console.log("正在连接");
            break;
        case 2: //Status.CONNFAIL
            console.error("连接失败");
            break;
        case 3: //Status.AUTHENTICATING
            console.log("正在认证");
            break;
        case 4: //Status.AUTHFAIL
            console.error("认证失败");
            break;
        case 5: //Status.CONNECTED
            yachat_connected = true;
            yachat_connection.addHandler(yachat_msg, null, 'message', null, null, null);
            yachat_connection.send($pres().tree());
            console.log("连接成功 ↑");
            console.log($pres().tree());
            break;
        case 6: //Status.DISCONNECTED
            console.warn("已断开");
            yachat_connected = false;
            break;
        case 7: //Status.DISCONNECTING
            console.log("正在断开");
            break;
        case 8: //Status.ATTACHED
            console.log("attached");
            break;
        case 9: //Status.CONNTIMEOUT
            console.error("连接超时");
            break;
        default:
            console.error("未知错误"+status);
            break;
    }
}
function yachat_msg(msg) {
    console.log("↓");
    console.log(msg);
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');
    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        console.log(body);
        receivemes(Strophe.getText(body),"");
        //$("#msg").append(from + ":<br>" + Strophe.getText(body) + "<br>");
    }
    return true;
}
function yachat_init() {
    $('#btn-login').click(function() {
        if(!yachat_connected) {  
            yachat_connection = new Strophe.Connection(yachat_server);  
            yachat_connection.connect($("#input-jid").val(), $("#input-pwd").val(), yachat_connect);  
            yachat_jid = $("#input-jid").val();
        }
    });
    $("#btn-send").click(function() {  
        sentmsg();
    });  
}
function sentmsg() {
    if(yachat_connected) {
        if($("#input-msg").html() != ""){
            if($("#input-contacts").val() == '') {  
                console.error("请输入ID");  
                return;
            }
            var inputmsgval = $("#input-msg").html();
            var msg = $msg({
                to: $("#input-contacts").val(),
                from: yachat_jid,
                type: 'chat'
            }).c("body", null, inputmsgval);
            console.log("↑");
            console.log(msg.tree());
            yachat_connection.send(msg.tree());
            //$("#msg").append(yachat_jid + ":<br>" + inputmsgval + "<br>");
            sendmes($("#input-msg").html(),"");
            setTimeout(function () {
                $("#input-msg").html("");
            }, 10);
        }else{
            setTimeout(function () {
                $("#input-msg").html("");
            }, 10);
        }
    } else {
        console.error("请先登录！");
    }
}
function chatui() {
    $("#input-msg").keydown(function(event){
		if(event.shiftKey != 0){
			//console.log("shift"+event.shiftKey);
			if(event.shiftKey && event.keyCode == 13){
				//console.log("enter");
			}
		}else if(event.ctrlKey != 0){
			//console.log("ctrl"+event.ctrlKey);
		}else if(event.keyCode==13 || event.charCode == 13){
			sentmsg();
		}
    });
}
function sendmes(smtext,smimg){
	if (smimg == ""){
		smimg = "speech-bubble-vector-w.gif";
	}
	var smHTML = '<tr><td class="r2"><img class="ri" src="chatpage/head.gif" alt=""/><div class="rd"></div><span class="rs"><div class="ri"><img src="chatpage/'+smimg+'" width="50" alt=""/></div><div class="rl"><div class="d2">'+smtext+'</div></div></span></td></tr>';
	$("#t2").append(smHTML);
}
function receivemes(rmtext,rmimg){
	if (rmimg == ""){
		rmimg = "speech-bubble-vector-w.gif";
	}
	var rmHTML = '<tr><td class="l2"><img class="li" src="chatpage/head.gif" alt=""/><div class="ld"></div><span class="ls"><div class="li"><img src="chatpage/'+rmimg+'" width="50" alt=""/></div><div class="ll">'+rmtext+'</div></span></td></tr>';
	$("#t2").append(rmHTML);
}
$(document).ready(function(){
    yachat_init();
    chatui();
});