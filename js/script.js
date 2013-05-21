/** Authors: Sebastiaan Deckers <sebdeckers83@gmail.com>,
 ** 
 **/

/* Highlight External Links
 */
$(function() { $("a[href][rel=external]").attr({target: "_blank"}); });

/* Firm Practices
 */
$("#firm > aside li:not(.active) .snippet").hide();
$("#firm > aside").on("click", "a", function(event) {
	var section = $(event.target).closest("li"),
		isActive = section.hasClass("active");
	section
		.parent().children().filter(".active")
			.removeClass("active")
			.find(".snippet").slideUp();
	!isActive && section
		.addClass("active")
		.find(".snippet").slideDown();
	event.preventDefault();
});

/* Consultants Carousel
 */
(function() {
	var step = function(delta) {
			var pages = $("#consultants > section > ul > li"),
				from = pages.filter(".active"),
				position = pages.length > from.index() + delta
					? from.index() + delta
					: 0,
				to = pages.eq(position);
			$([from, to]).toggleClass("active");
		},
		navigate = function(position) {
			var pages = $("#consultants > section > ul > li");
			pages.filter(".active").removeClass("active");
			pages.eq(position).addClass("active");
			showControls();
		},
		showControls = function() {
			$("#consultants > section > .controls").removeClass("hidden");
		};
	$("#consultants > section > ul > li").each(function() {
		var name = $(this).find("> h2").html(),
			role = $(this).find("> h3").text(),
			location = $(this).find("> h4").text(),
			avatar = $(this).find("> figure > img").attr("src");
		if(!name || !avatar) return;
		$("#consultants .overview")
			.append("<li>" +
				"<a href=''>" +
					"<img src='" + avatar.replace("_real.png", "_vect.png") + "' />" +
					"<span class='name'>" + name + "</span>" +
					"<span class='role'>" + role + "</span>" +
					"<span class='location'>" + location + "</span>" +
				"</a>" +
			"</li>");
	});
	$("#consultants .overview").on("click", "a", function(event) {
		navigate($(this).closest("li").index());
		event.preventDefault();
	});
	$("#consultants > section > .controls > .previous").on("click", function(event) {
		step(-1);
		event.preventDefault();
	});
	$("#consultants > section > .controls > .next").on("click", function(event) {
		step(1);
		event.preventDefault();
	});
	if($("#consultants > section > ul > li").hasClass("active")) {
		showControls();
	}
})();