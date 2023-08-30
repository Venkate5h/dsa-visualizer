import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Row, Typography } from "antd";
import { menuRoutes } from "../routes/routes";
import logo from "../assets/logo.svg";

const { Header } = Layout;

const AppSider = (props) => {
  const { activeRoute } = props;
  const navigate = useNavigate();
  const selectedKeys = useMemo(() => [activeRoute?.path], [activeRoute]);

  return (
    <>
      <Header className="App-sider-header">
        <Row align="middle" justify="center" style={{ height: "100%" }}>
          <img src={logo} alt="logo" width="35px" />
          <Typography.Text className="App-title">
            DSA Visualizer
          </Typography.Text>
        </Row>
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
