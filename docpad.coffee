# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			url: "http://unmonastery.org"

			# Here are some old site urls that you would like to redirect from
			oldUrls: [
				'www.unmonastery.eu'
			]

			# The default title of our website
			title: "unMonastery"

			# The website description (for SEO)
			description: """
				unMonastery is a place-based social innovation aimed at addressing the interlinked needs of empty space, unemployment and depleting social services by embedding committed, skilled individuals within communities that could benefit from their presence.
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
				unmonastery, social innovation, monastic codes, hackers, technology, coliving, coworking, co-living, co-working, hub space, open source, mythology, survival, deep time, love
				"""

			# The website author's name
			author: "Aporia"

			# The website author's email
			email: "kei@ourmachine.net"

			# Styles
			styles: [
				"//fonts.googleapis.com/css?family=Montserrat:400,700"
				"//fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic"
				"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
				"/styles/bootstrap.css"
				"//api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.css"
				"/styles/style.css"
				"/styles/bootstrap-accessibility.css"
			]

			# Scripts
			scripts: [
				"//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"
				"//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"
				"/scripts/freelancer.js"
				"/scripts/script.js"
			]



		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')


	# =================================
	# Collections
	# These are special collections that our website makes available to us

	collections:
		pages: (database) ->
			database.findAllLive({pageOrder: $exists: true}, [pageOrder:1,title:1])

		posts: (database) ->
			database.findAllLive({tags:$has:'post'}, [date:-1])


	# =================================
	# Plugins

	plugins:
		downloader:
			downloads: [
				{
					name: 'Twitter Bootstrap'
					path: 'src/files/vendor/twitter-bootstrap'
					url: 'https://codeload.github.com/twbs/bootstrap/tar.gz/master'
					tarExtractClean: true
				}
			]


	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki
	events:

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()
}


# Export our DocPad Configuration
module.exports = docpadConfig
