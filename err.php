<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>uuu.moe 服务器错误报告</title>
<style type="text/css">
body {
	margin-left: 0px;
	margin-top: 5%;
	margin-right: 0px;
	margin-bottom: 0px;
}
a:link {
	color: #FF4688;
}
a:visited {
	color: #FF4688;
}
a:hover {
	color: #FF99BB;
}
a:active {
	color: #C50066;
}
</style>
</head>
<body>
<table width="90%"  border="0" align="center">
  <tbody>
    <tr>
      <td width="30%" align="center" valign="bottom"><img src="https://yoooooooooo.com/yashi/resources/lme.gif" height="300"/></td>
      <td align="left"><p style="font-size: 80px; font-style: normal; font-weight: bold; color: #FF6700;"><?php echo $_GET["errid"]; ?></p>
      <p style="font-size: 18px; color: #999999;"><?php
	  switch ($_GET["errid"])
	  {
		  case "401":
		  echo "你喵有合适的访问权限访问这里喵";break;
		  case "403":
		  echo "你喵有合适的文件权限访问这里喵";break;
		  case "404":
		  echo "找不到要找的文件QAQ";break;
		  case "405":
		  echo "你不能用这种方法访问HTTP页面啦喵";break;
		  case "406":
		  echo "你的浏览器君不支持你打开的页面的扩展名喵";break;
		  case "412":
		  echo "你请求的前提条件有问题喵";break;
		  case "500":
		  echo "服务器酱运行出错了喵";break;
		  case "501":
		  echo "你的浏览器君发送的东西好像不太对……？。";break;
		  case "502":
		  echo "服务器酱在转发请求时收到了无效响应喵<br>";break;
		  case "030":
		  echo "当前页面或栏目正在建设中，请过段时间再来喵～～";break;
		  default:
		  echo "OAO发生了神奇的错误";break;
	  }
	  echo "<br><br>处理服务器：YashiServerHK01OS1　错误号：".$_GET["errid"]."　用户IP：".$_SERVER["REMOTE_ADDR"]."<br>请求地址："."http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]<br>";
	  ?></p><p><?php
	  echo "<a href=\"mailto:cxchope@163.com?subject=uuu.moe网站访问错误反馈\">反馈错误</a>    <a href=\"javascript:history.go(-1)\">回到上一页</a>";
	  ?></p></td>
    </tr>
    <tr>
      <td colspan="2" align="center" valign="bottom">
      <p><br><br>© 2014 YashiServer  <a href="http://uuu.moe">uuu.moe</a></p></td>
    </tr>
  </tbody>
</table>
</body>
</html>
