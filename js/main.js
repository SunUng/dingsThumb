
// GNB 메뉴토글
$(function() {
  var $menu = $('.gnb_product');
  $('.gnb_btn').not('.download').on('click', function(e) {
      e.preventDefault();
      if (!$menu.hasClass('on')) {
          $menu.addClass('on');
          $(document).one('click', function closeTooltip(e) {
              if ($menu.has(e.target).length === 0 && $('.gnb_btn').has(e.target).length === 0) {
                  $menu.removeClass('on');
              } else if ($menu.hasClass('on')) {
                  $(document).one('click', closeTooltip);
              }
          });
      } else {
          $menu.removeClass('on');
      }
  });
});

$(window).scroll(function(){
  var ele = $('.header');
  var win = $(window).scrollTop();
  win !== 0 ? ele.addClass('active') : ele.removeClass('active');
});
// //페이지 로드시 커버 이미지 삽입
$(function() {
  var source = $('.source_cover');
  var img = source.length > 0;
  if (img === true) {
    var origin = source.attr('src');
    $('<img/>').attr('src', origin).load(function() {
      var src = $(this).attr('src');
      var source = 'url(' + src + ')';
      $('.cover').css('background-image', source);
      $('.wrap').addClass('loaded');
    });
  } else {
    $('.wrap').addClass('loaded');
    $('.slogan').find('p').addClass('loaded');
  }
});
$('.moveLink').click(function(e){
  e.preventDefault();
  var width = $(window).width();
  var gap = width < 992 ? 0 : $('header').height();
  var href= $(this).attr('href');
  var target = href.replace('#','');
  var offset = $('#'+target+'').offset().top;
  var moveAmount = offset - gap;
  var body = $("html, body");
  body.stop().animate({scrollTop:moveAmount}, 500, 'swing');
});
$('.mobile_opener').click(function(){
  $('header').addClass('opened');
  $('body').addClass('navi_opened');
});
$('.mobile_closer, .mobile_closer_bg').click(function(){
  $('header').removeClass('opened');
  $('body').removeClass('navi_opened');
});

//--------------------------- 데모
//--------------------------- 데모
$('.demo1').dingsThumb();
$('.demo2').dingsThumb({
  cover : false
});
$('.demo3').dingsThumb({
  loading : true
});
$('.demo4').dingsThumb({
  cover : false,
  background : '#a3d553'
});
$('.demo5').dingsThumb({
  background : '#e85764',
  cover : false,
  vertical : 'bottom'
});
$('.demo6').dingsThumb({
  background : '#fdd030',
  cover : false,
  horizon : 'right'
});
$(document).on('click', '.reload', function(){
  var cover = $(this);
  var thumbnail = $('.demo3');
  var img = thumbnail.find('.image-adjusted');
  img.unwrap('div');
  thumbnail.dingsThumb({
    loading : true
  });
});
// $(window).on('load resize', function(){
//   $('pre, code').each(function(){
//     var width = $('.intro_desc').innerWidth();
//     // $(this).width(width);
//   });
// });
