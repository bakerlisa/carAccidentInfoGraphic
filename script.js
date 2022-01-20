function woeContainerHeight(){
	$('.distracted-driving-woes .woe').each(function(){
		woeHeight += $(this).height();
	});
}


var WindowWidth = $(window).width();

//variables that change on resize
if(WindowWidth > 767){
	var h1YellowBackHeight = "50px";
}else{
	var h1YellowBackHeight = "40px";
}

//first page: loading animations
var tl0 = new TimelineLite();
	tl0.from(".first-choice h1 .large-text", 1, {opacity: '0', top: "-100px"})
	tl0.from(".first-choice h1 .background-yellow", .75, {maxWidth: 0, opacity: "0"}, "-=.75")
	tl0.to(".first-choice h1 .background-yellow", .5, {height: h1YellowBackHeight})
	tl0.to(".first-choice h1 .smaller-sub-text", .75, {maxHeight: "47px", top: 0}, "-=.3")
	tl0.from(".first-choice p", .5, {opacity: 0, top: "-25px"}, "-=.15")
	tl0.from(".first-choice h2", .5, {opacity: 0, top: "-25px"}, "-=.25")
	tl0.staggerFrom(".first-choice ul li", .75, {opacity: 0}, 0.2, "-=.1")
;

//first page: click on a button
$('.buttons li').click(function(event){
	var distanceH2 = $('.distracted-driving-woes').offset().top ;
	var selectedClass = event.target.className;
	var activeClass = "." + selectedClass + "-wrapper";
	var percentage = "";

	if(selectedClass == "aggessive"){
		percentage += "68%";
	}else if(selectedClass == "distracted"){
		percentage += "88%";
	}else if(selectedClass == "drugged"){
		percentage += "55%";
	}else if(selectedClass == "drunk"){
		percentage += "43%";
	}

	$('.driving-type').text(selectedClass.toUpperCase() + " DRIVING");
	$('.percent').text(percentage);
	$('body').addClass('active');
	$('.driving-wrapper').addClass('active');
	
	var tl = new TimelineLite();
	tl.to(".first-choice", 1, {position: 'realative', top:'-100%'})
	.to(".second-choice", 1, {position: 'realative', top:'0', height: 'initial'}, "-=1")
	.from('.sub-sections .fa-arrow-circle-up', 1, {opacity:0}, "-=.75")
	.from('.yellow-box p', 1, {top:300}, "-=.5")
	.from('.car-image-wrapper img', 1, {right:"-100%"}, "-=.5")
	.from('.driving-percentage', .5, {opacity: 0, top:"-50px"}, "-=.25")
	.from('.disclaimer', .5, {opacity: 0, top:-50}, "-=.25");
});

$('.buttons li, .what-type-statics .button-statics, .cta').mouseover(function(){
	var event = $(this);
	TweenMax.to(event, .25, {borderRadius:"0 20px"});
}).mouseout(function(){
	var event = $(this);
	TweenMax.to(event, .25, {borderRadius:"0px"});
});

//first page: click on back to top
$('.sub-sections .fa-arrow-circle-up').click(function(event){
	$('body').removeClass('active');
	TweenMax.to(".first-choice", 1, {top:'0%'});
	TweenMax.to(".second-choice", 1, {position: 'realative', top:'100%'});
});

//click on intersection li's
var i = 0;
$('.intersection-accidents .ul-column li span').click(function(event){
	var dataAttribute = $(this).parent().data("accident");
	var clickedItem = $(this).parent().attr("class");
	var timelineImg = "." + dataAttribute + ' .column-img-wrapper';
	var timelineP = "." + dataAttribute + ' .sub-paragraph';
	var timelineCauser = "." + clickedItem + ' .accidnet-causer';
	var exitCauser = "." + clickedItem + ' .fa-times';
	var parentToShow = $('.intersection-types').find('.' + dataAttribute);
		
	//counts the ones you've chosen - needs to come before the add class and the add class needs to come before the top 6 animation 	
	if(!($(this).parent().hasClass('active')) && (clickedItem !== "no") ){		
		i++;
	}	

	$(this).parent().addClass('active');
	parentToShow.siblings().removeClass('active');
	parentToShow.addClass('active');
	


	//a top 6 item
	if( clickedItem !== "no"){
		$(parentToShow).siblings().hide();
		var tl2 = new TimelineLite();
		tl2.fromTo(parentToShow, .75, {left:"-200%", display:"none"}, {left:0, display:"block"})
		.fromTo(parentToShow, 1, {opacity:0}, {opacity:1}, "-=.7")
		.fromTo(timelineImg, .5, {left:"-300px"}, {left:0}, "-=.5")
		.fromTo(timelineP, .5, {bottom: "-200px", opacity:0}, {bottom: 0, opacity:1}, "-=.5")
		.fromTo(exitCauser, .5, {opacity:0}, {opacity:1}, "-=.5")
		;				
	}
	
	//after you've guessed them all
	if(i == 6){
		var distanceH2 = $('.distracted-driving-woes').offset().top;
		var tl3 = new TimelineLite();
		tl3.to('.ul-column li.no', .5, {maxHeight: 0, overflow: "hidden", padding: 0})
		tl3.to(".intersection-accidents .congrats", 0, {display:"block"})
		tl3.to(".intersection-accidents .congrats span", .5, {top:0}, "-=.5")
		;
	}

});

