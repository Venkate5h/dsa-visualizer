import { Typography } from "antd";

const AppHeader = (props) => {
  const { activeRoute } = props;
  return (
    <Typography.Text className="App-header-label">
      {activeRoute?.label}
    </Typography.Text>
  );
};

export default AppHeader;
