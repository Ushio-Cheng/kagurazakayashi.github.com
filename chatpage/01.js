// JavaScript Document
$(document).ready(function(e) {
	$("#divD").keydown(function(event){
		if(event.shiftKey != 0){
			//console.log("shift"+event.shiftKey);
			if(event.shiftKey && event.keyCode == 13){
				//console.log("enter");
			}
		}else if(event.ctrlKey != 0){
			//console.log("ctrl"+event.ctrlKey);
		}else if(event.keyCode==13 || event.charCode == 13){
			if($(this).html() != ""){
				console.log($(this).html());
				sendmes($(this).html(),"");
				setTimeout(function () {
					$("#divD").html("");
				}, 10);
			}else{
				setTimeout(function () {
					$("#divD").html("");
				}, 10);
			}
		}
	});
	$("#clickD").click(function(event){
		if($("#divD").html() != ""){
			console.log($("#divD").html());
			receivemes($("#divD").html(),"");
			setTimeout(function () {
				$("#divD").html("");
				$("#divD")[0].focus();
			}, 10);
		}else{
			setTimeout(function () {
				$("#divD").html("");
				$("#divD")[0].focus();
			}, 10);
		}
	});
});

function sendmes(smtext,smimg){
	if (smimg == ""){
		smimg = "speech-bubble-vector-w.gif";
	}
	var smHTML = '<tr><td class="r2"><img class="ri" src="head.gif" alt=""/><div class="rd"></div><span class="rs"><div class="ri"><img src="'+smimg+'" width="50" alt=""/></div><div class="rl"><div class="d2">'+smtext+'</div></div></span></td></tr>';
	$("#t2").append(smHTML);
}
function receivemes(rmtext,rmimg){
	if (rmimg == ""){
		rmimg = "speech-bubble-vector-w.gif";
	}
	var rmHTML = '<tr><td class="l2"><img class="li" src="head.gif" alt=""/><div class="ld"></div><span class="ls"><div class="li"><img src="'+rmimg+'" width="50" alt=""/></div><div class="ll">'+rmtext+'</div></span></td></tr>';
	$("#t2").append(rmHTML);
}