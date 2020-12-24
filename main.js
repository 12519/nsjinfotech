/*
  Theme Name: VedVision - LMS Education HTML Template
  Author: Humayun Ahmed
  Author URL: https://themeforest.net/user/pixelcurve
  Support: humayunahmed82.com
  Description: Creative  HTML5 template.
  Version: 1.0
*/



$(function() {
    
    "use strict";
    
    fetch("./header.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("header").innerHTML = data;
    });
  fetch("./footer.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("footer").innerHTML = data;
    });
  fetch("./main.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById("content").innerHTML = data;
      mainSlider();
      loadOtherSliders();
    });
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });


    window.addEventListener('DOMContentLoaded', (event) => {
      setTimeout(() => {
        let navItems = document.getElementsByClassName('nav-item');
        for (let i = 0; i < navItems.length; i++) {
          navItems[i].addEventListener('click', function ($event) {
            setnavigation($event);
          })
        }
      }, 2000);
    });

  let start = 0;
  let end = 8;
  let limit = 8;
  let totalCount = 0;

    function setnavigation($event){
      let page = $event.currentTarget.firstElementChild.getAttribute('data');
      fetch(page)
        .then(response => {
          return response.text()
        })
        .then(data => {
          document.getElementById("content").innerHTML = data;
          mainSlider();
          loadOtherSliders();
          window.location = '#';
          if (page == "courses.html") {
            let getCourses = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
            getCourses.open("GET", "./courses.json", true); // Path to Audio File
            getCourses.send();
            getCourses.onload = function (data) {
              let temp = ""
              document.getElementById('course-list').innerHTML = temp;
              totalCount = JSON.parse(getCourses.response).length;
              document.getElementById('total-count').innerHTML = totalCount;      
              document.getElementById('start-count').innerHTML = start;
              document.getElementById('current-count').innerHTML = end;
              JSON.parse(getCourses.response).forEach((element, index) => {
                if (index >= 0 && index <= 7) {
                  temp += getTemp(element);
                }
                
              });
              document.getElementById('course-list').innerHTML = temp;
            }
          }
          if(document.getElementsByClassName('active').length){
            for(let i=0;i<document.getElementsByClassName('active').length;i++){
              document.getElementsByClassName('active')[i].classList.remove('active');
            }
          }
          $event.path[0].classList.add('active');
        }).catch(err => {
          console.log(err);
        });
    }

    function getTemp(element){
      return `                <div class="col-lg-3 col-md-4">
      <div class="singel-course mt-30">
          <div class="thum">
              <div class="image">
                  <img src="images/course/${element.image}" alt="Course">
              </div>
              <div class="price">
                  <span>Free</span>
              </div>
          </div>
          <div class="cont text-center">
              <ul style="margin-bottom: 5px;">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
              </ul>
              <a href="#"><h4>Learn ${element.name} from beginner to advanced</h4></a>
              <button href="#" class="main-btn" data-toggle="modal" data-target="#${element.id}" onclick="registerPopup('${element.id}')">Register</button>

          </div>
      </div> <!-- singel course -->
  </div>
  <div class="modal fade" id="${element.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="${element.id}Title">Register for ${element.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form id="${element.id}form">
      <div class="form-group">
      <label for="name${element.id}">Name*</label>
      <input type="text" class="form-control" id="name${element.id}" aria-describedby="nameHelp" placeholder="Enter name" required>
    </div>
      <div class="form-group">
        <label for="email${element.id}">Email address*</label>
        <input type="email" class="form-control" id="email${element.id}" aria-describedby="emailHelp" placeholder="Enter email" required>
      </div>
      <div class="form-group">
      <label for="phoneNumber${element.id}">Phone number*</label>
      <input type="number" maxlength="10" class="form-control" id="phoneNumber${element.id}" aria-describedby="phoneHelp" placeholder="Enter Phone number" required>
    </div>
    <div class="form-group">
    <label for="description${element.id}">Description</label>
    <textarea type="text" class="form-control" rows="3" id="description${element.id}" placeholder="Enter Description"></textarea>
  </div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="${element.id}submit" onclick="sendEmail('${element.name}','${element.id}')">Register</button>
      </div>
    </div>
  </div>
</div>`;
    }
    
    
    //===== Search
    
    $('#search').on('click', function(){
        $(".search-box").fadeIn(600);
    });
    $('.closebtn').on('click', function(){
        $(".search-box").fadeOut(600);
    });
    
    
    //===== Sticky
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $(".navigation").removeClass("sticky");
            $(".navigation-3 img").attr("src", "images/logo-2.png");
        } else{
            $(".navigation").addClass("sticky");
            $(".navigation-3 img").attr("src", "images/logo.png");
        }
    });
    
    
    //===== Mobile Menu
    
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass("active");
    });
    
    var subMenu = $('.sub-menu-bar .navbar-nav .sub-menu');
    
    if(subMenu.length) {
        subMenu.parent('li').children('a').append(function () {
            return '<button class="sub-nav-toggler"> <i class="fa fa-chevron-down"></i> </button>';
        });
        
        var subMenuToggler = $('.sub-menu-bar .navbar-nav .sub-nav-toggler');
        
        subMenuToggler.on('click', function() {
            $(this).parent().parent().children('.sub-menu').slideToggle();
            return false
        });
        
    }
    
    
    
    //===== Slick Slider
    
        function mainSlider() {
            
        var BasicSlider = $('.slider-active');
            
        BasicSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
            
        BasicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
            
        BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 10000,
            pauseOnHover: false,
            dots: false,
            fade: true,
			arrows: true,
            prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
            nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
            responsive: [
                { breakpoint: 767, settings: { dots: false, arrows: false } }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    
    
function loadOtherSliders(){
      //===== Slick Category Slied
    
      $('.category-slied').slick({
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        responsive: [
        {
          breakpoint: 922,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
        ]
    });
    
    
    //===== Slick Course Slied
    
    $('.course-slied').slick({
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        prevArrow:'<span class="prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
        ]
    });
    
    
    //====== Magnific Popup
    
    $('.Video-popup').magnificPopup({
        type: 'iframe'
        // other options
    });
    
    
    //===== Slick testimonial Slied
    
    $('.testimonial-slied').slick({
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
        ]
    });
    
    
    //===== Slick testimonial Slied
    
    $('.patnar-slied').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
        ]
    });
}
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    
    
    //===== Counter Up
    
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });
    
    
    //===== Slick testimonial Slied
    
    $('.student-slied').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });
    
    
    
    //===== Nice Select
    
    $('select').niceSelect();
    
    
    
    //===== Count Down
    
    $('[data-countdown]').each(function() {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
        $this.html(event.strftime('<div class="count-down-time"><div class="singel-count"><span class="number">%D :</span><span class="title">Days</span></div><div class="singel-count"><span class="number">%H :</span><span class="title">Hours</span></div><div class="singel-count"><span class="number">%M :</span><span class="title">Minuits</span></div><div class="singel-count"><span class="number">%S</span><span class="title">Seconds</span></div></div>'));
      });
    });
    
    
    //=====  Rating selection
    
    $('.reviews-form').on('click', '.rate-wrapper .rate .rate-item', function() {
        var self = $(this),
            target = self.parent('.rate');
        target.addClass('selected');
        target.find('.rate-item').removeClass('active');
        self.addClass('active');
    });
        
    
    
    //===== Nice Number
    
    $('input[type="number"]').niceNumber({
        // custom button text
        buttonDecrement: "<i class='fa fa-sort-asc' ></i>",
        buttonIncrement: "<i class='fa fa-sort-desc' ></i>",

    });

    
    
    //===== Magnific Popup
    
    $('.shop-items').magnificPopup({
      type: 'image',
      gallery:{
        enabled:true
      }
    });
});

