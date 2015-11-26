
var $projects = $("#projects");
var $projectGrid = $("#project-grid");
var $projectModals = $("#project-modals");

var $counter = 0;

var listIds = [];
var classes = ["bg-color-medium", "bg-color-lightest", "bg-color-medium"];
var $color;

var colors = [];
var cardDescs = [];
var images = [];

var $links;
var $materialURL;

var $listTitle;

Trello.get("boards/54bfcd2f0c60b21168bb98a2/lists?cards=open&attachment_fields=name,url", function(lists) {
	$.each(lists, function(ix, list) {
		// Create chapter section 
	    /*if(ix < 3) {
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
				    var $image = $("<div>")
				    	.addClass("col-sm-4")
					    .appendTo($row);
			$.each(list.cards, function(ix, card) {
				switch(card.name) {
					case "Short Description":
						$('<p>')
							.html(markdown.toHTML(card.desc))
							.appendTo($description);
						break;
					case "Color":
						$color = card.desc;
						colors[ix] = card.desc;
						break;
					case "Image":
						$('<div>')
							.html('<img class="thumbnail" src="/images/projects/'+card.desc+'">')
							.appendTo($image);
							break;
				}
			});
		}
		else {*/
			$counter = ix;
			console.log($counter);
			if($counter % 3 == 0) {
				gridRow = $("<div>")
					.addClass("row row-padded")
					.appendTo($projectGrid);
			}
			var $projectCol = $("<div>")
				.addClass("col-sm-4")
			    .appendTo($projectGrid);
			$.each(list.cards, function(ix, card) {
				if(card.name == "Image") {
					$('<img>')
						.attr("src", "/images/projects/thumbnails/"+card.desc)
						.appendTo($projectCol);
					images[$counter] = card.desc;
				}
				if(card.name == "About") {
					$listTitle = list.name.replace(/ /g, "").replace(/[^a-zA-Z0-9 -]/g, '').toLowerCase();
					//cardDescs[$listTitle] = card.desc;
					cardDescs[$counter] = card.desc;
				}
			});
			/*var $imgCaption = $("<button>")
				.addClass("btn title")
				.html("<a href='#"+ list.id +"' data-toggle='modal' data-target='#"+ list.id +"'>"+ list.name +"</a>")
				.appendTo($projectCol);*/
			var $imgCaption = $("<a>")
				.addClass("btn title")
				.attr("href", "#"+ list.id)
				.attr("data-toggle", "modal")
				.attr("data-target", "#" + list.id)
				.text(list.name)
				.appendTo($projectCol);
			var $modal = $("<div>")
				.addClass("modal fade portfolio-modal project-modal")
				.attr("id", list.id)
				.appendTo($projectModals);

			var $modalContent = $("<div>")
				.addClass("modal-content")
				.appendTo($modal);

			var $modalHeader = $("<div>")
				.addClass("modal-header")
				.html('<div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl"></div></div></div><h2>' + list.name + '</h2>')
				.appendTo($modalContent);

			var $modalBody = $("<div>")
				.addClass("modal-body container")
				.appendTo($modalContent);

			var $imageMain = $("<div>")
				.html('<img class="thumbnail" src="/images/projects/'+ images[$counter] +'">')
				.appendTo($modalBody);

			var $modalColLeft = $("<div>")
				.addClass("col-sm-12")
				.appendTo($modalBody);

			/*** End of project sections ***/

			var $listGroup = $("<div>")
				.addClass("list-group")
				.appendTo($modalColLeft);

			$.each(list.cards, function(ix, card) {
				$.each(card.labels, function(ix, label) {
					if(label.name === "Link") {
						$materialURL = card.desc;
						var $cardAttach = $("<a>")
							.addClass("list-group-item")
							.attr("href", $materialURL)
							.attr("target", "_blank")
							.text(card.name)
							.appendTo($listGroup);
					};
				});
				/*if(card.name == "Contact") {
					var $contact = $("div")
						.text(markdown.toHTML(card.desc))
						.appendTo($modalColRight);
				};*/
			});

			var $modalDescription = $("<div>")
				.html(markdown.toHTML(cardDescs[$counter]))
				.appendTo($modalColLeft);

		//}
	});
});