jQuery(document).ready(function($){

	var dataURL = "data/data.json",
		dataModel = {},
		$body = $('body'),
		$gallery = $('.gallery'),
		$overlay;

	function loadData(){
		$.getJSON(dataURL, function(data){
			dataModel.images = data;
			dataModel.lastIndex = dataModel.images.length - 1;
			init();
		})
	}

	function init(){
		renderThumbsView();
		addThumbsController();
		renderOverlayView();
		addOverlayControllers();
	}

	function renderThumbsView(){

		 $gallery.html(Templates.thumbs(dataModel));
	}

	function addThumbsController(){

		var $thumbs = $gallery.find('img');

		$thumbs.click(function(){
			dataModel.currentIndex = $thumbs.index($(this));
			addOverlay();
			loadImage();
		});
	}

	function renderOverlayView(){
		$overlay = $(Templates.overlay());
	}

	function addOverlayControllers(){
		$overlay.find('.close-btn').click(function(){
			removeOverlay();
		});
		$overlay.click(function(e){
			if(e.target === this){
				removeOverlay();
			}
		});
		$overlay.find('.next-btn').click(function(){
			dataModel.currentIndex = dataModel.currentIndex < dataModel.lastIndex? dataModel.currentIndex + 1 : 0;
			loadImage();
		});
		$overlay.find('.prev-btn').click(function(){
			dataModel.currentIndex = dataModel.currentIndex > 0? dataModel.currentIndex - 1 : dataModel.lastIndex;
			loadImage();
		});
	}

	function loadImage(){
		var image = dataModel.images[dataModel.currentIndex];
		$overlay.find('figure').html(Templates.image(image));
		$overlay.find('img').css({opacity: 0}).load(function(){
			$(this).velocity('fadeIn', {duration: 300});
		})
	}

	function addOverlay(){
		$body.append($overlay).css({overflow: 'hidden'})
	}

	function removeOverlay(){
		$overlay.detach();
		$body.css({overflow: 'scroll'});
	}

	loadData();

});