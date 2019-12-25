function GetDateDiff(DiffTime) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  let Time = String(DiffTime).indexOf('-') != -1 ? String(DiffTime).replace(/-/g, '/') : DiffTime;
  return Time;
}

export function formatDate(date, fmt = 'yyyy/MM/dd hh:mm') {
  date = new Date(GetDateDiff(date));

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

export function getImg(path) {
  let res = process.env.VUE_APP_API_HOST + '/img/' + path;
  if (process.env.NODE_ENV === 'production') {
    res =
      'https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/data/img/' + path;
  }
  return res;
}
