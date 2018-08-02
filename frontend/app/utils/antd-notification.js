import { notification } from 'antd';

const openNotificationWithIcon = (type, message, description, icon = null) => {
  notification[type]({
    message,
    description,
    icon,
  });
};

export default openNotificationWithIcon;
