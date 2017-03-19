$(document).ready(function(){

});
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