$(document).ready(function(){
    var rightbottommenubtns = $("#rightbottommenubox2 li");
    $("#rightbottommenuswitch").click(function(){
        if ($(this).text() == "+") {
            $(this).text("-");
            $.each(rightbottommenubtns, function(i, item) {
                var speed = 200 * (rightbottommenubtns.length - i);
                $(this).stop();
                $(this).fadeIn(speed,null);
            });
        } else {
            $(this).text("+");
            $.each(rightbottommenubtns, function(i, item) {
                var speed = 150 * i;
                $(this).stop();
                $(this).fadeOut(speed,null);
            });
        }
    });
});