document.addEventListener('DOMContentLoaded', function () {
    let reversed = false; // Flag to track if the carousel is reversed
  
    $(".new-arrival-carousel").owlCarousel({
      loop: true,
      video: true,
      margin: 30,
      stagePadding: 0,
      nav: true,
      dots: false,
      navText: ['<img src="../../../assets/samyakk-icons/Arrow---left-Circle.svg" alt="">', '<img src="../../../assets/samyakk-icons/arrow-right-Circle.svg" alt="">'],
      responsive: {
        // Your responsive options
      }
    });
  
    let navCarousel = document.getElementById('new-arrival-carousel');
  
    navCarousel.addEventListener('click', function () {
      if (!reversed) {
        // If not reversed, toggle to reverse after the first click
        $(".new-arrival-carousel").trigger('prev.owl.carousel');
        reversed = true;
      } else {
        // If reversed, continue with normal next action
        $(".new-arrival-carousel").trigger('next.owl.carousel');
        reversed = false;
      }
    });
  });
  