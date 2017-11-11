//포트폴리오 썸네일 이미지
$('.img_portfolio').each(function(){
  var src = $(this).attr('src');
  $(this).parent().css({
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'cover',
    'background-image': 'url('+ src +')'
  });
});
//포트폴리오 막대바 동작
function playBar() {
  var total = 0;
  var length = $('.rate_bar_item').not('.avg').length;
  $('.portfolio_bar.active').find('.rate_bar_item').each(function(i){
    var loadRatePercent = parseInt($(this).attr('data-rate-percent'));
    total = !$(this).hasClass('avg') ? total + loadRatePercent : total;
    if ($(this).hasClass('avg')) {
      var value = total / length;
      loadRatePercent = Math.ceil(value);
    }
    if (loadRatePercent !== 0) {
      $(this).find('.rate_bar_fill_inner').delay(200+(i*200)).animate({width: loadRatePercent+'%'}, 1000 ).find('.rate_percent').text(loadRatePercent+'%');
    } else {
      $(this).find('.rate_bar_fill_inner').css({
        'background':'#eee',
        'width':'100%'
      }).find('.rate_percent').css({
        'color':'#888'
      }).text('NOTHING');
    }
  });
}
//포트폴리오 막대바 동작 취솨하기
function cancelBar() {
  $('.rate_bar_fill_inner').removeAttr('style');
}
//포트폴리오 오픈이벤트
function scrollMove() {
  // var header = ('')
  var anchor = $(window).scrollTop();
  var scrollPosition = $('.contents').offset().top - $('.sticky_header').height();
    // $(window).scrollTop(scrollPosition);
  if (anchor > scrollPosition) {
    $("html, body").clearQueue().animate({scrollTop:scrollPosition}, 500, 'easeInOutCirc');
  }
}
//포트폴리오 클로즈이벤트
function closePortfolio() {
  // scrollMove();
  var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
      'MozTransition'    : 'transitionend',      // only for FF < 15
      'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
  },
  transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
  $('.portfolio_cont_inner').removeAttr('style');
  $('.close_portfolio_fixed').removeClass('active');
  $('.portfolio_cont_inner_inner').removeClass('active').one(transEndEventName, function() {
    $('.portfolio_bar').removeClass('active');
    cancelBar();
  });;
}
//포트폴리오 액션
// $('.portfolio_item').click(function(){
//   openPortfolio();
// });
$('.portfolio_closer, .close_portfolio_fixed').click(function(){
  closePortfolio();
});

//포트폴리오 블러이펙트
// var filters = document.querySelector(".filters"), // the SVG that contains the filters
// 	defs = filters.querySelector("defs"), // the  element inside the SVG
// 	blur = defs.querySelector("#blur"), // the blur filter
// 	blurFilter = blur.firstElementChild; // the feGaussianBlur primitive
//   // the element we want to apply the effect
// var $element=$(".motion_blur");
// // storing the last position, to be able to measure changes
// var lastPos=$element.offset();
// // a multiplier, to be able to control the intensity of the effect
// var multiplier=0.25;
// // a helper to simplify setting the blur.
// function setBlur(x,y){
// 	blurFilter.setAttribute("stdDeviation",x+","+y);
// }
// (function updateMotionBlur(){
// 	// get the current position of the element
// 	var currentPos=$element.offset();
// 	// calculate the changes from the last frame and apply the multiplier
// 	var xDiff=Math.abs(currentPos.left-lastPos.left)*multiplier*2;
// 	var yDiff=Math.abs(currentPos.top-lastPos.top)*multiplier*2;
// 	// set the blur
// 	setBlur(xDiff,yDiff);
// 	// store current position for the next frame
// 	lastPos=currentPos;
// 	// call to update in the next frame
// 	requestAnimationFrame(updateMotionBlur);
// })();

