/**
 * 检查数据格式
 */
const format = {
  // 检查是否为空值
  isEmpty(value) {
    if (typeof value === 'undefined' || value == null || value === '') {
      return true;
    } else {
      return false;
    }
  },
  // 检查是否为网址
  isUrl(value) {
    const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/;
    return reg.test(value);
  },
  // 检查是否为邮箱
  isEmail(value) {
    const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(value);
  },
  // 检查是否为手机号
  isPhone(value) {
    const reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|)+\d{8})$/;
    return value && value.length === 11 && reg.test(value);
  },
};

export default format;
