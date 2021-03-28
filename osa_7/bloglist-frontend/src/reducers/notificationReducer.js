let timeoutId;

const setNotification = (type, message) => {
  return {
    type: "NOTIFICATION",
    notification: {
      type,
      message,
      visible: true
    }
  };
};

const clearNotification = () => {
  return {
    type: "NOTIFICATION",
    notification: {
      type: "",
      message: "",
      visible: false,
    }
  };
};

export const setSuccessNotification = message => {
  if(timeoutId) clearTimeout(timeoutId);
  return dispatch => {
    dispatch(setNotification("SUCCESS", message));
    timeoutId = setTimeout(() => dispatch(clearNotification()), 5000);
  };
};

export const setErrorNotification = message => {
  if(timeoutId) clearTimeout(timeoutId);
  return dispatch => {
    dispatch(setNotification("ERROR", message));
    timeoutId = setTimeout(() => dispatch(clearNotification()), 5000);
  };
};

const initialState = { visible: false, message: "" };

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case "NOTIFICATION":
      return {
        ...state,
        message: action.notification.message,
        type: action.notification.type,
        visible: action.notification.visible
      };
    default: return state;
  }
};

export default notificationReducer;