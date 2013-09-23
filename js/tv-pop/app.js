var app = angular.module('tv-pop',[]);

//jQuery for top button
$(document).ready(function(){
    //show or hide button depending on position
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('.go-top').fadeIn(200);
        }else{
            $('.go-top').fadeOut(200);
        }
    });
    
    //action for clicking button
    $('.go-top').click(function(event){
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });
});
