const initialState = {
    data: [],
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return { ...state, data: action.payload, error: null };
      case 'FETCH_ERROR':
        return { ...state, data: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;
  