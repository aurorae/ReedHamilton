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
$(function(){
	$("body").on("click", "a[href^=#]", function(event){
		var margin = 55,
			name = $(this).attr("href").substr(1),
			position = name.length
				? $("a[name=" + name + "], #" + name).offset().top
				: 0;
		$("body").animate({scrollTop: Math.max(0, position - margin)});
		location.hash = "#" + name;
		event.preventDefault();
	});
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
