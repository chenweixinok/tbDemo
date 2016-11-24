/**
 * 鼠标点击滑出下拉框
 *
 */
(function(){
    var num = 0;

    $('[data-toggle=arrowdown]').hover(function(){
        var _id = $(this).attr('id');
        num = _id.substring(5, _id.length);
        $(this).find('span')
            .removeClass('run-down')
            .addClass('run-up');
        $('#nav-box'+num).slideDown(100);
    }, function(){
        $(this).find('span')
            .removeClass('run-up')
            .addClass('run-down');
        $('#nav-box'+num).hide();
    });

    $('[data-toggle=hidden-box]').hover(function(){
        var _id =  $(this).attr('id');
        num = _id.substring(7, _id.length);
        $('#arrow'+num).addClass('nav-hover')
            .find('span').removeClass('run-down')
            .addClass('run-up');
        $(this).show();
    }, function(){
        $('#arrow'+num).removeClass('nav-hover')
            .find('span').removeClass('run-up')
            .addClass('run-down');
        setTimeout(function(){
            $('#arrow'+num).find('span').removeClass('run-down');
        }, 500);
        $(this).slideUp(100);
    });
})(jQuery);




/**
 * 滚动出现固定导航 
 *
 */
(function(){
    $(window).scroll(function(){
        var scTop = $(window).scrollTop(),
            $scS = $('.scroll-search');

        scTop >= 200 ? $scS.slideDown(200) : $scS.slideUp(200);
    });
})(jQuery);




/**
 * sidebar的部分 
 *
 */
(function(){
    var scTop = 0,
        beginH = 138,
        wW = $(window).width(),
        classN,
        num;
    $(window).scroll(function(){
        scTop = $(window).scrollTop();
        beginH = 138;
        switch (scTop){
            case 600: beginH -= 45;break;
            case 500: beginH -= 50;break;
            case 400: beginH -= 55;break;
            case 300: beginH -= 60;break;
            case 200: beginH -= 65;break;
            default : beginH = 138;break;
        }
    });
    $('.side-li > li').hover(function(){
        $(this).find('h3').css({border: 'none'})
            .end().find('span').css({color: "#f40"});
        classN = $(this).attr('class');
        num = classN.substring(2, classN.length);

        switch (scTop){
            case 0: if(num > 14){ beginH += 120}else if(num >= 12){beginH += 41}; break;
            case 100: if(num == 1){beginH -= 27}else if(num == 16){beginH += 7}; break;
            case 200: num < 5 ? beginH -= 60 : beginH -= 30; break;
            case 300: num < 8 ? beginH -= 60 : beginH -= 40; break;
            case 400: num <= 11 ? beginH -= 50 : beginH += 10; break;
            case 500: num < 14 ? beginH -= 50 : ''; break;
            case 600: num <= 16 ? beginH -= 50 : ''; break;
            default : beginH = 138;break;
        }

        $('.hiden-box').show()
            .css({
                left: ((wW - 1190)/2 + 149),
                top:  beginH
            }).animate({width: '729px'}, 300);
        $('.hiden-box > li').hide();
        $('#hiden-'+num).fadeIn(200);
        beginH = 138;
    }, function(){
        $(this).find('h3').css({border: ''})
            .end().find('span').css({color: ""});
        $('.hiden-box').hide().css({width: '0'});
    });
    $('.hiden-box').hover(function(){
        $('.s_'+num).css({
            border: '1px solid #f40',
            borderRight: '1px solid #fff'
        }).find('h3').css({border: 'none'})
            .end().find('span').css({color: "#f40"});
        $(this).show().css({width: '729px'});
    }, function(){
        $('.s_'+num).css({
            border: '',
            borderRight: ''
        }).find('h3').css({border: ''})
            .end().find('span').css({color: ""});
        $(this).animate({
            width: 0
        }, 200).hide(200);
    });

})();




/**
 * 轮播框架的部分 
 *
 */
