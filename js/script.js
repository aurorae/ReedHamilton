/** Author: Sebastiaan Deckers <sebdeckers83@gmail.com>
 **/

/* Navigation Menu
 */
(function() {
	var updateMenu = function(event) {
			var links = $("body > header > .masthead > nav > ul a");
			links.parent().filter(".active").removeClass("active");
			links
				.filter(function() { return location.hash === $(this).attr("href"); })
				.parent()
				.addClass("active");
			if(!links.parent().hasClass("active")) {
				links.parent().first().addClass("active");
			}
			event && event.preventDefault();
		};
		updateMenu();
		window.addEventListener("hashchange", updateMenu, false);
})();
$("body > header > .masthead > nav > ul").on("click", "a", function(event) {
	var link = $(event.target);
	if(link.parent().is(":not(.active)")) {
		link.closest("ul").find(".active").removeClass("active");
		link.parent().addClass("active");
	}
});
$("header nav").on("click", "a[href^=#]", function(event){
	var margin = 55,
		name = $(this).attr("href").substr(1),
		position = name.length
			? $("body, a[name=" + name + "], #" + name).last().offset().top
			: 0;
	$("body").animate({scrollTop: Math.max(0, position - margin)});
	location.hash = "#" + name;
	event.preventDefault();
});

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
			var position = $("#consultants > ul > li.active").index();
			$("#consultants > .controls > .position > li")
				.removeClass("active")
				.eq(position).addClass("active");
		},
		step = function(delta) {
			var pages = $("#consultants > ul > li"),
				from = pages.filter(".active"),
				position = pages.length > from.index() + delta
					? from.index() + delta
					: 0,
				to = pages.eq(position);
			$([from, to]).toggleClass("active");
			updatePosition();
		},
		navigate = function(position) {
			var pages = $("#consultants > ul > li");
			pages.filter(".active").removeClass("active");
			pages.eq(position).addClass("active");
			updatePosition();
		};
	$("#consultants > ul > li").each(function() {
		var name = $(this).find("> h2").text(),
			role = $(this).find("> h3").text(),
			avatar = $(this).find("> figure > img").attr("src");
		$("#consultants > .controls > .position")
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
	$("#consultants > .controls > .position").on("click", "a", function(event) {
		navigate($(this).closest("li").index());
		event.preventDefault();
	});
	$("#consultants .overview").on("click", "a", function(event) {
		navigate($(this).closest("li").index() + 1);
		event.preventDefault();
	});
	$("#consultants > .controls > .previous").on("click", function(event) {
		step(-1);
		event.preventDefault();
	});
	$("#consultants > .controls > .next").on("click", function(event) {
		step(1);
		event.preventDefault();
	});
})();
