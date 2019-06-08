var imgArray = new Array();
var webLinks = new Array();
var img;

/*ideally this would scrape the directory for filenames.
  This can be done with node.js 'fs' (or any other server-side language),
  however, it wasn't clear if this was 'legal' for the test.

  Another approach considered was renaming the files with sequential numbers,
  however, this presented a problem with redirecting to the compant website. This
  would however remove the need for the companyArray.

  To add a new company their name is added to this array and a logo of the same
  name can be added in the directory if required, otherwise a "NO IMAGE" icon
  will display.*/
var companyArray = ['amp','arla','aus-ethical','aviva','ba','barclays','bp',
'bupa','catholic-super','co-op','test', 'deloitte','equity-trustees', 'gm', 'gsk','ihg',
'lbg','linde','mns','nestle','nike','plum','provident','qsuper','rest','sara-lee',
'shell','sun','unilever','USS','vodafone'];

/*Loops through the array of companies. If the company name appears in
  the directory of images it is added to the array, otherwise a "no image"
  logo is shown instead.*/
for (var i = 0; i < companyArray.length; i++) {
  img = new Image();
  img.src = 'clientlogos/' + companyArray[i] + '.jpg';
  var webLink = 'https://www.' + companyArray[i] + '.com';
  img.onload = exists(img.src, webLink);
}

//Adds the logo and a link to their website if the company is valid
function exists(src, link) {
  imgArray.push(src);
  webLinks.push(link);
}

//If the company entry has no image then the "NO IMAGE" logo replaces their missing logo
function imgError(image){
  image.onerror = "";
  image.src = "clientlogos/noImage.jpg";
}


//The Vue object for the implemented client list.
var clients = new Vue({
  el: '#clients',
  data: {
    imgList: imgArray,
    webLinkList: webLinks,
    companies: companyArray
  }
})
