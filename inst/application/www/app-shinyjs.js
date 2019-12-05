// whenever the user navigates with the previous/next buttons in the browser,
// tell the Shiny app to restore the history based on the URL navigated to
shinyjs.init = function() {
  window.onpopstate = function (event) {
    Shiny.onInputChange('navigatedTo', location.search);
  }
}

// update the URL to reflect the current state
shinyjs.updateHistory = function(params) {
  var queryString = [];
  for (var key in params) {
    queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
  }
  queryString = '?' + queryString.join('&');
  history.pushState(null, null, queryString)
}

shinyjs.setTitle=function(params){
	var defaultParams = {
		Title : "Alphatech Solutions"
	};
	params = shinyjs.getParams(params, defaultParams);
	document.title=params.Title;
}

shinyjs.getcookie = function(params) {
var cookie = Cookies.get("id");
if (typeof cookie !== "undefined") {
Shiny.onInputChange("jscookie", cookie);
} else {
var cookie = "";
Shiny.onInputChange("jscookie", cookie);
}
}
shinyjs.setcookie = function(params) {
Cookies.set("id", escape(params), { expires: 0.5 });
Shiny.onInputChange("jscookie", params);
}
shinyjs.rmcookie = function(params) {
Cookies.remove("id");
Shiny.onInputChange("jscookie", "");
}
