import axios from 'axios';
import router from '@/router';
import { Message } from 'element-ui';
import $db from '@/utils/Storage';

let cancel;
let pending = {};
const CancelToken = axios.CancelToken;

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_API_HOST_PROD
    : process.env.VUE_APP_API_HOST_DEV;

const instance = axios.create({
  baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

//请求拦截器
instance.interceptors.request.use(
  config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (pending[config.url]) {
      pending[config.url]('操作取消');
      pending[config.url] = cancel;
    } else {
      pending[config.url] = cancel;
    }
    const TOKEN = $db.getData('token');
    if (TOKEN) {
      config.headers.Authorization = TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (!axios.isCancel(err)) {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.tips = '错误请求';
            break;
          case 401:
            err.tips = $db.hasData('token') ? '登录超时，请重新登录' : '请登录后再操作';
            window.localStorage.clear();
            router.push({
              path: '/login',
              query: { redirect: router.currentRoute.fullPath },
            });
            break;
          case 403:
            err.tips = '拒绝访问';
            break;
          case 404:
            err.tips = '请求错误,未找到该资源';
            break;
          case 405:
            err.tips = '请求方法未允许';
            break;
          case 408:
            err.tips = '请求超时';
            break;
          case 422: {
            const { data: { message = '错误请求' } = {} } = err.response;
            err.tips = message;
            break;
          }
          case 500:
            err.tips = '服务器端出错';
            break;
          case 501:
            err.tips = '网络未实现';
            break;
          case 502:
            err.tips = '网络错误';
            break;
          case 503:
            err.tips = '服务不可用';
            break;
          case 504:
            err.tips = '网络超时';
            break;
          case 505:
            err.tips = 'http版本不支持该请求';
            break;
          default:
            err.tips = `连接错误${err.response.status}`;
        }
      } else {
        err.tips = '网络不可用，请检查！';
      }
      console.log('err', err.tips);
    }
    Message({
      message: err.tips || err,
      type: 'error',
    });
    return Promise.reject(err);
  }
);

export const get = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
export const post = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
export const updated = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'patch',
      url,
      data: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
export const remove = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'delete',
      url,
      params: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