moveAll=function(mov,runnum,prev,next,direction,time){
	  var m = 0;
	  mov.children().eq(0).clone().appendTo(mov);
	  function moving(){
		if( m == mov.children().length){
		    m = 0;
			mov.css(direction,"0px");	
		} 
		if(m==-1){
		   mov.css({ direction: -(mov.children().length- 1) * mov.children().eq(0).outerWidth()+'px' });
           m = mov.children().length - 2;	
		}
		if(m==mov.children().length-1){
		   runnum.eq(0).addClass("imgactive").siblings().removeClass("imgactive");
		}else{
		   runnum.eq(m).addClass("imgactive").siblings().removeClass("imgactive");
		} 
		if(direction == "left"){
		   mov.width(mov.children().eq(0).outerWidth()*mov.children().length)
		   mov.animate({left:-m*mov.children().eq(0).outerWidth()+"px"});
		}
		if(direction == "top"){
		  mov.animate({top:-mov.children().eq(0).outerHeight()+"px"},scrolltop());
		   function scrolltop(){
		    mov.children().eq(0).remove().appendTo(mov);
			mov.css("top","0")
		  }
		}
	  }
      mov.timer = setInterval(function(){m++;moving()},time);
	  mov.parent('div').mouseenter(function(){
	     clearInterval(mov.timer);
	  })
	  mov.parent("div").mouseleave(function(){
		 mov.timer = setInterval(function(){m++;moving()},time);
	  })
	  runnum.mouseover(function(){
		   index = $(this).index();
		   m = index;
		   mov.animate({left:-m*mov.children().eq(0).outerWidth()+"px"},0);  
		   runnum.eq(m).addClass("imgactive").siblings().removeClass("imgactive");
	  })
	  prev.click(function(){
		 m--;
		 moving();
	  })
	  next.click(function(){
		  m++;
		  moving();
	  })
  }
  moveAll($(".big-move"),$(".run-num1 li"),$(".prev"),$(".next"),"left",5000);
  moveAll($(".small-move"),$(".run-num2 li"),$(".prev1"),$(".next1"),"left",3000);
  moveAll($(".news-item"),$("none"),$("none"),$("none"),"top",3000);
  moveAll($(".every-move ul"),$("none"),$(".prev2"),$(".next2"),"left",3000);


/**
 * right-sidbar的部分 
 *
 */
(function(){
    $('.li-nav').hover(function(){
        var _id, num;

        _id = $(this).attr('id');
        num = _id.substring(3, _id.length);
        $('.li-nav').removeClass('li-nav-hover');
        $('.hiddenBox').hide();
        $('#box-'+num).fadeIn(200);
    }, function(){
        $(this).addClass('li-nav-hover');
    });
})();


/**
 * 服务的部分：鼠标焦距在图片上的动画效果
 *
 */
(function(){
    $('.service-cell').hover(function(){
        $(this).children('.service-i').find('img').animate({
            marginTop: '-10px'
        }, 100);
        $(this).children('.service-i').find('img').animate({
            marginTop: '6px'
        }, 100);
    }, function(){
        return false;
    });
})();


/**
 * main middle 
 *
 */
(function(){
    var flag = 1;

    $('.more-btn').click(function(){
        if(flag){
            $(this).css({
                background: '#f40 url(image/up.png) no-repeat 90% center'
            });
            $('.sub-nav').css({
                height: '145px'
            });
            flag = 0;
        }else{
            $('.sub-nav').css({
                height: ''
            });
            $(this).css({
                background: ''
            });
            flag = 1;
        }
    });
})();




/**
 * backToTop
 */
$(document).ready(function(){
    $(window).scroll( function() {               //滚动时触发
        var top = $(document).scrollTop(),       //获取滚动条到顶部的垂直高度
            height = $(window).height();         //获得可视浏览器的高度
        if(top > 10){
            $("#backToTop1").show(200, function(){
                $("#backToTop1").css({
                    top: height + top - 100
                });
            });
        }
    });
    /*点击回到顶部*/
    $('#backToTop-up').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
    /*点击到底部*/
    $('#backToTop-down').click(function(){
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 500);
    });
});

