import MsgInstance from './MessageInstance';

let messageInstance;
let name = 1;

const getMessageInstance = () => {
  messageInstance = messageInstance || MsgInstance.newInstance();
  return messageInstance;
};

const notice = (type, content, icon = '', closable = false, onClose = function() {}) => {
  let instance = getMessageInstance();
  instance.notice({
    content,
    type,
    icon,
    onClose,
    closable,
    name: `message-${name}`,
  });
  return (function() {
    let target = name++;
    return function() {
      instance.remove(`message-${target}`);
    };
  })();
};

const Message = {
  info(options) {
    return this.message('info', options);
  },
  success(options) {
    return this.message('success', options);
  },
  warning(options) {
    return this.message('warning', options);
  },
  error(options) {
    return this.message('error', options);
  },
  message(type, options) {
    if (typeof options === 'string') {
      options = {
        content: options,
      };
    }
    return notice(type, options.content, options.icon, options.closable, options.onClose);
  },
};

export default Message;
