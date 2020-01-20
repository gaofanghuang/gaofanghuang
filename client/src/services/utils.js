/**
 * 判断客户端类型
 */
export const clientOS = () => {
  const u = navigator.userAgent;

  /* eslint-disable one-var */
  const isMobile = !!u.match(/AppleWebKit.*Mobile.*/),
    /* 移动端 */
    isIPad = u.indexOf('iPad') > -1,
    isIPhone = u.indexOf('iPhone') > -1,
    isWebApp = u.indexOf('Safari') === -1,
    isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    isWechat = u.toLowerCase().indexOf('micromessenger') > -1,
    /* pc 端 */
    isIE = u.indexOf('Trident') > -1,
    isOpera = u.indexOf('Presto') > -1,
    isChorme = u.indexOf('AppleWebKit') > -1,
    isFirefix = u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1;

  return {
    isMobile,
    isWechat,
    OS: (() => {
      if (isMobile) {
        if (isIOS) return 'IOS';
        if (isIPad) return 'iPad';
        if (isIPhone) return 'IOS';
        if (isAndroid) return 'Android';
      } else {
        if (isIE) return 'IE';
        if (isOpera) return 'Opera';
        if (isChorme) return 'Chorme';
        if (isFirefix) return 'Firefix';
      }
    })(),
    versions: (() => {
      return {
        /* 是否为移动终端 */
        mobile: isMobile,

        /* 是否为iPhone或者QQHD浏览器 */
        iPhone: isIPhone,
        /* android终端或uc浏览器 */
        android: isAndroid,

        /* ios终端 */
        ios: isIOS,
        /* 是否iPad */
        iPad: isIPad,

        /* 是否 web 程序，没有头部与底部 */
        webApp: isWebApp,

        /* IE内核 */
        trident: isIE,
        /* opera内核 */
        presto: isOpera,
        /* 苹果、谷歌内核 */
        webKit: isChorme,
        /* 火狐内核 */
        gecko: isFirefix,
      };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
};


/**
 * 计算倒计时
 * @param {*} endTime 结束时间
 * @param {*} startTime 开始时间
 */
export const distanceTime = (endTime, startTime) => {
  let distance = endTime - startTime;
  if (distance > 0) {
    let res = '';
    const day = Math.floor(distance / 86400000);
    distance -= 86400000 * day;
    const hour = Math.floor(distance / 3600000);
    distance -= 3600000 * hour;
    const minute = Math.floor(distance / 60000);
    distance -= 60000 * minute;
    const second = Math.floor(distance / 1000);
    if (day > 0) {
      res = String(day).padStart(2, '0') + ' 天 ';
    }
    if (hour > 0) {
      res = res + String(hour).padStart(2, '0') + ' 时 ';
    }
    if (minute > 0) {
      res = res + String(minute).padStart(2, '0') + ' 分 ';
    }
    res = res + String(second).padStart(2, '0') + ' 秒';
    return res;
  } else {
    return ''
  }
}