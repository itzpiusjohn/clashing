import {ADD_CARD, UPDATE_CARD} from '../actions/type';

const initialState = {
  card: {
    cardNumber: null,
    exp: '',
    cvc: null,
    pin: null,
    name: '',
  },
};

const creditCard = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        card: {
          name:action.details
        },
      };    
    case UPDATE_CARD:
      return{
          ...state,
          card:{
              name: action.updateCardDetails
          }
      }
    default:
      return state;
  }
};

export default creditCard;
