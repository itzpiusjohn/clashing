
const initialState = {
    latitude: 0,
    longitude: 0,
    error: null,
    dropOff: '',
    pickUp: '',
    predictions: [],
    pointChords: [],
    isPickUp: false,
    isDropOff: false,
    destination_IdPick: '',
    destinationPickUp: '',
    destinationDropOff: '',
    destination_IdDrop: '',
    isUpdate: false,
    baseFare: 0.4,
    timeRate: 0.14,
    distanceRate: 0.97,
    surge: 1,
    time: '',
    distance: '',
    isSelect: false,
    isSelect1: false,
    isSelect2: false,
    timeValue: '',
};

const stateReducer = (state = initialState, action) => {
    return state;
};

export default stateReducer;