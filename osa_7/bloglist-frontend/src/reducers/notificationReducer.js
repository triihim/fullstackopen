export const setNotification = notification => {
  return {
    type: "NOTIFICATION",
    notification
  };
};

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case "NOTIFICATION": return action.notification;
    default: return state;
  }
};

export default notificationReducer;