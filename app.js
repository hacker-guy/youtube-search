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
					$(".results").append("<div class=\"thumbn\"> <a href=\"https://www.youtube.com/watch?v=" + json.items[i].id.videoId + 
						"\"><img src=\"" + json.items[i].snippet.thumbnails.medium.url + "\"></div>" );
				}
				
			} else {
				$(".results").html("Oops something went wrong here :O");
			}
		});
}

$(function() {
	videoSearch();
});