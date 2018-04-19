//Dispatcher
import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher{
  
  handleViewAction(payload){
    this.dispatch({
      actionType: payload.actionType,
      data: payload.data
    });
  }
  
}

exports.dispatcher = new AppDispatcher();

