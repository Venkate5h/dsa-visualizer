import { Layout } from "antd";
import AppSider from "./components/AppSider";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";
import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { routes } from "./routes/routes";

const { Content, Footer, Header, Sider } = Layout;

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeRoute = useMemo(
    () => routes.find((route) => location.pathname?.includes(route.path)),
    [location.pathname]
  );

  useEffect(() => {
    if (!activeRoute) {
      navigate("dsa-visualizer/" + routes?.[0]?.path);
    }
  }, [activeRoute, navigate]);

  return (
    <Layout className="App-layout" hasSider>
      <Sider className="App-sider">
        <AppSider activeRoute={activeRoute} />
      </Sider>
      <Layout>
        <Header className="App-header">
          <AppHeader activeRoute={activeRoute} />
        </Header>
        <Layout className="App-content-layout">
          <Content className="App-content">
            <AppContent activeRoute={activeRoute} />
          </Content>
        </Layout>
        <Footer className="App-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
