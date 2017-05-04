var AndroidDownloadPageUrl = "http://appstore.huawei.com/app/C57236"; // android 商店地址
var baseScheme = "haoYuanZhang://abc?a=1&b=2"; // app协议
var baseLink = "http://www.haoYuanZhang.com?"; // ios9baseLink
var AppleDownloadPageUrl = baseScheme; // apple 商店地址
var data = {a:1}; // 数据

//实际上就是新建一个iframe的生成器
var createIframe = (function() {
  var iframe;
  return function() {
    if (iframe) {
      return iframe;
    } else {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      return iframe;
    }
  }
})();

var createScheme = function(options, isLink) {
  var urlScheme = isLink ? baseLink : baseScheme;

  for (var item in options) {
    if (item === "appearance"){ // 解决 ipad浏览器修改options对象
      break;
    }
    urlScheme = urlScheme + item + '=' + encodeURIComponent(options[item]) + "&";
  }
  
  urlScheme = urlScheme.substring(0, urlScheme.length - 1);
  return isLink ? urlScheme : urlScheme;
};

var openApp = function() {
  //生成你的scheme你也可以选择外部传入
  var localUrl = createScheme(data, false);
  var openIframe = createIframe();

  if ($.browser.IOS) {
    //判断是否是ios,具体的判断函数自行百度
    if ($.browser.IOS.substring(0,1)-0>=9) {
      //判断是否为ios9以上的版本,跟其他判断一样navigator.userAgent判断,ios会有带版本号
      localUrl = createScheme(data, true); //代码还可以优化一下
      alert(localUrl)
      location.href = localUrl; //实际上不少产品会选择一开始将链接写入到用户需要点击的a标签里
      return;
    }

    window.location.href = localUrl;

    var loadDateTime = Date.now();
    setTimeout(function() {
      var timeOutDateTime = Date.now();
      if (timeOutDateTime - loadDateTime < 1000) {
        window.location.href = AppleDownloadPageUrl;
      }
    }, 25);
  } else if ($.browser.Android) {
    //判断是否是android，具体的判断函数自行百度
    if ($.browser.Chrome) {
      //chrome浏览器用iframe打不开得直接去打开，算一个坑
      window.location.href = localUrl;
    } else {
      //抛出你的scheme
      openIframe.src = AndroidDownloadPageUrl;
    }
    setTimeout(function() {
      window.location.href = AndroidDownloadPageUrl;
    }, 500);
  } else {
    //主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊
    openIframe.src = localUrl;
    setTimeout(function() {
      window.location.href = AndroidDownloadPageUrl;
    }, 500);
  }
};