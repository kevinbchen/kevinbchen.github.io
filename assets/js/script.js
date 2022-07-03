$(document).ready(function() {
  $(".sidebar-toggle").click(function() {
    $(".sidebar").toggleClass("active");
  });

  $("a[href*=\\#]").on('click', function(event) {
    if (this.pathname === window.location.pathname) {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, function() {
        window.location.hash = hash;
      });
    }
  });
});