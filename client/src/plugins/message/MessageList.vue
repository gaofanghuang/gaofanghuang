<template>
  <div id="messageList" class="message-list">
    <Message
      v-for="item in msgList"
      :type="item.type"
      :key="item.name"
      :content="item.content"
      :duration="item.duration"
      :closable="item.closable"
      :name="item.name"
      :on-close="item.onClose"
      :icon="item.icon"
    />
  </div>
</template>

<script>
import Message from './Message';

let seed = 0;
const getUuid = () => {
  return 'message_' + Date.now() + '_' + seed++;
};

export default {
  name: 'MessageList',
  data() {
    return {
      msgList: [],
    };
  },
  components: {
    Message,
  },
  methods: {
    add(msg) {
      const name = msg.name || getUuid();
      let newMsg = Object.assign(
        {
          content: '',
          closable: false,
          name: name,
        },
        msg
      );
      this.msgList.push(newMsg);
    },
    close(name) {
      setTimeout(() => {
        const oldMsgs = this.msgList;
        for (let i = 0; i < oldMsgs.length; i++) {
          if (oldMsgs[i].name === name) {
            this.msgList.splice(i, 1);
            break;
          }
        }
      }, 500);
    },
    closeAll() {
      this.msgList = [];
    },
  },
};
</script>

<style lang="scss">
.message-list {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1010;
  width: 100%;
  height: 60px;
  overflow: hidden;
  pointer-events: none;
}
</style>
