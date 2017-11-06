var Select = {
	isOpera :(navigator.userAgent.toLowerCase().indexOf('opera') != -1),
	isIE : (navigator.userAgent.toLowerCase().indexOf('msie') != -1 && !this.isOpera),
	isIE6 : (navigator.userAgent.toLowerCase().indexOf("msie 6.0") != -1),
	isSafari : (navigator.userAgent.toLowerCase().indexOf('safari') != -1),
	getElementPos : function(el){
		if (el.parentNode === null || el.style.display == 'none') {
			return false;
		}
		var parent = null;
		var pos = [];
		var box;
		if (el.getBoundingClientRect) { // IE
			box = el.getBoundingClientRect();
			var scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
			return {
				x : box.left + scrollLeft,
				y : box.top + scrollTop
			};
		} else if (document.getBoxObjectFor) { // gecko
			box = document.getBoxObjectFor(el);
			var borderLeft = (el.style.borderLeftWidth)	? parseInt(el.style.borderLeftWidth): 0;
			var borderTop = (el.style.borderTopWidth)? parseInt(el.style.borderTopWidth): 0;
			pos = [box.x - borderLeft, box.y - borderTop];
		} else { // safari & opera
			pos = [el.offsetLeft, el.offsetTop];
			parent = el.offsetParent;
			if (parent != el) {
				while (parent) {
					pos[0] += parent.offsetLeft;
					pos[1] += parent.offsetTop;
					parent = parent.offsetParent;
				}
			}
			if (this.isOpera|| (this.isSafari && el.style.position == 'absolute')) {
				pos[0] -= document.body.offsetLeft;
				pos[1] -= document.body.offsetTop;
			}
		}
		if (el.parentNode) {
			parent = el.parentNode;
		} else {
			parent = null;
		}
		while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { 
			pos[0] -= parent.scrollLeft;
			pos[1] -= parent.scrollTop;
			if (parent.parentNode) {
				parent = parent.parentNode;
			} else {
				parent = null;
			}
		}
		return {
			x : pos[0],
			y : pos[1]
		};
	},
	inittextfield : function(el){
		var selectWidth = el.offsetWidth;
		textfield = document.createElement("input");
		var txtid = "txt"+ el.id;
		textfield.id = txtid;
		textfield.style.zIndex = "99999";
		if (el.value == "") {
			textfield.value = "输入或选择";
			textfield.style.color = "#ccc";
		} else {
			textfield.value = el.value;
		}
		textfield.style.position = "absolute";
		textfield.style.top = this.getElementPos(el).y + "px";
		textfield.style.left = this.getElementPos(el).x + "px";
		textfield.style.border = "none";
		if (this.isSafari) {
			var selectButtonWidth = 18;
			textfield.style.marginTop = "0px";
			textfield.style.marginLeft = "0px";
		} else if (this.isOpera) {
			var selectButtonWidth = 27;
			textfield.style.marginTop = "4px";
			textfield.style.marginLeft = "4px";
		} else {
			if(this.isIE6)
				this.initIframe(el);
			var selectButtonWidth = 27;
			textfield.style.marginTop = "2px";
			textfield.style.marginLeft = "3px";
		}
		textfield.style.width = (selectWidth - selectButtonWidth) + "px";
		el.parentNode.appendChild(textfield);
		el.onchange = function() {
			val = this.options[this.selectedIndex].value;
			document.getElementById(txtid).value = val;
		}
		el.onfocus = function() {
			document.getElementById(txtid).style.color = "#333";
		}
		textfield.onfocus = function() {
			this.style.color = "#333";
			this.select();
		}
		textfield.onchange = function() {
			el.options[0].value = el.options[0].text = document.getElementById(txtid).value;
			el.options[0].selected = true;
		}
	},
	//解决IE6下面的问题
	initIframe : function(el) {
		var textWidth = el.offsetWidth;
		var textHeight = el.offsetHeight;
		var hackFrame = document.createElement("iframe");
		hackFrame.setAttribute("src", "about:blank");
		hackFrame.setAttribute("scrolling", "0");
		hackFrame.setAttribute("tabindex", "-1");
		hackFrame.id = "frame" + el.name;
		hackFrame.style.position = "absolute";
		hackFrame.style.width = textWidth -25+ "px";
		hackFrame.style.height = textHeight-5 + "px";
		hackFrame.style.top = this.getElementPos(el).y + "px";
		hackFrame.style.left = this.getElementPos(el).x + "px";
		hackFrame.style.marginTop = "3px";
		hackFrame.style.marginLeft = "3px";
		el.parentNode.insertBefore(hackFrame, el);
	}
}
