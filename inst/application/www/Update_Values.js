$(document).on('shiny:inputchanged', function(event) {

var js_make_c1;
var rr_c1_make = document.getElementById("rr_c1.make.dd").querySelector(".item");
var pd_c1_make = document.getElementById("pd_c1.make.dd").querySelector(".item");

if (rr_c1_make != null & pd_c1_make === null) {
	if (event.name === 'rr_c1.make.dd') {
		js_make_c1 = rr_c1_make.innerHTML;
		Shiny.onInputChange("js_make_c1", js_make_c1);
		}
}
if (rr_c1_make === null & pd_c1_make != null) {
	if (event.name === 'pd_c1.make.dd') {
		js_make_c1 = pd_c1_make.innerHTML;
		Shiny.onInputChange("js_make_c1", js_make_c1);
		}
}

if (rr_c1_make != null & pd_c1_make != null) {
  if (event.name === 'rr_c1.make.dd') {		
		js_make_c1 = rr_c1_make.innerHTML;
		document.getElementById("pd_c1.make.dd").querySelector(".item").innerHTML = document.getElementById("rr_c1.make.dd").querySelector(".item").innerHTML;
		Shiny.onInputChange("js_make_c1", js_make_c1);
  }
    if (event.name === 'pd_c1.make.dd') {
		js_make_c1 = pd_c1_make.innerHTML;
		document.getElementById("rr_c1.make.dd").querySelector(".item").innerHTML = document.getElementById("pd_c1.make.dd").querySelector(".item").innerHTML;
		Shiny.onInputChange("js_make_c1", js_make_c1);
  }
}


var js_make_c2;
var rr_c2_make = document.getElementById("rr_c2.make.dd").querySelector(".item");
var pd_c2_make = document.getElementById("pd_c2.make.dd").querySelector(".item");

if (rr_c2_make != null & pd_c2_make === null) {
	if (event.name === 'rr_c2.make.dd') {
		js_make_c2 = rr_c2_make.innerHTML;
		Shiny.onInputChange("js_make_c2", js_make_c2);
		}
}
if (rr_c2_make === null & pd_c2_make != null) {
	if (event.name === 'pd_c2.make.dd') {
		js_make_c2 = pd_c2_make.innerHTML;
		Shiny.onInputChange("js_make_c2", js_make_c2);
		}
}

if (rr_c2_make != null & pd_c2_make != null) {
  if (event.name === 'rr_c2.make.dd') {
		js_make_c2 = rr_c2_make.innerHTML;
		document.getElementById("pd_c2.make.dd").querySelector(".item").innerHTML = document.getElementById("rr_c2.make.dd").querySelector(".item").innerHTML;
		Shiny.onInputChange("js_make_c2", js_make_c2);
  }
    if (event.name === 'pd_c2.make.dd') {
		js_make_c2 = pd_c2_make.innerHTML;
		document.getElementById("rr_c2.make.dd").querySelector(".item").innerHTML = document.getElementById("pd_c2.make.dd").querySelector(".item").innerHTML;
		Shiny.onInputChange("js_make_c2", js_make_c2);
  }
}

var js_make_c3;
var rr_c3_make = document.getElementById("rr_c3.make.dd").querySelector(".item");
var pd_c3_make = document.getElementById("pd_c3.make.dd").querySelector(".item");

if (rr_c3_make != null & pd_c3_make === null) {
	if (event.name === 'rr_c3.make.dd') {
		js_make_c3 = rr_c3_make.innerHTML;
		Shiny.onInputChange("js_make_c3", js_make_c3);
		}
}
if (rr_c3_make === null & pd_c3_make != null) {
	if (event.name === 'pd_c3.make.dd') {
		js_make_c3 = pd_c3_make.innerHTML;
		Shiny.onInputChange("js_make_c3", js_make_c3);
		}
}

if (rr_c3_make != null & pd_c3_make != null) {
  if (event.name === 'rr_c3.make.dd') {
		js_make_c3 = rr_c3_make.innerHTML;
		document.getElementById("pd_c3.make.dd").querySelector(".item").innerHTML = document.getElementById("rr_c3.make.dd").querySelector(".item").innerHTML;
		Shiny.onInputChange("js_make_c3", js_make_c3);
  }
    if (event.name === 'pd_c3.make.dd') {
		js_make_c3 = pd_c3_make.innerHTML;
		document.getElementById("rr_c3.make.dd").querySelector(".item").innerHTML = document.getElementById("pd_c3.make.dd").querySelector(".item").innerHTML;
		Shiny.onInputChange("js_make_c3", js_make_c3);
  }
}

if (event.name === '#tab-6760-7') {
	alert(':)');
	}
});

