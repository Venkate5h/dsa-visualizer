import React from "react";
import { Button, Col, Row, Space } from "antd";
import {
  FastBackwardOutlined,
  FastForwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import {
  bubbleSortWithSteps,
  insertionSortWithSteps,
  mergeSortWithSteps,
  randomizeArray,
  selectionSortWithSteps,
} from "../utils/utils";
import ReusableBarChart from "./ReusableBarChart";

const AppContent = (props) => {
  const { activeRoute } = props;
  const [iterations, setIterations] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [showAnimation, setShowAnimation] = React.useState(false);

  // Randomize the array, set counter to initial iteration
  const handleRandomize = () => {
    setShowAnimation(false);
    setCounter(0);
    setIterations([randomizeArray(30)]);
  };

  // Initialze the array and first iteration
  React.useEffect(() => {
    handleRandomize();
  }, [activeRoute]);

  // Animation handler
  React.useEffect(() => {
    let animation;
    if (showAnimation && counter < iterations.length) {
      animation = setInterval(() => {
        if (counter === iterations.length - 1) {
          // Set animation to false when counter reaches the last iteration
          setShowAnimation(false);
          clearInterval(animation);
        } else {
          setCounter((prevCounter) =>
            prevCounter === iterations.length - 1
              ? prevCounter
              : prevCounter + 1
          );
        }
      }, 500);
    }
    return () => {
      clearInterval(animation);
    };
  }, [showAnimation, counter, iterations]);

  const handleVisualize = () => {
    if (!showAnimation) {
      if (iterations?.length === 1) {
        let animatedIterations = [];
        switch (activeRoute?.path) {
          case "bubbleSort":
            animatedIterations = bubbleSortWithSteps(iterations[0]);
            break;
          case "mergeSort":
            animatedIterations = mergeSortWithSteps(iterations[0]);
            break;
          case "insertionSort":
            animatedIterations = insertionSortWithSteps(iterations[0]);
            break;
          case "selectionSort":
            animatedIterations = selectionSortWithSteps(iterations[0]);
            break;
          default:
            animatedIterations = [...iterations];
            break;
        }
        setIterations([...animatedIterations]);
      }
      if (counter === iterations?.length - 1) {
        setCounter(0);
      }
    }
    setShowAnimation((prevState) => !prevState);
  };

  return (
    <Row className="chart-container">
      <Col span={24} className="chart">
        <ReusableBarChart data={iterations?.[counter] || []} />
      </Col>
      <Col span={24} align="center">
        <Space className="chart-actions">
          <Button onClick={handleRandomize}>Randomize Array</Button>
          <Button
            disabled={showAnimation || counter === 0}
            onClick={() => setCounter(0)}
          >
            <FastBackwardOutlined />
          </Button>
          <Button
            disabled={showAnimation || counter === 0}
            onClick={() => setCounter((counter) => counter - 1)}
          >
            <StepBackwardOutlined />
          </Button>
          <Button
            type="primary"
            danger={showAnimation}
            onClick={handleVisualize}
          >
            {showAnimation ? (
              <>
                <PauseCircleOutlined /> Pause
              </>
            ) : (
              <>
                <PlayCircleOutlined /> Visualize
              </>
            )}
          </Button>
          <Button
            disabled={showAnimation || counter === iterations?.length - 1}
            onClick={() => setCounter((counter) => counter + 1)}
          >
            <StepForwardOutlined />
          </Button>
          <Button
            disabled={showAnimation || counter === iterations?.length - 1}
            onClick={() => setCounter(iterations?.length - 1)}
          >
            <FastForwardOutlined />
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default AppContent;