$('.column .fa-times').click(function(){
	var hideCard = $(this).parent();
	var tl5 = new TimelineLite();
	tl5.to(hideCard, 1, {left:"-200%", opacity:0})
});	

//stat image
$('.stat-image-wrapper img').hover(function(){
	var currentImage = $(this).data("tag");
	$('.stat-content-wrapper').children().removeClass('active');
	var elementToFind = (".stat-content[data-tag='" + currentImage + "']");
	TweenMax.to(elementToFind, 1, {opacity:1});
	$(elementToFind).siblings().each(function(){
		TweenMax.to(this, .25, {opacity:0});
	});
});

//stat US / global
$('.what-type-statics div').click(function(){
	var clickedButton = $(this).data("tag");
	var activeDiv = "";
	var otherDiv = '';
	var divHeight = '';
	

	if(clickedButton == "annual-us"){
		$('.annual-global').removeClass('active');
		activeDiv = ".annual-us";
		otherDiv = ".annual-global";
		divHeight = "1100px";
	}else if(clickedButton == "annual-global"){
		$('.annual-us').removeClass('active');
		activeDiv = ".annual-global";
		otherDiv = ".annual-us";
		divHeight = "960px";
	}

	$('.' + clickedButton).addClass('active');

	var innerDivHeight = $(otherDiv).innerHeight();
	if(innerDivHeight  > 0){	
		var tl4 = new TimelineLite();
		tl4.to(otherDiv, 1, { maxHeight:0})
		.to(activeDiv, 1, { maxHeight: divHeight});
	}else{
		TweenMax.to(activeDiv, 1, { maxHeight:divHeight});
	}	

	$([document.documentElement, document.body]).animate({
        scrollTop: $(activeDiv).offset().top
    }, 1000);
	$('body').css({"height":"100%", "overflow": "hidden"});
	
	
	var tl6 = new TimelineLite();
	tl6.from(".annual-us.active .fa-arrow-circle-up", .5, {top:"-50px", opacity: 0}, "+=.5")
	.from(".annual-us.active .first", .5, {bottom: "-50px", opacity: 0}, "-=.25")
	.from(".annual-us.active .car-crash-wrapper", .5, {top: "-50px", opacity: 0}, "-=.25")
	.from(".annual-us.active .second", .5, {right: "-100px", opacity: 0}, "-=.25")
	.staggerFrom(".annual-us.active .stat-image", 1, {opacity: 0, left:"-50px"}, 0.2);

	var tl7 = new TimelineLite();
	tl7.from(".annual-global.active .fa-arrow-circle-up", .5, {top:"-50px", opacity: 0}, "+=.5")
	.from(".annual-global.active .first", .5, {bottom: "-50px", opacity: 0}, "-=.25")
	.from(".annual-global.active .sub-text", .5, {top: "-25px", opacity: 0}, "-=.25")
	.from(".annual-global.active .global-image-outline-wrapper", 1.5, {maxHeight: 0}, "-=.25")
	.from(".annual-global.active .global-image", 1, {rotation: "+=360", opacity:0}, "-=1.15")
	.staggerFrom('.global-icon', 1, {opacity:0}, 0.2, "-=.75");

	TweenMax.to(activeDiv, .5, {overflowY: "scroll", height:"100%", "top": "0", "z-index": "1000000", "width": "100%", "max-height": "100%", "overflow-y": "scroll"}, "-=.5");
	setTimeout(function(){
		$(activeDiv).css({'position': "fixed"}); 
	}, 1000);
});

$('.global-icon').mouseenter(function(){
	var imageHover = $(this).data("type");
	var elementToShow = $('.content').find("[data-type='" + imageHover+ "']");
	var siblingsToHide = $(elementToShow).siblings();
	TweenMax.to(".global-image", .25, {opacity:0});
	TweenMax.to(siblingsToHide, .25, {opacity:0});
	TweenMax.to(elementToShow, .4, {opacity:1});

});

$('.annual-global .fa-arrow-circle-up, .annual-us .fa-arrow-circle-up').click(function(){
	$('body').css({"height":"initial", "overflow": "visible"});
	$(this).parent().removeClass('active');
	var toAnmate = $(this).parent();
	$(toAnmate).css({'position': "initial"}); 
	TweenMax.to(toAnmate, 1, { maxHeight:0});


	$([document.documentElement, document.body]).animate({
        scrollTop: $(".what-type-statics").offset().top
    }, 1000);
});



