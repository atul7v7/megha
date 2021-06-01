"use strict";window.onload=function(){function e(e){e.preventDefault();var o=e.currentTarget.getAttribute("href");window.scrollTo({top:"#"===o?0:document.querySelector(o).offsetTop,behavior:"smooth"})}document.querySelectorAll(".scroll-to").forEach(function(o){return o.addEventListener("click",e)})},$(window).scroll(function(){$(window).scrollTop()>=24?$(".at-header--wrapper").addClass("at-header-fixed"):$(".at-header--wrapper").removeClass("at-header-fixed")});

$(".at-hemburger").click(function(){
	$(".at-menu-section--list").toggleClass("show");
});

// jQuery(document).ready(function ($) { 
// 	var $sync1 = $("#sync1"),
// 	$sync2 = $("#sync2"),
// 	flag = false,
// 	duration = 300; 
// 	$sync1
// 	.owlCarousel({
// 		items: 1,
// 		margin: 10,
// 		loop: true,
// 	})
// 	.on('changed.owl.carousel', function (e) {
// 		if (!flag) {
// 			flag = true;
// 			$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
// 			flag = false;
// 		}
// 	}); 
// 	$sync2
// 	.owlCarousel({
// 		margin: 5,
// 		items: 3,
// 		nav: true,
// 		navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
// 		loop: true,
// 		center: true,
// 	})
// 	.on('click', '.owl-item', function () {
// 		$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]); 
// 	})
// 	.on('changed.owl.carousel', function (e) {
// 		if (!flag) {
// 			flag = true;        
// 			$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
// 			flag = false;
// 		}
// 	});
// });


/******************Form validation*****************/