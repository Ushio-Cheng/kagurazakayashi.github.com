$(document).ready(function(){
    $('#dowebok').fullpage({
        sectionsColor: [
            '#1bbc9b',
            '#4BBFC3',
            '#7BAABE',
            '#f90',
            '#1bbc9b',
            '#4BBFC3',
            '#7BAABE',
            '#f90',
            '#1bbc9b',
            '#4BBFC3'
        ],
        navigationTooltips: [
            '生活(博客)',
            '梦想(作品)',
            '感恩(开源)',
            '欢乐(游戏)',
            '二维(动漫)',
            '绮丽(换装)',
            '友情(友链)',
            '神楽(来源)',
            '个性(性格)',
            '神楽坂雅詩'
        ],
        navigation: true,
        navigationColor: "#FE99CC",
        scrollingSpeed: 700,
        afterLoad: function(anchorLink,index) {
            //console.log("afterLoad=",index,", anchorLink=",anchorLink);
            var h1 = $("#section"+index+" h1");
            var h2 = $("#section"+index+" h2");
            h1.fadeIn(1000,function() {
                h2.fadeIn(1000,null);
            });
        },
        onLeave: function(index,direction) {
            //console.log("onLeave=",index,", direction=",direction);
            var h1 = $("#section"+index+" h1");
            var h2 = $("#section"+index+" h2");
            h1.css("display","none");
            h2.css("display","none");
        }
    });
});