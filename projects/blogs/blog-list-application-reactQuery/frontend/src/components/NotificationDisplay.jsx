import { useNotificationValue } from "../contexts/notificationContext"

const NotificationDisplay = () => {
  const notification = useNotificationValue()

  if (notification.type === null) {
    return <div></div>;
  } else if (notification.type === "success") {
    return (
      <div id="notification" className="success">
        {notification.message}
      </div>
    );
  } else if (notification.type === "error") {
    return (
      <div id="notification" className="failure">
        {notification.message}
      </div>
    );
  }
};

export default NotificationDisplay;
