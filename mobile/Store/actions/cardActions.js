import {ADD_CARD, UPDATE_CARD,DATA} from './type';

export const addCard = (cardDetails) => ({
    type:ADD_CARD,
    details:cardDetails
});


export const updateCard = (updateCardDetails) => ({
    type:UPDATE_CARD,
    updateData:updateCardDetails
});

export const newData = (summary) =>({
    type: DATA, 
    send: summary
});
