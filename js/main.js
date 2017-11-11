
//플러그인 시작
(function ( $ ) {
  $.fn.dingsThumb = function(options) {
    return this.each(function() {
      var loaded = false;
      var opts = $.extend( {}, $.fn.dingsThumb.defaults, options );
      var box = $(this), cover = opts.cover, loading = opts.loading, bg =opts.background, vertical = opts.vertical, horizon =opts.horizon;
      var img = box.find('img'), src = img.attr('src'), alt = img.attr('alt');
      function thumbAdjust() {
        var obj = box.find('img');
        var boxHeight = box.height(), boxWidth = box.width(), boxRatio = boxHeight / boxWidth;
        var imgHeight = obj.height(), imgWidth = obj.width(), imgRatio = imgHeight / imgWidth;
        var referCalc = (imgRatio / boxRatio) > 1, refer = cover === true ? referCalc : !referCalc;
        box.css({'position' : 'relative', 'overflow' : 'hidden', 'background' : bg});
        var valuesSize = (function() {
          var value = [];
          if (refer === true) {
            value[0] = '100%';
            value[1] = 'auto';
          } else {
            value[0] = 'auto';
            value[1] = '100%';
          }
          return value;
        })();
        obj.css({
          'position':'absolute',
          'display':'inline-block',
          'width':valuesSize[0],
          'height':valuesSize[1]
        });
        var modifiedImgW = obj.width(), modifiedImgH = obj.height();
        var valuesPosition = (function() {
          var value = [];
          if (horizon === 'left') {
            value[0] = 0;
          } else if (horizon === 'right') {
            value[0] = boxWidth - modifiedImgW;
          } else  {
            value[0] = (boxWidth / 2) - (modifiedImgW / 2);
          }
          if (vertical === 'top') {
            value[1] = 0;
          } else if (vertical === 'bottom') {
            value[1] = boxHeight - modifiedImgH;
          } else {
            value[1] = (boxHeight / 2) - (modifiedImgH / 2);
          }
          return value;
        })();
        obj.css({
          'top':valuesPosition[1],
          'left':valuesPosition[0]
        });
      }
      function thumbNoloading() {
        $('<img class="image-adjusted" alt="'+ alt +'">').attr("src", src).load(function() {
          $(this).appendTo(box).siblings('img').remove();
          thumbAdjust();
        });
      }
      function thumbLoading() {
        $('<img class="image-adjusted" alt="'+ alt +'" style="display:none;">').attr("src", src).load(function() {
          $(this).appendTo(box).fadeIn('fast').siblings('img').remove();
          thumbAdjust();
        });
      }
      if (loaded === false) {
        var imageObj = loading === false ? thumbNoloading() : thumbLoading();
        loaded = true;
      }
      $(document).ready(thumbAdjust);
      $(window).on('load resize', thumbAdjust);
    });
  };
  $.fn.dingsThumb.defaults = {
      cover : true,
      loading : false,
      background : '#fff',
      vertical : 'center',
      horizon : 'center'
  };
}( jQuery ));
//플러그인 끝

//--------------------------- 플러그인 끝
//--------------------------- 플러그인 끝

//--------------------------- 플러그인 실행
//--------------------------- 플러그인 실행

// $(window).ready(function(){
  //썸네일 background-size:cover 형태
  $('.cover').dingsThumb({
    loading : true,
    background : '#ccd1da',
    vertical : 'top',
    horizon : 'right',
    background: 'pink'
  });
  //썸네일안에 이미지 전체 집어넣는 형태
  $('.nocover').dingsThumb({
    cover : false,
    loading : true,
    background : '#ccd1da',
    vertical : 'top',
    horizon : 'right',
    background: 'pink'
  });
// });

//--------------------------- 클릭 이벤트 데모
//--------------------------- 클릭 이벤트 데모

$(document).on('click', '.btn', function(){
  var cover = $(this).hasClass('cover');
  var sourceImg = $(this).find('img').attr('src');
  var target = $(this).closest('.right').siblings('.left').find('.thumbnail');
  target.find('img').remove();
  target.append('<img src="'+sourceImg+'">');
  if (cover === true) {
    target.dingsThumb();
  } else {
    target.dingsThumb({
      cover : false,
      loading : true,
      background : '#ccd1da',
      vertical : 'top',
      horizon : 'right',
      background: 'pink'
    });
  }
});

//리사이즈 오류 수정중
