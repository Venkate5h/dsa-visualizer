import { Col, Row } from "antd";
import { randomizeArray } from "../utils/utils";
import ReactECharts from "echarts-for-react";

const AppContent = (props) => {
  const { activeRoute } = props;
  const option = {
    xAxis: {
      type: "category",
      data: [...Array(50).keys()],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: randomizeArray(50),
        type: "bar",
      },
    ],
  };
  return (
    <Row>
      <Col span={24}>{activeRoute?.label}</Col>
      <Col span={24}>
        {}
        <ReactECharts option={option} />
      </Col>
    </Row>
  );
};

export default AppContent;
