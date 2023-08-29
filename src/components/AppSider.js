import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SwapOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, Space, Typography } from "antd";
import { menuRoutes } from "../routes/routes";
const { Header } = Layout;

const AppSider = (props) => {
  const { activeRoute } = props;
  const navigate = useNavigate();
  const selectedKeys = useMemo(() => [activeRoute?.path], [activeRoute]);

  return (
    <>
      <Header className="App-sider-header">
        <Space>
          <Avatar icon={<SwapOutlined />} />
          <Typography.Text className="App-title">
            DSA Visualizer
          </Typography.Text>
        </Space>
      </Header>
      <Menu
        className="App-sider-menu"
        theme="dark"
        mode="vertical"
        items={menuRoutes}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => navigate(key)}
      />
    </>
  );
};

export default AppSider;
