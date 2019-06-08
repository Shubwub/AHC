var imgArray = new Array();
var webLinks = new Array();
var img;

/*ideally this would scrape the directory for filenames.
  This can be done with node.js 'fs' (or any other server-side language),
  however, it wasn't clear if this was 'legal' for the test.*/
var companyArray = ['amp','arla','aus-ethical','aviva','ba','barclays','bp',
'bupa','catholic-super','co-op','test', 'deloitte','equity-trustees', 'gm', 'gsk','ihg',
'lbg','linde','mns','nestle','nike','plum','provident','qsuper','rest','sara-lee',
'shell','sun','unilever','USS','vodafone'];
for (var i = 0; i < companyArray.length; i++) {
  img = new Image();
  img.src = 'clientlogos/' + companyArray[i] + '.jpg';
  var webLink = 'https://www.' + companyArray[i] + '.com';
  img.onload = exists(img.src, webLink);
}

function exists(src, link) {
  imgArray.push(src);
  webLinks.push(link);
}

function imgError(image){
  image.onerror = "";
  image.src = "clientlogos/noImage.jpg";
}

var clients = new Vue({
  el: '#clients',
  data: {
    imgList: imgArray,
    webLinkList: webLinks,
  }
})
