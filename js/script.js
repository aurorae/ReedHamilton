/** Author: Sebastiaan Deckers <sebdeckers83@gmail.com>
 **/

/* Navigation Menu
 */
(function() {
	var updateMenu = function() {
			var links = $("body > header > .masthead > nav > ul a");
			links.parent().filter(".active").removeClass("active");
			links
				.filter(function() { return location.hash === $(this).attr("href"); })
				.parent()
				.addClass("active");
			if(!links.parent().hasClass("active")) {
				links.parent().first().addClass("active");
			}
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

/* Firm Practices
 */
$("#firm > aside li:not(.active) .snippet").hide();
$("#firm > aside").on("click", "a", function(event) {
	event.preventDefault();
	var section = $(event.target).closest("li");
	section
		.siblings().filter(".active")
			.removeClass("active")
			.find(".snippet").slideUp();
	section
		.addClass("active")
		.find(".snippet").slideDown();
});