let start = 0;
let end = 8;
let limit = 8;
let totalCount = 0;

function next(currentPage){
    end = currentPage*limit;
    start = (end-limit)+1
    let getCourses = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
    getCourses.open("GET", "./courses.json", true); // Path to Audio File
    getCourses.send();
    getCourses.onload = function (data) {
      let temp = ""
      document.getElementById('course-list').innerHTML = temp;
      document.getElementById('current-count').innerHTML = end;
      document.getElementById('start-count').innerHTML = start;

      JSON.parse(getCourses.response).forEach((element,index) => {
        if(index >= start-1 && index <= end-1){
          temp += getTemp(element);
        }
      });
      document.getElementById('course-list').innerHTML = temp;
    }
}

function registerPopup(id){
  //$('#myModal').modal('toggle');
  $(id).modal('show');
  let forms = document.forms;
  for (let i = 0; i < forms.length; i++) {
    if (forms[i].id == id + 'form') {
      document.getElementById(id + 'submit').disabled = true;
      forms[i].onchange = function () {
        let isFormvalid = forms[i].checkValidity();
        document.getElementById(id + 'submit').disabled = !isFormvalid;
        let elements = forms[i].elements;
        for (let j = 0; j < elements.length; j++) {
          if (!forms[i].elements[j].checkValidity()) {
            forms[i].elements[j].style.borderColor = 'red';
          }
          else {
            forms[i].elements[j].style.borderColor = 'green';
            if(forms[i].elements[j].type == 'email'){
              let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
              if(regex.test(forms[i].elements[j].value)){
                forms[i].elements[j].style.borderColor = 'green';
                document.getElementById(id + 'submit').disabled = false;
              }
              else{
                forms[i].elements[j].style.borderColor = 'red';
                document.getElementById(id + 'submit').disabled = true;
              }
            }
            else if(forms[i].elements[j].type == 'number'){
                if((forms[i].elements[j].value).length <10){
                  forms[i].elements[j].style.borderColor = 'red';
                  document.getElementById(id + 'submit').disabled = true;
                }
                else{
                  forms[i].elements[j].style.borderColor = 'green';
                  document.getElementById(id + 'submit').disabled = false;
                }
            }
          }
        }
      }
    }
  }
  //$('#myModal').modal('hide');
}

