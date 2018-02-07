var nextpage = null;
var prevpage = null;
var searchtext = null;

function videoSearch() {
	$("#searchform").submit(function(event) {
		event.preventDefault();
		searchtext = $("#jstext").val();
		searchYoutube(searchtext);
	});
}

function searchYoutube (text) {
	$.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet\
		&q="+text+"&maxResults=10&type=video&key=AIzaSyA_umswAZe_kez-yvwjY8nZj0Qr6lKaJnc"
		, function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				$(".results").html("");
				if (json.items.length == 0) {
					$(".results").html("Nothing to see here :(");
				}
				for (var i = 0; i < json.items.length; i++) {
					$(".results").append("<div class=\"thumbn\"> <a href=\"https://www.youtube.com/watch?v=" + 
						json.items[i].id.videoId + "\"><img src=\"" + json.items[i].snippet.thumbnails.medium.url + "\"> <br> <span>" +
					 	json.items[i].snippet.title + "</span></div>" );
					$("#nav_form").removeAttr("hidden");
				}
				updateNav(json.nextPageToken, json.prevPageToken);
			} else {
				$(".results").html("Oops something went wrong here :O");
			}
		});
}

$(document).ready(function()  {
	$(document).on("click", "#prev", function(event) {
		event.preventDefault();
		$.getJSON("https://www.googleapis.com/youtube/v3/&search?pageToken=" + prevpage + "&part=snippet\
		&q="+searchtext+"maxResults=10&type=video&key=AIzaSyA_umswAZe_kez-yvwjY8nZj0Qr6lKaJnc"
		, function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				$(".results").html("");
				if (json.items.length == 0) {
					$(".results").html("Nothing to see here :(");
				}
				for (var i = 0; i < json.items.length; i++) {
					$(".results").append("<div class=\"thumbn\"> <a href=\"https://www.youtube.com/watch?v=" + 
						json.items[i].id.videoId + "\"><img src=\"" + json.items[i].snippet.thumbnails.medium.url + "\"> <br> <span>" +
					 	json.items[i].snippet.title + "</span></div>" );
					$("#nav_form").removeAttr("hidden");
				}
				updateNav(json.nextPageToken, json.prevPageToken);
			} else {
				$(".results").html("Oops something went wrong here :O");
			}
		});
	});
	$(document).on("click", "#next", function(event) {
		event.preventDefault();
		$.getJSON("https://www.googleapis.com/youtube/v3/&search?pageToken=" + nextpage + "&part=snippet\
		&q="+searchtext+"&maxResults=10&type=video&key=AIzaSyA_umswAZe_kez-yvwjY8nZj0Qr6lKaJnc"
		, function(json) {
			console.log(json);
			if (json != "Nothing found.") {
				$(".results").html("");
				if (json.items.length == 0) {
					$(".results").html("Nothing to see here :(");
				}
				for (var i = 0; i < json.items.length; i++) {
					$(".results").append("<div class=\"thumbn\"> <a href=\"https://www.youtube.com/watch?v=" + 
						json.items[i].id.videoId + "\"><img src=\"" + json.items[i].snippet.thumbnails.medium.url + "\"> <br> <span>" +
					 	json.items[i].snippet.title + "</span></div>" );
					$("#nav_form").removeAttr("hidden");
				}
				updateNav(json.nextPageToken, json.prevPageToken);
			} else {
				$(".results").html("Oops something went wrong here :O");
			}
		});
	});
});

function updateNav(next, prev) {
	if (next) {
		$("#next").removeAttr("disabled");
		nextpage = next;
	} else {
		$("#next").prop('disabled', true);
	}
	if (prev) {
		$("#prev").removeAttr("disabled");
		prevpage = prev;
	} else {
		$("#prev").prop('disabled', true);
	}
}

function windowScroll() {
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	       $(".footer").fadeIn("slow").removeAttr("hidden");
	     
	    }else{
	        
	        $(".footer").fadeOut("slow").prop('hidden', true);
	        
	   }
	});
}

$(function() {
	videoSearch();
	windowScroll();
});