import React from "react";
import ReactECharts from "echarts-for-react";

const ReusableBarChart = ({ data = [] }) => {
  const option = React.useMemo(
    () => ({
      xAxis: {
        type: "category",
        data: [...Array(20).keys()],
        name: "Index Position",
        nameLocation: "center",
        nameGap: 40,
      },
      yAxis: {
        type: "value",
        name: "Value",
        nameLocation: "center",
        nameGap: 40,
      },
      series: [
        {
          data: data,
          type: "bar",
          label: {
            show: true,
            position: "outside",
          },
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          magicType: { show: true, type: ["line", "bar"] },
          saveAsImage: { show: true },
        },
      },
    }),
    [data]
  );
  return <ReactECharts option={option} style={{ height: "100%" }} />;
};

export default ReusableBarChart;