// ==================================== SCROLLING ANIMATIONS ==================================== //
var controller = new ScrollMagic.Controller();

//annual global / us
var tlCurtain2 = new TimelineMax();
	tlCurtain2.from(".what-type-statics h2", 1, {top: '-450px'})
	tlCurtain2.staggerFrom(".what-type-statics .button-statics", .5, {opacity: 0}, 0.2);
 
var scene = new ScrollMagic.Scene({triggerElement: ".what-type-statics", triggerHook: 'onEnter', offset: 203, reverse:false})
    .addTo(controller)
    .setTween(tlCurtain2);

//Intersection
var tlCurtain = new TimelineMax();
	tlCurtain.from(".intersection-accidents h2 div", 1, {top:'-450px'})
	tlCurtain.from(".intersection-accidents p.intersection-cta span", 1, {top: '-250px'}, "-=1")
	tlCurtain.staggerFrom(".arrows span", .5, {opacity:0, top: "-20px"}, .2);
	tlCurtain.staggerFrom(".ul-column li", .25, {opacity:0}, .15, "-=.5")
	tlCurtain.staggerFrom(".accidnet-causer", .5, {opacity:0, left: '-30px'}, .2, "-=.5");
 
var scene1 = new ScrollMagic.Scene({
		triggerElement: ".intersection-accidents", 
		triggerHook: 'onEnter', 
		offset: 203,
		duration:500
	})
    .addTo(controller)
    .setTween(tlCurtain);


//footer-cta
var tlCurtain3 = new TimelineMax();
	tlCurtain3.from(".footer-cta p", .5, {opacity: 0, top:'50px'})
	tlCurtain3.from(".footer-cta a", 1, {left: "-25px", opacity: 0}, "-=.25");
 
var scene2 = new ScrollMagic.Scene({
		triggerElement: ".footer-cta", 
		triggerHook: 'onEnter', 
		offset: 203, 
		duration: 400
	})
    .addTo(controller)
    .setTween(tlCurtain3);

//references
var tlCurtain2 = new TimelineMax();
	tlCurtain2.from(".reference h4", .5, {opacity: 0})
	tlCurtain2.staggerFrom(".reference ul li", 1, {opacity: 0}, 0.1);
 
var scene3 = new ScrollMagic.Scene({
		triggerElement: ".reference", 
		triggerHook: 'onEnter', 
		offset: 203, 
		reverse:false
	})
    .addTo(controller)
    .setTween(tlCurtain2);



//Woes 
var woeHeight = 0;
woeContainerHeight();
$(window).resize(function(){
	woeContainerHeight();
});


var n = 0
var woeLength = $('.distracted-driving-woes .woe').length - 1;
$('.distracted-driving-woes .woe').each(function(){
	var currentWoeHeight = $(this).height();

	if(n == woeLength){
		var followers = true;
	}else{
		var followers = false;
		
	}
	var PinScene = new ScrollMagic.Scene({
		triggerElement: this,
		triggerHook: .25,
		duration: currentWoeHeight
	})
	.setPin(this, {pushFollowers: followers})
	.setClassToggle(this, 'fade-in')
	.addTo(controller);
	n++;
});

//Bar graphs


var tlCurtain4 = new TimelineMax();
$('.bar-graph').each(function(){
	var percentWidth = $(this).find('.barPercent').text();

	var tlCurtain4 = new TimelineMax();
	tlCurtain4.to(this, 1, {width:percentWidth, padding:'30px 15px'})
	;

	var scene3 = new ScrollMagic.Scene({
		triggerElement: ".barsWrapper", 
		triggerHook: 'onEnter', 
		offset: 203
	})
    .addTo(controller)
    .setTween(tlCurtain4);

});

var tlCurtain5 = new TimelineMax();
	tlCurtain5.staggerTo('.border-bottom', 1.5, {width:'100%'}, .2)
	.staggerTo('.graph-type', 1, {right:0}, .2, "-=.5")
	.staggerTo('.barPercent', 1.25, {left:0}, .2)
;

var scene3 = new ScrollMagic.Scene({
	triggerElement: ".barsWrapper", 
	triggerHook: 'onEnter', 
	offset: 203,
	duration:500
})
.addTo(controller)
.setTween(tlCurtain5);	

//animate the width of the bar graph	
var distanceH2 = $('.distracted-driving-woes').offset().top;
$(window).resize(function(){
	var distanceH2 = $('.distracted-driving-woes').offset().top ;
});
$(window).scroll(function() {
    if ( $('html, body').scrollTop() >= distanceH2 ) {
        $('.distracted-driving-woes h2').css({"position": "fixed", "top": "0", "left": "0", "right": "0"})
    } else {
   		$('.distracted-driving-woes h2').css({"position": "initial"})
    }
});

	