function getTemp(element){
  return `                <div class="col-lg-3 col-md-4">
  <div class="singel-course mt-30">
      <div class="thum">
          <div class="image">
              <img src="images/course/${element.image}" alt="Course">
          </div>
          <div class="price">
              <span>Free</span>
          </div>
      </div>
      <div class="cont text-center">
          <ul style="margin-bottom: 5px;">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
          </ul>
          <a href="#"><h4>Learn ${element.name} from beginner to advanced</h4></a>
          <button href="#" class="main-btn" data-toggle="modal" data-target="#${element.id}" onclick="registerPopup('${element.id}')">Register</button>

      </div>
  </div> <!-- singel course -->
</div>
<div class="modal fade" id="${element.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="${element.id}Title">Register for ${element.name}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <form id="${element.id}form">
  <div class="form-group">
  <label for="name${element.id}">Name*</label>
  <input type="text" class="form-control" id="name${element.id}" aria-describedby="nameHelp" placeholder="Enter name" required>
</div>
  <div class="form-group">
    <label for="email${element.id}">Email address*</label>
    <input type="email" class="form-control" id="email${element.id}" aria-describedby="emailHelp" placeholder="Enter email" required>
  </div>
  <div class="form-group">
  <label for="phoneNumber${element.id}">Phone number*</label>
  <input type="number" maxlength="10" class="form-control" id="phoneNumber${element.id}" aria-describedby="phoneHelp" placeholder="Enter Phone number" required>
</div>
<div class="form-group">
<label for="description${element.id}">Description</label>
<textarea type="text" class="form-control" rows="3" id="description${element.id}" placeholder="Enter Description"></textarea>
</div>
</form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary" id="${element.id}submit" onclick="sendEmail('${element.name}','${element.id}')">Register</button>
  </div>
</div>
</div>
</div>`;
}

function sendEmail(courseName, id) {
  let name = document.getElementById('name' + id).value;
  let email = document.getElementById('email' + id).value;
  let phone = document.getElementById('phoneNumber' + id).value;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "maringantikc@gmail.com",
    Password: "64984B5E2D013B08CA5BA734B832F1F878EF",
    port: 2525,
    To: 'macharyakc@gmail.com',
    From: "maringantikc@gmail.com",
    Subject: `Registration for ${courseName}`,
    Body: `Name:${name}<br>
            Email:${email}<br>
            phoneNumber:${phone}`
  })
    .then(function (message) {
      alert(message)
    });
}


