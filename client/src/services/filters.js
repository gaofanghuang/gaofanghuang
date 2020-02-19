function GetDateDiff(DiffTime) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  let Time = String(DiffTime).indexOf('-') != -1 ? String(DiffTime).replace(/-/g, '/') : DiffTime;
  return Time;
}

// 格式化时间
export const formatDate = (date, fmt = 'yyyy/MM/dd hh:mm') => {
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
};

export const getImg = path => {
  let baseUrl = process.env.VUE_APP_API_HOST_DEV;
  if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.VUE_APP_API_HOST_PROD;
  }
  return baseUrl + '/img/' + path;
};

// 时间
export const time2tips = date => {
  const time = Date.parse(new Date(GetDateDiff(date))) || Date.parse(new Date(GetDateDiff(date)));
  const offset = (new Date().getTime() - time) / 1000;
  if (offset < 60) return '1分钟内';
  if (offset < 3600) return `${~~(offset / 60)}分钟前`;
  if (offset < 3600 * 24) return `${~~(offset / 3600)}小时前`;
  // 根据 time 获取到 "16:57"
  let timeStr;
  try {
    timeStr = new Date(time).toTimeString().match(/^\d{2}:\d{2}/)[0];
  } catch (e) {
    return offset;
  }
  if (offset < 3600 * 24 * 2) return `昨天`;
  if (offset < 3600 * 24 * 9) return `${~~(offset / 3600 / 24)}天前`;
  // 根据 time 获取到 "2018-06-16T23:12:32.000Z" 然后正则转化为 6-19 16:57 = $1-$2 $3
  return new Date(time - timeOffset)
    .toISOString()
    .replace(/^\d+-(\d+)-(\d+)T(\d+:\d+):\d+\.000Z$/, '$1-$2');
};
