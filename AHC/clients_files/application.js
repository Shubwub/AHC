var obj0,obj1,obj2,j,k,tickerRestart;var i=800;var ticker_start=i;var speed=15;function doOnload(){if(ie_above_ver5()){if(document.getElementById("ticker0")){obj0=document.getElementById('ticker0');obj2=document.getElementById('tickerHolder');j=obj0.offsetWidth;tickerRestart=950;obj2.className='setup'
obj0.style.width=j+'px';imgScroll();obj2.onmouseover=function(){clearTimeout(scroller);}
obj2.onmouseout=function(){imgScroll();}}}}
function ie_above_ver5(){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var ieversion=new Number(RegExp.$1)
if(ieversion<6)
return false;else
return true;}else{return true;}}
function imgScroll(){obj0.style.left=i+'px';i--;j--;if(i<-tickerRestart){i=ticker_start;}
scroller=setTimeout('imgScroll()',speed);}
if(ie_version()==6){}
function ie_version(){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var ieversion=new Number(RegExp.$1)
return ieversion}
else{return 0;}}
var player=null;var playlist=null;function playerReady(obj){player=document.getElementById(obj['id']);addListeners();}
function onload_function(onload_params){try{}
catch(e){}
try{eval(onload_params)}
catch(e){}
elements=document.getElementsByTagName("input")
if(elements!=null){for(var i=0;i<elements.length;i++){element=elements[i];element.setAttribute("autocomplete","off");}}}
function showHideDiv(div_id,show){if(show==true){document.getElementById(div_id).style.display='block';}else{document.getElementById(div_id).style.display='none'}}
function hideDivs(exception_div_id){var show_hide_container=document.getElementById('showHideContainer')
if(show_hide_container){var div_tags_array=show_hide_container.getElementsByTagName('div')
for(var k=0;k<div_tags_array.length;k++){div_tags_array[k].style.display='none';}}}
function hideAllItemsWithClass(hide_class){if(ie_above_ver5()){var showHideItems=document.getElementsByClassName(hide_class);for(var i=0;i<showHideItems.length;i++){showHideItems[i].style.display='none';}}}
function showAllDivs(){var aElm=document.body.getElementsByTagName('div');for(var i=0;i<aElm.length;i++){if(aElm[i].style.display=='none'){aElm[i].style.display='block'}}}
function toggle_div(div_id,hide_class){if(hide_class!=undefined){hideAllItemsWithClass(hide_class);}
Effect.toggle(document.getElementById(div_id),'appear');}
function showHideID(div_id,className,toggle){if(toggle==null){toggle=true;}
var element=document.getElementById(div_id);if(element.style.display=='block'&&toggle){element.style.display='none'}else{element.style.display='block'
if(className){var elements=document.getElementsByClassName(className);if(elements!=null){for(var i=0;i<elements.length;i++){if(elements[i].id!=div_id){elements[i].style.display='none'}}}}}}
function hideDiv(div_id){document.getElementById(div_id).style.display='none';}
function ie_above_ver5(){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var ieversion=new Number(RegExp.$1)
if(ieversion<6)
return false;else
return true;}else{return true;}}