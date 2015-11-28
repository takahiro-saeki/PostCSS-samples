$(function(){
  $('li a').on('click', function(){
    $('ul li').removeClass('active');
    $(this).closest('li').addClass('active');
  })
})

$(function(){
   $('a[href^=#]').on('click', function() {
      var speed = 400;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - 40;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});
