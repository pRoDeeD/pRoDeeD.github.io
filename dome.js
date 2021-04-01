var sites = {
				"Entertainment": {
					"YouTube"				: "https://www.youtube.com/",
					"HBO"					: "https://dk.hbonordic.com",
					"Netflix"				: "https://www.netflix.com/"
					"9anime"				: "https://9anime.ru/"
				},
				"MouseMods": {
					"MouseMods.EU"				: "https://www.mousemods.eu/",
					"MouseMods.US"				: "https://www.mousemods.us/",
					"Shopify"				: "https://mousemods.myshopify.com/",
					"Mailerlite"				: "https://app.mailerlite.com/"
				},
				"E-Mail": {
					"GMail"					: "https://accounts.google.com/AccountChooser/signinchooser?flowName=GlifWebSignIn&flowEntry=AccountChooser",
					"Alibaba"				: "https://message.alibaba.com/message/messenger.htm#/",
					"Aliexpress"				: "https://msg.aliexpress.com/?spm=a2g0o.best.1000001.32.72ad2c25Wb8zuM&tracelog=ws_topbar",
					"10 Minute Mail"			: "https://10minutemail.com/"
				},
				"General Utility": { // To find the game ID check the url in the store page or the community page
					//LastPass not working
					"Flaticon"				: "https://www.flaticon.com",
					"Google Drive"				: "https://drive.google.com/drive",
					"Image Search"				: "https://yandex.com/images/"
					"Adobe Images"				: "https://stock.adobe.com/dk/",
					"PNG EGG"				: "https://www.pngegg.com"

				},
				"Read The Docs": {
					"MDN"					: "https://developer.mozilla.org",
					"StackOverFlow"				: "https://stackoverflow.com/",
					"W3 Schools"				: "https://www.w3schools.com/",
					"CSS Tricks"				: "https://css-tricks.com/"
				},
				"Social": {
					"Reddit"				: "https://www.reddit.com/",
					"Instagram"				: "https://www.instagram.com/",
					"Twitter"				: "https://www.twitter.com/",
					"Facebook"				: "https://www.facebook.com/messages"
				}
			};

			var search = { // Query variable name is q, hardcoded, looks like a standard already anyways
				"default": "https://duckduckgo.com/",
				"g": "https://google.com/search",
				"s": "https://startpage.com/do/search",
				"r": "https://reddit.com/search"
			};

// ---------- BUILD PAGE ----------
var pivotmatch = 0;
var totallinks = 0;
var prevregexp = "";
function matchLinks(regex = prevregexp) {
	totallinks = 0;
	pivotmatch = regex == prevregexp ? pivotmatch : 0;
	prevregexp = regex;
	pivotbuffer = pivotmatch;
	p = document.getElementById("links");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	if (regex.charAt(1) == ' ' && search.hasOwnProperty(regex.charAt(0))) {
		document.getElementById("action").action = search[regex.charAt(0)];
		document.getElementById("action").children[0].name = "q";
	} else {
		match = new RegExp(regex ? regex : ".", "i");
		gmatches = false; // kinda ugly, rethink
		for (i = 0; i < Object.keys(sites).length; i++) {
			matches = false;
			sn = Object.keys(sites)[i];
			section = document.createElement("div");
			section.id = sn;
			section.innerHTML = sn;
			section.className = "section";
			inner = document.createElement("div");
			for (l = 0; l < Object.keys(sites[sn]).length; l++) {
				ln = Object.keys(sites[sn])[l];
				if (match.test(ln)) {
					link = document.createElement("a");
					link.href = sites[sn][ln];
					link.innerHTML = ln;
					if (!pivotbuffer++ && regex != "") {
						link.className = "selected";
						document.getElementById("action").action = sites[sn][ln];
						document.getElementById("action").children[0].removeAttribute("name");
					}
					inner.appendChild(link);
					matches = true;
					gmatches = true;
					totallinks++;
				}
			}
			section.appendChild(inner);
			matches ? p.appendChild(section) : false;
		}
		if (!gmatches || regex == "") {
			document.getElementById("action").action = search["default"];
			document.getElementById("action").children[0].name = "q";
		}
... (44 lines left)
