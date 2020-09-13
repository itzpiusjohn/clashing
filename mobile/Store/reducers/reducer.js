import {DATA} from '../actions/type';

const initialState = {
    type: '',
    pickUp:'',
    dropOff:'',
    discription:'',
    fare:''
  };


  const stateReducers = (state = initialState, action) => {
        switch(action.type){
            case DATA:
                return {
                    ...state,
                    
                  }; 
        }
  }

  export default stateReducers;