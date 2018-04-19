import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { store } from './Store';
import { dispatcher } from './Dispatcher';

const api =
  'https://api.github.com/repos/oneal32xx/ReactNativeNews/issues?access_token=6f3fe4ba8a28bc2a096f25fce0df23f61933c45f';

//註冊dispatcher  設定Action要指向哪一個Store
dispatcher.register(function(payload) {
  switch (payload.actionType) {
    case 'ISSUE_UPDATE':
      //dispatcher 把 aciton 的 payload 丟給 store
      store.emitMessage(payload.data);
      break;
  }
  return true;
});

//宣告 Actions ,當 aciton 有動作時呼叫 dispatcher
const Actions = {
  create: payload => {
    var action = {
      actionType: 'ISSUE_UPDATE',
      data: payload.data,
    };
    dispatcher.handleViewAction(action);
  },
};

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    //State ,當有更動時render會重新執行
    this.state = {
      issues: [],
    };

    this.handleOnNewUpdate = this.handleOnNewUpdate.bind(this);
  }

  componentDidMount() {
    //設定Store 的Listener監聽器, 隨時接收dispatcher
    store.addListener(this.handleOnNewUpdate);
    this._tid = setInterval(function() {
      axios.get(api).then(response => {
        //取得資料時, 建立一個Action 
        Actions.create({
          data: response.data,
        });
        
      });
    }, 3000);
  }

  handleOnNewUpdate(data) {
    this.setState({
      issues: data,
    });
  }

  componentWillUnmount() {
    clearInterval(this._tid);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          ListHeaderComponent={this.fluxDemo}
          ListFooterComponent={this.fluxDemo}
          data={this.state.issues}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  fluxDemo = () => {
    return <Text style={styles.fluxDemo}>Flux Demo</Text>;
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    backgroundColor: '#faebd7',
  },
  item: {
    margin: 10,
    marginTop: 0,
    height: 100,
    fontSize: 25,
    width: '50%',
  },
  fluxDemo: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 28,
    backgroundColor: '#f4a460',
  },
});
