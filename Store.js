//Store
import EventEmitter from 'eventemitter3';

class AppStore extends EventEmitter {
  //觸發事件
  emitMessage(item) {
    this.emit('onLatestIssues', item);
  }

  //監聽事件
  addListener(callback) {
    this.on('onLatestIssues', callback);
  }
}

exports.store = new AppStore();
