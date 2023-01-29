function deepClone(origin,target){              //对象与对象之间的深度克隆方法
	var target=target||{},
	toStr=Object.prototype.toString,
	arrStr="[Object Array]";
	for(var prop in obj){
		if(origin.hasOwnProperty(prop)){
			if(typeof(origin[prop])=='Object'&&origin[prop]!=='null'){
				if(toStr.call(origin[prop])==arrStr){
					target[prop]=[];
				}else{
					target[prop]={};
				}
				deepClone(origin[prop],target[prop]);
			}else{
				target[prop]=origin[prop];
			}
	}
	}
	return target;
}

var inherit = (function(){                         //构造函数属性方法的继承
	var F=function(){};
	return function(Target,Origin){
		F.prototype=Origin.prototype;
		Target.prototype=new F();
		Target.prototype.constuctor=Target;
		Target.prototype.uber=Origin.prototype;//可有可无;
	}
}());//(用闭包解决闭包)
 
function packType(target){                          //各个数据类型的区分方法;
var tar=typeof(target);
var obj={
		'[object Array]' : 'array',
		'[object Object]' : 'Object',
		'[object Number]' : 'Object-number',
		'[object Boolean]' : 'Object-boolean',
		'[object String]' : 'Object-string',
	}
	if(target === null){
		return 'null';
	}
	if(tar == 'object'){
		var str = Object.prototype.toString.call(target);
		return obj[str];
	}else{
		return tar;
	}
};


Array.prototype.unique = function(){               //数组去重方法; arr.unique();
		var arr = [];
		var obj = {};
		var len = this.length;
		for(var i =0;i<len;i++){
			if(!obj[this[i]]){
				arr.push(this[i]);
				obj[this[i]]='abc';
			}
		}
		return arr;
};


Array.prototype.foundstr = function (){               //寻找数组中只出现过一次的第一个值;
		var Str="",
		num=0,
		len=this.length;
		for(var i = 0;i<len;i++){
			Str=this[i];
		for(var j = 0;j<len;j++){
			var str=this[j];
			if(Str == str&&j!=i){
				num++;	
			}
		}
		if(num == 0){
			return Str;
		}else{
			num = 0;
		}
	}
}

function parentElemNode(e,n){                    //返回元素e的第n层祖先元素节点;
	var element = document.getElementsByTagName(e)[0];
	for(var i = 1;i<=n;i++){
		if(element == null){
			break;
		}else{
			element=element.parentElement;
		}
	}
	return element;
}

function retSibling(e,n){                      //返回元素e的第n个兄弟元素节点;
	while(e && n){
		if(n > 0){
			if(e.nextElementSibling){
				e=e.nextElementSibling;
			}else{
				for(e = e.nextSibling; e && e.nodeType != 1;e = e.nextSibling);
			}
			n--;
		}else{
			if(e.previousElementSibling){
				e=e.previousElementSibling;
			}else{
				for(e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
			}
			n++;
		}
		
	}
	return e;
}


Element.prototype.myChildren = function(){      //封装自己的Children方法以兼容所有浏览器;
	var child = this.childNodes,
		arr = [],
		len = child.length;
		for(var i = 0;i < len;i ++){
			if(child[i].nodeType == 1){
				arr.push(child[i]);
			}
		}
	return arr;
}

function contains(refNode,otherNode) {		//判断otherNode 是否为 refNode的子元素,需要 **引入客户端检测脚本;
	if(typeof refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)) {
		return refNode.contains(otherNode);
	}else if(typeof refNode.compareDoucmentPosition == "function") {
		return !!(refNode.compareDocumentPosition(otherNode) & 16);
	}else {
		var node = otherNode.parentNode;
		do {
			if(node == refNode){
				return true;
			}else {
				node = node.parentNode;
			}
		}while(node !== null);
		return false;
	}
}

function converToArray(nodes) {		//返回元素子元素的集合的兼容模式;nodes 为元素子元素的集合
	var array = null;
	try{
		array = Array.prototype.slice.call(nodes,0);	//针对非IE浏览器;
	}catch(ex) {
		array = new Array();
		for(var i = 0,len = nodes.length;i < len;i ++) {
			array.push(nodes[i]);
		}
	}
	return array;
}

Element.prototype.hasChildren = function(){     //封装自己的hasChildNodes方法以兼容所有浏览器;
	var child = this.childNodes,
		arr =[],
		len = child.length;
		for(var i =0;i < len;i ++){
			if(child[i].nodeType == 1){
				return true;
			}
		}
	return false;
}

Element.prototype.insertAfter = function(insertedNode,adjacentNode){     //将元素标签放在目标元素后面;(与insertBefore相反)
	var node = adjacentNode.nextElementSibling;
	if(node == null){
		this.appendChild(insertedNode);
	}else{
		this.insertBefore(insertedNode,node);
	}
}

Element.prototype.reverseOrder = function(){                  //将目标借点内部的节点顺序逆序;
	var child = this.children,
	    arr = [],
		len = child.length;
	for(var i = 0; i <len; i ++){
			arr.push(child[i]);
	}
	for(var i = len-2; i >= 0 ; i --){
		this.appendChild(arr[i])
	}
}