//포트폴리오 필터
function getHashFilter() {
  // var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}
$( function() {
  var $grid = $('.grid');
  // bind filter button click
  var $filters = $('.portfolio_subj').on( 'click', '.portfolio_category li', function() {
    closePortfolio();
    $('.portfolio_message').removeClass('active');
    var filterAttr = $( this ).attr('data-filter');
    location.hash = 'filter=' + encodeURIComponent( filterAttr );
  });
  $grid.on( 'arrangeComplete', function( event, filteredItems ) {
    if (filteredItems.length < 1) {
      $('.portfolio_message').addClass('active');
      $('.category_name').text();
    }
  });
  var isIsotopeInit = false;
  function onHashchange() {
    closePortfolio();
    $('.portfolio_message').removeClass('active');
    var hashFilter = getHashFilter();
    hashFilter = hashFilter === null ? '*' : hashFilter.split('?')[0];
    // hashFilter = (str1.indexOf('?') !== -1 ? hashFilter = hashFilter.split('?')[0] : hashFilter;
    // if (str1.indexOf('?') != -1) {
    //   hashFilter = hashFilter.split('?')[0];
    // }

    // set filter in hash
    // console.log(nowHash);
    // console.log(hashFilter);
    var filterName = $('.portfolio_category').find('li[data-filter="'+ hashFilter +'"]').text().trim();
    $('.category_display').text(filterName);
    if ( !hashFilter && isIsotopeInit ) {
      return;
    }
    isIsotopeInit = true;
    // filter isotope
    $grid.isotope({
      itemSelector: '.portfolio_item',
      filter: hashFilter
    });
    // set selected class on button
    if ( hashFilter ) {
      $filters.find('.is-checked').removeClass('is-checked');
      $filters.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
    }
  }
  $(window).on( 'hashchange', onHashchange );
  // trigger event handler to init Isotope
  onHashchange();
});





//포트폴리오 내용 비우기
function removeContetns() {
  $('.pp_data').empty();
}

//게시물 컬러 팔레트
function colorFill() {
  $('.color_circle').each(function(){
    var hex = $(this).siblings('.color_title').text();
    $(this).css('background', hex);
  });
}


// Fn to allow an event to fire after all images are loaded
$.fn.imagesLoaded = function () {

    // get all the images (excluding those with no src attribute)
    var $imgs = this.find('img[src!=""]');
    // if there's no images, just return an already resolved promise
    if (!$imgs.length) {return $.Deferred().resolve().promise();}

    // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
    var dfds = [];
    $imgs.each(function(){

        var dfd = $.Deferred();
        dfds.push(dfd);
        var img = new Image();
        img.onload = function(){dfd.resolve();}
        img.onerror = function(){dfd.resolve();}
        img.src = this.src;

    });

    // return a master promise object which will resolve when all the deferred objects have resolved
    // IE - when all the images are loaded
    return $.when.apply($,dfds);

}

function heightAdjust() {
  var active = $('.portfolio_cont_inner_inner').hasClass('active');
  var height = $('.portfolio_detail_contents').outerHeight();
  var height2 = $('.portfolio_list').height();
  var move = height > height2 ? height : height2;
  if (active === true) {
    $('.portfolio_cont_inner').css('height',height);
  } else {
    $('.portfolio_cont_inner').css('height',height2);
  }
  // console.log(active);
  // console.log(height);
  // console.log(height2);
  // console.log(move);
}
$(window).resize(function(){
  heightAdjust();
});
function ajaxCallPP() {
  var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
      'MozTransition'    : 'transitionend',      // only for FF < 15
      'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
  },
  transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
  $('.close_portfolio_fixed').addClass('active');
  $('.portfolio_cont_inner_inner').addClass('active').one(transEndEventName, function() {
    $('.portfolio_bar').addClass('active');
    playBar();
    scrollMove();
    setTimeout(function(){
      $('.portfolio_item').removeClass('loading');
        heightAdjust();
    }, 500);
  });
  $('.portfolio_item').removeClass('loading');
}

function openPortfolio(e) {
  var address = './portfolio/' + e;
  var address2 = './portfolio/' + e + '/index.html';
  $.ajax({
    type: 'GET',
    url: address2,
    dataType: 'html',
    // beforesend: function() {
    //
    // },
    success: function(data) {
      removeContetns();
      var source = $(data);
      source.find('img').each(function(){
        var src = $(this).attr('src').split('/');
        var file = src[src.length - 1];
        $(this).attr('src', address + '/' + file);
      });
      $('.pp_data').append(source).imagesLoaded().then(function(){
        colorFill();
        ajaxCallPP();
      });
      // $('.portfolio_cont_inner').removeAttr('style');
    },
    complete: function(data) {

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert('웹사이트가 원활하지 않습니다.');
      window.history.back();
    }
  });
}



function getPage() {
  var matches = location.href.match( /page=([^&]+)/i );
  var pageFilter = matches && matches[1];
  return pageFilter && decodeURIComponent( pageFilter );
}

$( function() {
  var clickable = true;
  var $pageFilter = $('.portfolio_list').on( 'click', '.portfolio_item', function() {
  if (clickable === true) {
    clickable = false;
    $(this).addClass('loading');
    var filterAttr = $(this).attr('data-pp-id');
    var nowHash = location.hash.split('?')[0];
    // setTimeout(function(){
    //   location.hash = nowHash + '?page=' + encodeURIComponent(filterAttr);
    //   clickable = true;
    // }, 1000);
    location.hash = nowHash + '?page=' + encodeURIComponent(filterAttr);
    setTimeout(function(){
      clickable = true;
    }, 3000);
  }
  });

  var $closerPortfolio = $('.portfolio_detail').on( 'click', '.portfolio_closer', function() {
    var filterAttr = $( this ).attr('data-page-id');
    var nowHash = location.hash.split('?')[0];
    if (nowHash === '#')  {
      // window.history.back();
      location.hash = 'filter=*';
    } else {
      location.hash = nowHash;
    }
  });

  var isPage = false;
  function onPageChange() {
    var pageFilter = getPage();
    if ( !pageFilter && isPage ) {
      return;
    }
    isPage = true;
    if ( pageFilter ) {
      openPortfolio(pageFilter);
    }
  }
  $(window).on( 'hashchange', onPageChange );
  onPageChange();
});

$(document).mouseup(function(e) {
  var btn = $('.portfolio_subj');
  if ((!btn.is(e.target) && btn.has(e.target).length === 0)) {
    btn.removeClass('filter-on');
  } else {
    btn.toggleClass('filter-on');
  }
});
