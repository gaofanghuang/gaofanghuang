/**
 * 简单排序
 * @param {*} arr 数组
 * @param {*} key 以这个键名排序
 * @param {*} type asc 升序 des 降序
 */
const sort = (arr, key, type = 'asc') => {
  const newArr = arr.sort((a, b) => {
    return type === 'asc' ? a[key] - b[key] : b[key] - a[key];
  });
  return newArr;
};

export default {
  sort,
};
