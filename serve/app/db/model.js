module.exports = {
  /**
   * ------------- 用户 -------------
   * @param role 账号角色：1 管理员，2 注册会员
   */
  user: {
    role: {
      type: Number,
      require: true
    },
    username: {
      type: String,
      require: true
    },
    nickname: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * ------------- 项目 -------------
   */
  project: {
    sort: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    describe: {
      type: String,
      require: true
    },
    tag: {
      type: Array,
      require: true
    },
    status: {
      type: Number,
      require: true
    },
    url: {
      type: String,
      require: false
    },
    github: {
      type: String,
      require: false
    },
    cover: {
      type: Object,
      require: true
    },
    updated_time: {
      type: Number,
      require: true
    },
    version: {
      type: String,
      require: false
    },
    versions: {
      type: Array,
      require: false
    }
  },
  /**
   * ------------- 清单 -------------
   */
  checklist: {
    sort: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    describe: {
      type: String,
      require: true
    },
    tag: {
      type: Array,
      require: true
    },
    type: {
      type: Number,
      require: true
    },
    cover: {
      type: Object,
      require: true
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * ------------- 条目 -------------
   */
  entry: {
    pid: {
      type: String,
      require: true
    },
    type: {
      type: Number,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    cover: {
      type: String,
      require: false
    },
    url: {
      type: String,
      require: false
    },
    score: {
      type: Number,
      require: false
    },
    content: {
      type: String,
      require: false
    },
    images: {
      type: Array,
      require: false
    },
    video: {
      type: String,
      require: false
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * ------------- 记录 -------------
   */
  log: {
    pid: {
      type: String,
      require: true
    },
    type: {
      type: Number,
      require: true
    },
    title: {
      type: String,
      require: false
    },
    content: {
      type: String,
      require: false
    },
    cover: {
      type: String,
      require: false
    },
    images: {
      type: Array,
      require: false
    },
    video: {
      type: String,
      require: false
    },
    version: {
      type: String,
      require: false
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * ------------- TODO -------------
   */
  todo: {
    pid: {
      type: String,
      require: true
    },
    sort: {
      type: Number,
      require: false
    },
    version: {
      type: String,
      require: true
    },
    status: {
      type: Number,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * -------------  标签 -------------
   */
  tag: {
    name: {
      type: String,
      require: true
    },
    status: {
      type: Number,
      require: true
    },
    pid: {
      type: String,
      require: true
    },
    sort: {
      type: Number,
      require: true
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * -------------  图片 -------------
   */
  image: {
    name: {
      type: String,
      require: true
    },
    path: {
      type: String,
      require: true
    },
    category: {
      type: Number,
      require: true
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * -------------  配置 -------------
   */
  config: {
    hasInit: {
      type: Boolean,
      require: true
    },
    canRegister: {
      type: Boolean,
      require: true
    },
    canComment: {
      type: Boolean,
      require: true
    }
  },
  /**
   * -------------  关于 -------------
   */
  about: {
    content: {
      type: String,
      require: false
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
    /**
   * -------------  音乐 -------------
   */
  music: {
    title: {
      type: String,
      require: true
    },
    id: {
      type: Number,
      require: true
    },
    updated_time: {
      type: Number,
      require: true
    }
  },
  /**
   * -------------  评论 -------------
   */
  comment: {
    userName: {
      type: String,
      require: true
    },
    userEmail: {
      type: String,
      require: true
    },
    userSite: {
      type: String,
      require: false
    },
    userUrl: {
      type: String,
      require: false
    },
    content: {
      type: String,
      require: true
    },
    reply: {
      type: String,
      require: false
    },
    reply_time: {
      type: Number,
      require: false
    },
    updated_time: {
      type: Number,
      require: true
    }
  }
}
