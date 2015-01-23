
var $projects = $("#projects");

var $counter = 0;

var listIds = [];
var classes = ["bg-color-medium", "bg-color-lightest", "bg-color-medium"];
var $color;

var $materialURL;

Trello.get("boards/54bfcd2f0c60b21168bb98a2/lists?cards=open&attachment_fields=name,url", function(lists) {
	$.each(lists, function(ix, list) {
		// Create chapter section 
	    if(ix < 3) {
		    var $project = $("<section>")
		    .addClass("project")
		    .addClass(classes[ix])
		    .attr("id", list.id)
		    .attr("name", list.id)
		    .appendTo($projects);
			    // Create container for content
			    var $container = $("<div>")
			    	.addClass("container")
			    	.html("<h2 class='text-center'>" + list.name + "</h2>")
				    .appendTo($project);
				var $row = $("<div>")
			    	.addClass("row row-padded")
			    	.appendTo($container);
				    // Create description area
				    var $description = $("<div>")
				    	.addClass("col-sm-8")
					    .appendTo($row);
				    // Create materials area
				    var $materials = $("<div>")
				    	.addClass("col-sm-4 list-group")
					    .appendTo($row);
			$.each(list.cards, function(ix, card) {
				switch(card.name) {
					case "About":
						$('<p>')
							.html(markdown.toHTML(card.desc))
							.appendTo($description);
						break;
					case "Color":
						$color = card.desc;
						colors[ix] = card.desc;
						break;
				}
				$.each(card.labels, function(ix, label) {

					if(label.name === "MATERIAL") {
						if(card.desc) {
							$materialURL = card.desc;
						}
						else {
							$materialURL = '#';
						}
						var $cardAttach = $("<a>")
							.addClass("list-group-item")
							.attr("href", $materialURL)
							.attr("target", "_blank")
							.text(card.name)
							.appendTo($materials);
					}
					else if(label.name === "CARD") {
						var $cardAttach = $("<button>")
							.addClass("btn-sm btn-other")
							.text(card.name)
							.appendTo($materials);					
					}
				});
			});
		};
		var $projectGrid = $("div")
			.addClass("container")
			.attr("id","project-grid")
			.appendTo($projects);
		var $projectIcon = $("div")
			.addClass("col-sm-4")
			.text(list.name)
			.appendTo($projectGrid);
		/*** End of project sections ***/
	});
});