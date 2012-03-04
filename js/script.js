/** Authors: Sebastiaan Deckers <sebdeckers83@gmail.com>,
 **          Veronica <veronica@aurorae.sg>
 **/

/* Highlight External Links
 */
(function() { $("a[href][rel=external]").attr({target: "_blank"}); })();

/* Firm Practices
 */
$("#firm > aside li:not(.active) .snippet").hide();
$("#firm > aside").on("click", "a", function(event) {
	var section = $(event.target).closest("li");
	section
		.siblings().filter(".active")
			.removeClass("active")
			.find(".snippet").slideUp();
	section
		.addClass("active")
		.find(".snippet").slideDown();
	event.preventDefault();
});

/* Consultants Carousel
 */
(function() {
	var updatePosition = function() {
			var position = $("#consultants > section > ul > li.active").index();
			$("#consultants > .controls > .position > li")
				.removeClass("active")
				.eq(position).addClass("active");
		},
		step = function(delta) {
			var pages = $("#consultants > section > ul > li"),
				from = pages.filter(".active"),
				position = pages.length > from.index() + delta
					? from.index() + delta
					: 0,
				to = pages.eq(position);
			$([from, to]).toggleClass("active");
			updatePosition();
		},
		navigate = function(position) {
			var pages = $("#consultants > section > ul > li");
			pages.filter(".active").removeClass("active");
			pages.eq(position).addClass("active");
			updatePosition();
		};
	$("#consultants > section > ul > li").each(function() {
		var name = $(this).find("> h2").text(),
			role = $(this).find("> h3").text(),
			avatar = $(this).find("> figure > img").attr("src");
		$("#consultants > section > .controls > .position")
			.append("<li><a href=''>" + name + "</a></li>");
		if(!name || !avatar) return;
		$("#consultants .overview")
			.append("<li>" +
				"<a href=''>" +
					"<img src='" + avatar.replace("_real.png", "_vect.png") + "' />" +
					"<span class='name'>" + name + "</span>" +
					"<span class='role'>" + role + "</span>" +
				"</a>" +
			"</li>");
	});
	updatePosition();
	$("#consultants > section > .controls > .position").on("click", "a", function(event) {
		navigate($(this).closest("li").index());
		event.preventDefault();
	});
	$("#consultants .overview").on("click", "a", function(event) {
		navigate($(this).closest("li").index() + 1);
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
})();
