shinyjs.download=function (params){
	
	var defaultParams = {
		url : null,
		strFileName : null,
		strMimeType : null
	};
	params = shinyjs.getParams(params, defaultParams);
	
	url= params.url;
	strFileName=params.strFileName
	strMimeType=params.strMimeType
	
	var self = window, // this script is only for browsers anyway...
		defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
		anchor = document.createElement("a"),
		fileName = strFileName || "download";

	if ('download' in anchor) { //html5 A[download]
		anchor.href = url;
		anchor.setAttribute("download", fileName);
		anchor.className = "download-js-link";
		anchor.innerHTML = "downloading...";
		anchor.style.display = "none";
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		return true;
	}

	// handle non-a[download] safari as best we can:
	if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
		url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
		if(!window.open(url)){ // popup blocked, offer direct download:
			if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
		}
		return true;
	}

	//do iframe dataURL download (old ch+FF):
	var f = document.createElement("iframe");
	document.body.appendChild(f);

	if(!winMode){ // force a mime that will download:
		url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
	}
	f.src=url;
	setTimeout(function(){ document.body.removeChild(f); }, 333);
	return true;
}//end saver