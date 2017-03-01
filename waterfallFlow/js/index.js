window.onload = function() {
  waterfall('main', 'box');

  window.onscroll = function() {
    
  }
}

function waterfall(parent, box) {
  // 将main下的所有的class为box的元素取出来
  var oParent = document.getElementById(parent);
  var oBoxs = getByClass(oParent, box);
  
  // 计算整个页面显示的列数（页面宽/box的宽）
  var oBoxW = oBoxs[0].offsetWidth;
  var cols = Math.floor(document.documentElement.clientWidth / oBoxW); // 页面宽度
  // 设置main的宽
  oParent.style.cssText = 'width:' + oBoxW * cols + 'px; margin: 0 auto';

  var hArr = []; // 存放每一列高度的数组
  for (var i = 0; i < oBoxs.length; i++) {

    if (i < cols) {      
      hArr.push(oBoxs[i].offsetHeight);
    } else {
      var minH = Math.min.apply(null, hArr);
      var index = getMinhIndex(hArr, minH);

      oBoxs[i].style.position = 'absolute';
      oBoxs[i].style.top = minH + 'px';
      // oBoxs[i].style.left = oBoxW * indxex + 'px';
      oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';

      hArr[index] += oBoxs[i].offsetHeight;
    }

  }
}

function getByClass(parent, clsName) {
  var boxArr = [], // 用来存储获取到的所有class为box的元素
    oElements = parent.getElementsByTagName('*');

  for (var i = 0; i < oElements.length; i++) {
    if (oElements[i].className == clsName) {
      boxArr.push(oElements[i]);
    }
  }

  return boxArr;
}

function getMinhIndex(arr, target) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
}