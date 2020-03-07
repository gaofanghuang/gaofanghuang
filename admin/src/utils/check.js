/* eslint-disable */

export default {
  // 检测手机号格式
  isPhone(phone) {
    const rule = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|)+\d{8})$/;
    return phone && phone.length === 11 && rule.test(phone);
  },
  // 检测邮箱格式
  isEmail(email) {
    const rule = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return email && email.length >= 5 && rule.test(email);
  },
  isUrl(url) {
    const rule = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    return url && url.length >= 10 && rule.test(url);
  },
};