Date.prototype.getThisTime = function(){                  //获取当前时间;
	var date = new Date();
	return date.getFullYear()+"年"+
		   (date.getMonth()+1)+"月"+
		   date.getDate()+"日"+
		   date.getHours()+"时"+
		   date.getMinutes()+"分"+
		   date.getSeconds()+"秒";	
}

function getScrollOffset(){                    //求滚动轮的滚动距离;
	if(window.pageXOffset){
		return{
			x: window.pageXOffset,
			y: window.pageYOffset,
		}
	}else{
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

function scrollToTop(element) {		//将滚动条回到顶部;
	if(element.scrollTop != 0) {
		element.scrollTop = 0;
	}
}

function getViewportOffset(){                 //返回浏览器视口尺寸;
	if(window.innerWidth){
		return{
			width: window.innerWidth,
			height: window.innerHeight
		}
		
	}else{
		if(document.compatMode === BackCompat){
			return{
				width: document.body.clientWidth,
				hieght: document.body.clientHeight,
			}
			
		}else{
			return{
			width: document.docuemtnElement.clientWidth	,
			height: document.documentElement.clientHeight
			}
		}
	}
}

Element.prototype.getElementPosition = function(){                   //求元素相对于文档的坐标;
	var posX = 0,
		posT = 0,
		parent = this;
	while(parent !== null){
		posX += parent.offsetLeft;
		posT += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return{
		Left: posX,
		Top: posT, 
	}
}

function getElementLeft(element) {	//返回元素相对于父元素的offsetLeft值;
	var actualLeft = element.offsetLeft,
		current = element.offsetParent;
	while(current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}

function getElementTop(element) {	//返回元素相对于父元素的offsetTop的值;
	var actualTop = element.offsetTop,
		current = element.offsetParent;
	while(current !== null) {
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

function getBoundingClientRect(element) {		//返回元素大小的兼容性写法;
	var scrollTop = document.documentElement.scrollTop,
		scrollLeft = document.documentElement.scrollLeft;
	if(element.getBoundingClientRect) {
		if(typeof arguments.callee.offset != "number") {
			var temp = document.createElement("div");
			temp.style.cssText = "position:absolute;left:0;top:0;";
			document.body.appendChild(temp);
			arguments.callee.offset = - temp.getBoundingClientRect().top - scrollTop;
			document.body.removeChild(temp);
			temp = null;
		}
		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;
		return {
			left : rect.left + offset,
			right : rect.right + offset,
			top : rect.top + offset,
			bottom : rect.bottom + offset
		};
	}else {
		var actualLeft = getElementLeft(element);
		var acutalTop = getElementTop(element);
		return {
			left : actualLeft - scrollLeft,
			right : actualRight + element.offsetWidth - scrollLeft,
			top : actualTop - scrollTop,
			bottom : actualBottom + element.offsetHeight - scrollTop
		}
	}
}

function getStyle(ele,prop){                                         //查询样式的兼容方法;
	if(window.getComputedStyle(ele,null)){
		return window.getComputedStyle(ele,null)[prop];
	}else{
		return ele.currentStyle[prop];
	}	
}

function addEvent(elem,type,handle){                             //封装兼容的事件处理程序的方法;
	if(elem.addEventListener){
	   elem.addEventListener(type,handle,false);
	}else if(elem.attachEvent){
		elem.attachEvent('on' + type,function(){
			handle.call(elem);
		});
	}else{
		elem['on' + type] = handle;
	}
}

function stopBubble(event){                      //阻止冒泡事件的兼容函数;
	if(event.sopPropagation){
		event.stopPropagation();
	}else{
		event,cancelBubble = true;
		
	}
}

function cancelHandler(event){                    //阻止默认事件的兼容函数;
	if(event.preventDefault){
		event.preventDefault();
	}else{
	    event.returnValue = false;
	}
}

function retNumForArea(maxNum,minNum){                          //生成在一个范围内的随机数;
	var x = Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
	return x;
}

function loadScript(url,callback){                         //异步加载JS的兼容方法;
	var script = document.createElement('script');
	script.type = 'text/javascript';
	if(script.readyState){
		script.onreadystatechange = function(){        //IE的方法;
			if(script.readyState == 'complete' || script.readyState == 'loaded'){
				callback();
			}
		}		
	}else{         //Safari chrome firefox opera的方法;
		script.onloaded = function(){
			callback();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}

function Table(args) {		//表单的快速生成;
    var tab = document.createElement('table');      //添加table;
    var elem = args.elem;
    tab.classList.add('tableDiy');
    tab.border = 1;         //设置表单边框;
    tab.width = '100%';
    elem.appendChild(tab);

    var thead = document.createElement('thead');        //添加表头;
    var theadCon = args.tHead;
    tab.appendChild(thead);
    Object.keys(theadCon).forEach(function (key) {
        var th = document.createElement('th');
        thead.appendChild(th);
        th.innerText = theadCon[key];
    });

    var tbody = document.createElement('tbody');    //添加表单主体;
    var con = args.con;
    tab.appendChild(tbody);
    Object.keys(con).forEach(function (key) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (var item in con[key]) {
            if (theadCon[item] == null) {
                alert('傻叉');
                throw ('你他妈就是一个傻子');
            }
            var td = document.createElement('td');
            td.innerText = con[key][item];
            td.style.textAlign = 'center';
            tr.appendChild(td);
        }
    });

}

function cssTransform(obj, attr, val) {     //对transform属性值得设置或获取;
	if (!obj.pos) {
		obj.pos = {};
	}
	switch (arguments.length) {
		case 2:
			return obj.pos[attr]; break;
		case 3:
			obj.pos[attr] = val;
			var str = "";
			for (var key in obj.pos) {
				switch (key) {
					case 'transform':
					case 'translateX':
					case 'translateY':
					case 'translateZ':
						var str = "";
						str += key + '(' + obj.pos[key] + 'px)';
						break;
				}
			}
			obj.style.transform = str;
			break;
	}
}

function each(args, callbacks) {      //遍历方法;
	var i = args.start;
	for (; i <= args.end; i++) {
		callbacks(i);
	}
}

function randomColor(){         //生成随机颜色方法;
	return '#' + Math.random().toString(16).slice(-6);
}

function sortArr(value1,value2) {	//数组升序排序;
	return value1 - value2;
}

function hasPrototypeProperty( object , name ) {	//判断该属性是否存在于对象中还是在原型中;
	return !object.hasOwnProperty(name) && (name in object);
}

function definePro( object , name , boolean , ) {	//重新设置构造函数,只适用于es5兼容的浏览器;
	Object.defineProperty( object.prototype , name , {
		enumerable : boolean,
		value : object,
	});
}

function inheritPrototype( subType , superType ) {		//寄生组合式继承方法;
	var prototype = object(superType.prototype);
	prototype.constuctor = subType;
	subType.prototype = prototype;
}

function hasPlugin(name) {	//检测除IE的其他插件;
	name = name.toLowerCase();
	for(var i = 0; i < navigator.plugins.length; i ++){
		if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
			return true;
		}
	}
	return false;
}

function hasIePlugin(name) {	//检测IE的插件
	try{
		new ActiveXObject(name);
		return true;
	}catch(ex){
		return false;
	}
}

function hasFlash(){	//检测所有浏览器中的Flash;
	var result = hasPlugin('Flash');
	if(!result){
		result = hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
	}
	return result;
}
function hasQuickTime() {	//检测所有浏览器中的QuickTime;
	var result = hasPlugin('QuickTime');
	if(!result){
		result = hasIEPlugin('QuickTime.QuickTime');
	}
	return result;
}

function isHostMethod(object,property) {	//浏览器环境下测试任何对象的某个特性是否存在;
	var t = typeof object[property];
	return t == 'function' || 
				(!!(t == 'object' && object[property])) ||
				t == 'unknown';
}

function ajax(method, url, data, success) {		//ajax的兼容性封装函数;method : get || post,success : 回调函数;
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if (method == 'get' && data) {
		url += '?' + data;
	}
	
	xhr.open(method,url,true);
	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange = function() {
		
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}
		
	}
}

function outputAttributes(element) {	//遍历元素节点的特性;
	var pairs = new Array(),
		attrName,
		attrValue,
		i,
		len;
	for(i = 0,len = element.attributes.length;i < len;i ++) {
		attrName = element.attributes[i].nodeName;
		attrValue = element.attributes[i].nodeValue;
		if(element.attributes[i].specified){
			pairs.push(attrName + "=\"" + attrValue + "\"");
		}
	}
	return pairs.join(" ");
}

function loadScript(url) {		//动态添加外部javascript脚本的方法;
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.body.appendChild(script);
}

function loadScriptString(code) {	//动态添加行内javascript的文本内容;
	var script = document.createElement('script');
	script.type = 'text/javascript';
	try{
		script.appendChild(document.createTextNode(code));
	}catch(ex) {
		script.text = code;
	}
	document.body.appendChild(script);
}

function loadStyle(url) {	//动态添加外部CSS脚本的方法;
	var link = document.createElement('link');
	link.src = url;
	link.type = 'text/css';
	link.rel= 'stylesheet';
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
}

function loadStyleString(code) {	//动态添加行内css的文本内容;
	var style = document.createElement('style');
	style.type = 'text/css';
	try{
		style.appendChild(document.createTextNode(code));
	}catch(ex) {
		style.stylesheet.cssText = code;
	}
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(style);
}

function matchesSelector(element,selector) {	//matchesSelector() 的兼容性方法;
	if(element.matchesSelector) {
		return element.matchesSelector(selector);
	}else if(element.msMatchesSelector) {
		return element.msMatchesSelector(selector);
	}else if(element.mozMatchesSelector) {
		return element.mozMatchesSelector(selector);
	}else if(element.webkitMatchesSelector) {
		return element.webkitMatchesSelector(selector);
	}else {
		throw new Error("Not suported.");
	}
}

function contains(refNode, otherNode) {		//判断元素间的位置关系;refNode:参照物节点; otherNode:测试节点;
	if(typeof refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)) {
		return refNode.contains(otherNode);
	}else if(typeof refNode.compareDocumentPosition == "function") {
		return !!(refNode.compareDocumentPosition(otherNode) & 16);
	}else {
		var node = otherNode.parentNode;
		do{	
			if(node == refNode) {
				return true;
			}else {
				node = node.parentNode;
			}
		}while(node != null);
	}
	return false;
}

function getInnerText(element) {	//检测是否支持读取 innerText 属性;
	return (typeof element,textContent == "string") ? element.textContent : element.innerText;
}

function setInnerText(element,text) {	//检测是否支持设置 innerText 属性;
	if (typeof element.textContent == "string") {
		element.textContent = text;
	}else {
		element.innerText = text;
	}
}

function insertRule(sheet,selectorText,cssText,position) {	//跨浏览器添加样式规则的兼容写法;
	if(sheet.insertRule) {		//非ie浏览器;
		sheet.insertRule(selectortText + "{" + cssText + "}",position);
	}else if(sheet.addRule) {	//ie浏览器;
		sheet.addRule(selectorText,cssText,position);
	}
}

function deleteRule(sheet,index) {		//跨浏览器删除规则的兼容写法;
	if(sheet.deleteRule) {	//非ie浏览器;
		sheet.deleteRule(index);
	}else if(sheet.removeRule) {	//ie浏览器;
		sheet.reomveRule(index);
	}
}

function getSelectedText(textbox) {	//获取表单控件文本内容;
	if(typeof textbox.selectionStart == "number") {	//非ie浏览器;
		return textbox.value.substring(textbox.selectionSatart,textbox.selectionEnd);
	}else if(document.selection) {	//ie浏览器;
		return document.selection.createRange().text;
	}
}

function selectText(textbox, startIndex, stopIndex){	//选择表单控件部分文本;
	if(textbox.setSelectionRange) {
		textbox.setSelectionRange(startIndex, stopIndex);
	}else if(textbox.createTextRange) {
		var range = textbox.createTextRange();
		range.collapse(true);
		range.moveStart("character", startIndex);
		range.moveEnd("character", stopIndex);
		range.select();
	}
	textbox.focus();
}

function getSelectedOptions(selectbox) {	//获取select内被选中的option;
	var result = new Array();
	var option = null;
	for(var i = 0, len = selectbox.options.length; i < len; i ++ ) {
		option = selectbox[i];
		if(option.selected) {
			result.push(option);
		}
	}
	return result;
}

function clearSelectbox(select) {	//移除全部select选项;
	for(var i = 0, len = selectbox.options.length; i < len; i ++) {
		selectbox.remove(0);
	}
}

function serialize(form) {	//表单序列化;
	var parts = [],
		field = null,
		i,
		len,
		j,
		optLen,
		option,
		optValue;
	for(i = 0, len = form.elements.length; i < len; i ++) {
		field = form.elements[i];
		switch(field.type) {
			case "select-one":
			case "select-multiple":
				if(field.name.length) {
					for(j = 0, optLen = field.options.length; j < optLen; j ++) {
						option = field.options[j];
						if(option.selected) {
							optValue = "";
							if(option.hasAttribute) {
								optValue = (option.hasAttribute("value") ? option.value : option.text);
							}else {
								optValue = (option.attributes["value"].specified ? option.value : option.text);
							}
							parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
						}
					}
				}
				break;
			case undefined:	//字段集;
			case "file":	//文件输入;
			case "submit":	//提交按钮;
			case "reset": 	//重置按钮;
			case "button":	//自定义按钮;
				break;
			case "radio": 	//单选按钮;
			case "checkbox":	//复选框;
				if(!field.checked) {
					break;
				}
				/*执行默认操作*/
			default:
				//不包含没有名字的表单字段;
				if(field.name.length) {
					parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
				}
		}
	}
	return parts.join("&");
}

function createRectLinearGradient(context, x, y, width, height) {	//创建线性矩形渐变;
	return context.createLinearGradient(x, y, width + x, height + y);
}

function addQueryStringArg(url, name, value) {	//查询字符串;
	if(url.indexOf("?") == -1) {
		url += "?";
	}else {
		url += "&";
	}
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

function logError(sev, msg) {	//错误处理;
	var img = new Image();
	img.src = "log.php?sev=" + encodeURIComponent(sev) + "&msg=" + encodeURIComponent(msg);
}

function log(message) {		//将错误输出至控制台;
	var console = document.getElementById("debuginfo");
	if(console === null) {
		console = document.createElement("div");
		console.id = "debuginfo";
		console.style.background = "#dedede";
		console.style.border = "1px solid silver";
		console.style.padding = "5px";
		console.style.width = "400px";
		console.style.position = "absolute";
		console.style.right = "0px";
		console.style.top = "0px";
		document.body.appendChild(console);
	}
	console.innerHTML += "<p>" + message + "</p>";
}

function createDocument() {		//创建合适的XML文档;
	if(typeof arguments.callee.activeXString != "string") {
		var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],
			i,
			len;
		for(i = 0, len = versions.length; i < len; i ++) {
			try{
				new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				break;
			}catch(e) {
				//
			}
		}
	}
	return new ActiveXObject(arguments.callee.activeXString);
}

function parseXml(xml) {	//解析XML文档;
	var xmldom = null;
	if(typeof DOMParser != "undefined") {
		xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
		var errors = xmldom.getElementsByTagName("parsererror");
		if(errors.length) {
			throw new Error("XML Parsing error:" + error[0].textContent);
		}
	}else if(typeof ActiveXObject != "undefined") {
		xmldom = createDocument();
		xmldom.loadXML(xml);
		if(xmldom.parseError != 0) {
			throw new Error("XML parsing error: " + xmldom.parseError.reason);
		}
	}else {
		throw new Error("No XML parser abailable.");
	}
	return xmldom;
}

function selectSingleNode(context, expression, namespaces) {	//XML selectSingleNode 的兼容方法;
	var doc = (context.nodeType != 9 ? context.ownerDocument : context);
	if(typeof doc.evaluate != "undefined") {
		var nsresolver = null;
		if(namespaces instanceof Object) {
			nsresolver = function(prefix) {
				return namespaces[prefix];
			}
		}
		var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return (result !== null ? result.singleNodeValue : null);
	}else if(typeof context.selectSingleNode != "undefined") {
		if(namespaces instanceof Object) {
			var ns = "";
			for(var prefix in namespaces) {
				if(namespaces.hasOwnProperty(prefix)) {
					ns += "xmlL" + prefix + "='" + namespaces[prefix] + "'";
				}
			}
			doc.setProperty("SelectionNamespaces", ns);
		}
		return context.selectSingleNode(expression);
	}else {
		throw new Error("No XPath engine found");
	}
}

function selectNode(context, expression, namespaces) {	//XML selectNode 的兼容方法; 
	var doc = (context.nodeType != 9 ? context.ownerDocument : context);
	if(typeof doc.evaluate != "undefined") {
		var nsresolver = null;
		if(namespaces instanceof Objuect) {
			nsresolver = function(prefix) {
				return namespaces[prefix];
			}
		}
		var resule = doc.evaluate(expression, context, nsresolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		if(result != null) {
			for(var i = 0, len = result.snapshotLength; i < len; i ++) {
				node.push(result.snapshotItem(i));
			}
		}
		return nodes;
	}else if(typeof context.selectNodes != "undefined") {
		if(namespaces instanceof Object) {
			var ns = "";
			for(var prefix in namespaces) {
				if(namespaces.hasOwnProperty(prefix)) {
					ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "'";
				}
			}
			doc.setProperty("SelectionNamespaces", ns);
			}
			var result = context.selectNodes(expression);
			var nodes = new Array();
			for(var i = 0, len = result.length; i < len; i ++) {
				nodes.push(result[i]);
			}
		return nodes;
	}else {
		throw new Error("No XPath engine found");
	}
}

function createThreadSafeDocument() {		//ie 中创建MSXML2.FreeThreadedDOMDocument;
	if(typeof arguments.callee.activeXString != "string") {
		var versions = ["MSXML2.FreeThreadedDOMDocument.6.0",
						"MSXML2.FreeThreadedDOMDocument.3.0",
						"MSXML2.FreeThreadedDOMDocument"],
			i,
			len;
		for(i = 0, len = versions.length; i < len; i ++) {
			try{
				new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				break;
			}catch(e) {	
				//
			}
		}
	}
	return new ActiveXObject(arguments.callee.activeXString);
}

function createXSLTemplate() {	//ie 中创建XSL模板;
	if(typeof arguments.callee.activeXString != "string") {
		var versions = ["MSXML2.XSLTemplate.6.0",
						"MSXML2.XSLTemplate.3.0",
						"MSXML2.XSLTemplate"],
			i,
			len;
		for(i = 0, len = versions.length; i < len; i ++) {
			try{
				new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				break;
			}catch(e) {
				//
			}
		}
	}
	return new ActiveXObject(arguments.callee.activeXString);
}

function transform(context, xslt) {	//使用xslt的兼容方法;
	if(typeof XSLTProcessor != "undefined") {
		var processor = new XSLTProcessor();
		processor.importStylesheet(xslt);
		var result = processor.transformToDocument(context);
		return (new XMLSerializer()).serializeToString(result);
	}else if(typeof context.transformNode != "undefined") {
		return context.transformNode(xslt);
	}else {
		throw new Error("No XSLT processor available");
	}
}

function createXHR() {		//创建XHR对象的兼容方法;
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined") {
		if(typeof arguments.callee.activeXString != "string") {
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
				i,
				len;
			for(i = 0, len - versions.length; i < len; i ++) {
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.ActiveXString = versions[i];
				}catch(e) {
					//
				}
			}
		}
		return new ActiveXObject(arguments.callee.ActiveXString);
	}else {
		throw new Error("No XHR object available");
	}
}

function addURLParam(url, name, value) {	//向open函数第二个参数URL后面添加参数名和值;
	url += (url.indexOf("?") == -1 ? "?" : "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

function submitData(form, url) {		//post模仿表单提交;
	var xhr = createXHR();		//926行;
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
				console.log(xhr.responseText);
			}else {
				console.log("Request was unsuccessful:" + xhr.status);
			}
		}
	};
	xhr.open("post", url, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var oForm = document.getElementsById(form);
	xhr.send(serialize(oForm));
}

function createCORSRequest(method, url) {	//跨浏览器创建ajax对象;
	var xhr = new XMLHttpRequest();
	if("widthCredentials" in xhr) {
		xhr.open(method, url, true);
	}else if(typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	}else {
		xhr = null;
	}
	return xhr;
}

function createStreamingClient(url, progress, finished) {		//简单HTTP流的创建;	url:get; progress,finished:回调函数;	
	var xhr = new XMLHttpRequest(),
		received = 0;
	xhr.open("get", url, true);
	xhr.onreadystatechange = function() {
		var result;
		if(readyState == 3) {
			//只取得最新数据并调整计数器;
			result = xhr.respneseText.substring(received);
			received += result.length;

			//调用progress回调函数;
			progress(result);
		}else if(xhr.readyState == 4) {
			finished(xhr.responseText);
		}
	}
	xhr.send(null);
	return xhr;
}

function curry(fn) {	//函数柯里化;
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.contact(innerArgs);
		return fn.apply(null, finalArgs);
	}
}

function chunk(array, process, context) {	//数组分块;
	setTimeout(function() {
		var item = array.shift();
		process.call(context, item);
		if(array.length > 0) {
			setTimeout(arguments.callee, 100);
		}
	}, 100);
}

function throttle(method, context) {	//节流函数方法; method :函数;
	clearTimeout(method.tId);
	method.tId = setTimeout(function() {
		method.call(context);
	}, 100);
}

function EventTarget() {	//自定义事件;
	this.handlers = {};
}
EventTarget.prototype = {		//定义自定义事件原型链;
	constuctor: EventTarget,	//构造器;
	addHandler: function(type, handler) {	//添加事件;type: 事件类型, handler: 处理函数;
		if(typeof this.handlers[type] == "undefined") {
			this.handlers[type] = [];	
		}
		this.handlers[type].push(handler);
	},
	fire: function(event) {		//执行函数;
		if(!event.target) {
			event.target = this;	//target为自己;
		}
		if(this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for(var i = 0, len = handlers.length; i < len; i ++) {
				handlers[i](event);
			}
		}
	},
	removeHandler: function(type, handler) {	//删除事件;
		if(this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for(var i = 0, len = handlers.length; i < len; i ++) {
				if(handlers[i] === handlers) {
					break;
				}
			}
			handlers.splice(i, 1);
		}
	}
}

var CookieUtil = {		//设置和获取和删除cookie数据;
	get: function(name) {	//获取cookie数据; name: cookie名字;
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if(cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	set: function(name, value, expires, path, domain, secure) {	//设置cookie数据; name:cookie名字;value:cookie值;expires:失效时间;path:路径;domain:域;secure:安全标志;
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if(expires instanceof Date) {
			cookieText += "; expires = " + expires.toGMTString();
		}
		if(path) {
			cookieText += "; path= " + path;
		}
		if(domain) {
			cookieText += "; domain = " + domain;
		}
		if(secure) {
			cookieText += "; secure = " + secure;
		}
		document.cookie = cookieText;
	},
	unset: function(name, path, domain, secure) {	//删除cookie数据;
		this.set(name, "", new Date(0), path, domain, secure);
	}
}

var SubCookieUtil = {		//子cookie的设置和获取和删除操作;
	get: function(name, subName) {	//子cookie数据的获取操作;name:cookie名字;subName:子cookie名字;
		var subCookies = this.getAll(name);
		if(subCookies) {
			return subCookies[subName];
		}else {
			return null;
		}
	},
	getAll: function(name) {	//获取cookie所有数据;name:cookie名字;
		var cookieName =encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null,
			cookieEnd, 
			subCookies, 
			i,
			parts,
			result = {};
		if(cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(";", cookieStart);
			if(cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
			if(cookieValue.length > 0) {
				subCookies = cookieValue.split("&");
				for(i = 0, len = subCookies.length; i < len; i ++) {
					parts = subCookies[i].split("=");
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
				return result;
			}
		}
		return null;
	},
	set: function(name, subName, vlaue, expires, path, domain, secure) {	//设置子cookie数据;
		var subcookies = this.getAll(name) || {};
		subcookies[subName] = value;
		this.setAll(name, subcookies, expires, path, domain, secure);
	},
	setAll: function(name, subcookies, expires, path, domain, secure) {	//设置cookie数据;
		var cookieText = encodeURIComponent(name) + "=",
			subcookieParts = new Array(),
			subName;
		for(subName in subcookies) {
			if(subName.length > 0 && subcookies.hasOwnProperty(subName)) {
				subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));
			}
		}
		if(cookieParts.length > 0) {
			cookieText += subcookieParts.join("&");
			if(expires instanceof Date)	 {
				cookieText += "; expires = " + expires.toGMTString();
			}
			if(path) {
				cookieText += "; path = " + path;
			}
			if(domain) {
				cookieText += "; domain = " + domain;
			}
			if(secure) {
				cookieText += "; secure = " + secure;
			}
		}else {
			cookieText += "; expires = " + (new Date(0)).toGMTString();
		}
		document.cookie = cookieText;
	},
	unset: function(name, subName, path, domain, secure) {		//删除子cookie数据;
		var subcookies = this.getAll(name);
		if(subcookies) {
			delete subcookies[subName];
			this.setAll(name, subcookies, null, path, domain, secure);
		}
	},
	unsetAll: function(name, path, domain, secure) {		//删除cookie数据;
		this.setAll(name, null, new Date(0), path, domain, secure);
	}
}

function getLocalStorage() {	//获取localStorage兼容方法;
	if(typeof localStorage == "object") {
		return localStorage;
	}else if(typeof globalStorage == "object") {
		return globalStorage[location.host];
	}else {
		throw new Error("Local storage not available");
	}
}

function isHiddenSupported() {		//判断页面是否隐藏的兼容方法;
	return ("hidden" in document || "msHidden" in document || "webkitHidden" in document);

}

function blobSlice(blob, stratByte, length) {	//读取部分文件内容的兼容方法;
	if(blob.slice) {
		return blob.slice(startByte, length);
	}else if(blob.webkitSlice) {
		return blob.webkitSlice(startByte, length);
	}else if(blob.mozSlice) {
		return blob.mozSlice(startByte, length);
	}else {
		return null;
	}
}

function createObjectURL(blob) {	//创建对象URL的兼容方法;
	if(window.URL) {
		return window.URL.createObjectURL(blob);
	}else if(window.webkit) {
		return window.webkitURL.createObjectURL(blob);
	}else {
		return null;
	}
}

function revokeObjectURL(url) {		//手工释放内存对象URL兼容方法;
	if(window.URL) {
		return window.URL.revokeObjectURL(url);
	}else if(window.webkitURL) {
		return window.webkitURL.revokeObjectURL(url);
	}
}

//高性能javascript;

function loadScript(url, callback) {	//动态加载JS文件方法;
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState) {	//IE
		script.onreadystatechange = function(e) {
			if(script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	}else {	//非IE;
		script.onload = function() {
			callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function memoize(fundamental, cache) {		//创建递归缓存函数;
	cache = cache || {};
	var shell = function(arg) {
		if(!cache.hasOwnProperty(arg)) {
			cache[arg] = fundamental(arg);
		}
		return cache[arg];
	};
	return shell;
}

function processArray(items, process, callback) {	//使用定时器处理数组; items: 数组; process: 处理函数; callback: 回调函数;
	var todo = items.concat();	//复制数组;
	setTimeout(function() {
		var time = +new Date();
		do{
			process(items.shift());
		}while(items.length > 0 && +new Date() - time < 50);

		if(items.length > 0) {
			setTimeout(arguments.callee,25);
		}else {
			callback(items);
		}
	}, 25);
}

function multistep(steps, args, callback) {		//使用定时器处理函数集合; steps: 函数数组; args: 函数集合的参数; callback: 回调函数;
	var tasks = steps.concat();		//复制函数集合;
	setTimeout(function() {
		var date = +new Date();
		do{
			var task = tasks.shift();
			task.apply(null, args || []);	
		}while(tasks.length > 0 && +new Date() - date < 50);
		if(tasks.length > 0) {
			setTimeout(arguments.callee, 25);
		}else {
			callback();
		}
	}, 25);
}

function handleImageData(data, mimeType) {	//处理image字符串;
	var img = document.createElement("img");
	img.src = "data: " + mimeType + ";base64," + data;
	return img;
}

function handleCss(data) {	//处理css字符串;
	var style = document.createElement("style");
	style.type = "text/css";
	var node = document.createTextNode(data);
	style.appendChild(node);
	document.getElementsByTagName("head")[0].appendChild(style);
}

function handleJavascript(data) {	//处理javascript字符串;
	eval(data);
}

/*
	context: canvas的2d绘图环境;
	x,y: 椭圆圆心;
	a,b: 椭圆的长短轴;
*/
function drawCircle(context, x, y, a, b) {		//椭圆的绘画方法; 
	var r = (a > b) ? (1 / a) : (1 / b);
	context.moveTo(x + r, y);
	for(var i = 0, len = Math.PI * 2; i < len; i += r) {
		context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
	}
}

/*
	对象继承;
	ref: 源对象;
	target:目标对象;
*/
function extend(ref, target) {
	for(var attr in ref.prototype) {
		target[attr] = ref[attr];
	}
}
/*
	自定义事件;
	handlers: 自定义事件映射表;
	addEvent: 添加事件;
	fireEvent: 触发事件;
	removeEvent: 取消事件;
*/
function SelfEvent() {
	this.handlers = {};
}
SelfEvent.prototype = {
	constructor: SelfEvent,
	addEvent: function(type, handler) {
		if(typeof this.handlers[type] == "undefined") {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);;
	},
	fireEvent: function(event) {
		if(!event.target) {
			event.target = this;
		}
		if(this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for(var i = 0, len = handlers.length; i < len; i ++) {
				handlers[i](event);
			}
		}
	},
	removeEvent: function(type, handler) {
		if(this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for(var i = 0, len = handlers.length; i < len; i ++) {
				if(handlers[type] == handler) {
					break;
				}
			}	
			handlers.splice(i, 1);
		}
	}
}

/*
	ajax兼容方法;
	method: 请求方式;
	url: 请求地址;
	data: 请求数据;
	callback: 回调函数;
*/
function ajax(method, url, data, callback) {
	var ajax = createXHR();
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			if((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) {
				callback(JSON.prse(ajax.responseText));
			}
		}
	}
	var m = method.toLowerCase();
	if(m == "get" && data) {
		url += ("?" + data);
	}
	ajax.open(method, url, true);
	if(m == "post" && data) {
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(data);
	}else {
		ajax.send();
	}
}

/*
	transfomr变换方法;
	element: 变换元素;
	attr: 变换属性;
	val: 变换值;
*/
function cssTransform(element, attr, val) {
	if(typeof element.transform === "undefined") {	
		element.transform = {};
	}
	if(typeof element.transform[attr] === "undefined") {
		switch(attr) {
			case "scale":
			case "scaleX":
			case "scaleY":
			case "scaleZ":element.transform[attr] = 0;break;
			default:element.transform[attr] = 0;break;
		}
	}
	if(typeof val === "undefined") {
		return element.transform[attr];
	}else {
		element.transform[attr] = val;
		var transformValue = "";
		for(var s in element.transform) {
			switch(attr) {
				case "scale":
				case "scaleX":
				case "scaleY":
				case "scaleZ": transformValue += (s + "(" + val + ")" + " ");break;
				case "skew":
				case "skewX":
				case "skewY":
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ": transformValue += (s + "(" + val + "deg)" + " ");break;
				default: transformValue += (s + "(" + val + "px" + " ");break;
			}
		}
	}
	element.style.WebkitTransform = element.style.tranform = transformValue;
}

/*
	判断是安卓还是IOS系统;
*/
function getAgent() {
	var u = navigator.userAgent;
	if(u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
		return "android";
	}else if(!!u.match(/\(i[^;]+;(U;)?CPU.+Mac OSX)/)) {
		return "ios";
	}
}

/*
	获取两点的斜率;
	pointer1: 第一个点;
	pointer2: 第二个点;
*/
function getDeg(pointer1, pointer2) {
	var x = pointer1.x - pointer2.x;
	var y = pointer1.y - pointer2.y;
	return (y / x) * Math.PI / 180;
}

/*
	init = {
		el: 元素;
		start: function
		change: function
		end: function
	}
*/
function gesture(init) {
	var el = init.el,
		isGesture = false,
		startPointer = [];
	if(typeof el === "undefined") {
		return;
	}
	window.addEventListener("touchstart", function(e) {
		if(e.touches.length >= 2) {
			isGesture = true;
			init.start && init.start.call(el, e);
			startPointer[0] = {x: e.touches[0].pageX, y: e.touches[0].pageY};
			startPointer[1] = {x: e.touches[1].pageX, y: e.touches[1].pageY};
		}
	}, false);
	window.addEventListener("touchend", function(e) {
		if(isGesture) {
			if(e.touches.length < 2 || e.targetTouches.length < 2) {
				isGesture = false;
				init.end && init.end.call(el, e);
			}
		}
	}, false);
	window.addEventListener("touchmove", function(e) {
		if(isGesture && e.touches.length >= 2) {
			var nowPointer = [],
				startRange = 0,
				nowRange = 0,
				startDeg = 0,
				nowDeg = 0;
			nowPointer[0] = {x: e.touches[0].pageX, y: e.touches[1].pageY};
			nowPointer[1] = {x: e.touches[1].pageX, y: e.touches[1].pageY};
			startRange = getRange(startPointer[0], startPointer[1]);	//1468;
			nowRange = getRange(nowPointer[0], nowPointer[1]);
			startDeg = getDeg(startPointer[0], startPointer[1]);	//1482;
			nowDeg = getDeg(nowPointer[0], nowPointer[1]);
			e.scale = nowRange / startRange;
			e.rotation = nowDeg - startDeg;
			init.change && init.change.call(el, e);
		}
	}, false);
}

/*
	两个物体的碰撞检测;
	obj1:{
		x: 物体的x坐标;
		y: 物体的y坐标;
	}
	obj2:{
		x: 物体的x坐标;
		y: 物体的y坐标;
		width: 物体的宽度;
		height: 物体的高度;
	}
		
*/
function isImpact(obj1, obj2) {
	if(obj1.x >= obj2.x && obj1.x <= (obj2.x + obj2.width) && obj1.y >= obj2.y && obj1.y <= (obj2.y + obj2.height)) {
		return true;
	}
	return false;
}