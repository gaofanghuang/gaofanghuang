import Vue from 'vue';
import Message from './MessageList';

Message.newInstance = props => {
  const propsTemp = props || {};

  const MessageInstance = new Vue({
    data: propsTemp,
    render(h) {
      return h(Message, {
        props: propsTemp,
      });
    },
  });

  const component = MessageInstance.$mount();
  document.body.appendChild(component.$el);
  const messages = MessageInstance.$children[0];

  return {
    notice(msgProps) {
      messages.add(msgProps);
    },
    remove(name) {
      messages.close(name);
    },
    component: messages,
    destroy(element) {
      messages.closeAll();
      setTimeout(function() {
        document.body.removeChild(document.getElementsByClassName(element)[0]);
      }, 500);
    },
  };
};

export default Message;
