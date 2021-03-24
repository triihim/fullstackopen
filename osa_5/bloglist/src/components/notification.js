export const NotificationType = Object.freeze({
  ERROR: 1,
  SUCCESS: 2
});

export const Notification = ({content}) => {
  const type = content.type;
  const message = content.message;
  const style = {
    border: "1px solid",
    borderColor: type === NotificationType.ERROR ? "red" : "green",
    color: type === NotificationType.ERROR ? "red" : "green",
    margin: "5px",
    padding: "5px 10px"
  }
  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
}
