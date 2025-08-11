const NotificationDisplay = (props) => {
  const { notificationType, notificationMessage } = props;

  if (notificationType === null) {
    return <div></div>;
  } else if (notificationType === "blogSuccess") {
    return (
      <div id="notification" className="success">
        <p>{notificationMessage}</p>
      </div>
    );
  } else if (notificationType === "deleted") {
    return (
      <div id="notification" className="success">
        <p>{notificationMessage}</p>
      </div>
    );
  } else if (notificationType === "error") {
    return (
      <div id="notification" className="failure">
        {`login unsuccessful: ${notificationMessage}`}
      </div>
    );
  }
};

export default NotificationDisplay;
