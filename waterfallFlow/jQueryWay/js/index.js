$(window).on('load', function() {
  waterfall();
})

function waterfall() {
  var $boxs = $('#main>div');
  var w = $boxs.eq(0).outerWidth();
  var cols = Math.floor($(window).width() / w);
  $('#main').width(w * cols).css('margin', '0 auto');

  var hArr = [];
  $boxs.each(function(index, value) {
    var h = $boxs.eq(index).outerHeight()
    if (index < cols) {
      hArr[index] = h;
    } else {
      var minH = Math.min.apply(null, hArr);
      var minHIndex = $.inArray(minH, hArr);
      $(value).css({
        position: 'absolute',
        top: minH + 'px',
        left: minHIndex * w + 'px'
      })
      hArr[minHIndex] += $boxs.eq(index).outerHeight();
    }
  })
}