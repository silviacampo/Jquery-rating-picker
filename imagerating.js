
 (function ( $ ) { 
 
    $.fn.imagerating = function(options) {
    
		var settings = $.extend({}, $.fn.imagerating.defaults, options );   
 
		var x1,y1,x2,y2,W, qty;
		var imagesrc;
		
		qty = settings.imagesrcs.length -1 ;
		y1 = 0;
		y2= settings.height;
		x1 = 0;
		W = Math.round(settings.width/qty);
		x2= W;
		
		imagesrc = settings.imagesrcs[settings.defaultValue];
 

$('<input/>',{
    'type': 'hidden',  
    'name': '' + settings.inputName + '',
    'id': 'ratingID'
}).appendTo(this);
$('<img/>',{
	  'id': 'ratingImg',
    'border': '0', 
    'title': '',
    'tooltip': '',
    'alt': '',
    'src': '' +imagesrc + '',
    'usemap': '#ratingmap',
    'width': '' + settings.width + '',
    'height': '' + settings.height + ''
}).appendTo(this);
       
$('<map/>',{
    'name': 'ratingmap',
    'id': 'ratingMap'
}).appendTo(this);

function getHiddenFieldValue() { return $('#ratingID').val();};

function setHiddenFieldValue(value) { $('#ratingID').val(value );};

function setRatingImgSrc(value) {	$('#ratingImg').attr("src" , value); };


function showNewImg( event){ setRatingImgSrc(settings.imagesrcs[event.data.name]);};

function showOldImg( event){setRatingImgSrc(settings.imagesrcs[getHiddenFieldValue()]);};

function saveValue( event){
	if(getHiddenFieldValue() != event.data.name){	
		setHiddenFieldValue(event.data.name); 
		setRatingImgSrc(settings.imagesrcs[event.data.name]);	
	} else {
		setHiddenFieldValue(0); 
		setRatingImgSrc(settings.imagesrcs[0]);	
		}	
	settings.onRatingClick.call(this);	
};

		for (var i = 1; i <= qty; i++){
			$('<area/>',{
    'shape': 'rect',
    'coords': x1 +','+ y1 +','+ x2 +',' + y2,
    'alt': ''+ i +'',
    'id': 'area'+i,
		}).appendTo('#ratingMap');

			$('#area'+i).on('mouseover',{ name: i}, showNewImg).on('mouseout',{ name: i}, showOldImg).on('click',{ name: i}, saveValue);

			x1 = x2;
			x2 = x2 + W;
		}
     
     return this;    
    };   
    
    $.fn.imagerating.defaults = {
		        inputName: "rating",
		        defaultValue: 0,
            imagesrcs: ["./images/rating0s24.gif", "./images/rating2s24.gif", "./images/rating4s24.gif", "./images/rating6s24.gif", "./images/rating8s24.gif","./images/rating10s24.gif" ],
            width: 128,
            height: 24, 
            onRatingClick : function(value) {},            		
        		};

		$.fn.imagerating.getValue = function(){
			return $('#ratingID').val();
};
 
}( jQuery ));
 
