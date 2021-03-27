const initialState = ""

const showNotification = notification => {
  return { type: "SHOW", notification}
}

const hideNotification = () => {
  return { type: "HIDE" };
}

export const setNotification = (notification, timeoutS) => {
  return async dispatch => {
    dispatch(showNotification(notification));
    setTimeout(() => dispatch(hideNotification()), timeoutS * 1000);
  }
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SHOW": return action.notification;
    case "HIDE": return "";
    default: return state;
  }
}

export default notificationReducer;