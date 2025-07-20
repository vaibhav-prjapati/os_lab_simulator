import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";
import { useEffect, useState } from "react";
import "./PieChart.css";

const PieChart = ({ data, y }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [colorSchemes, setColorSchemes] = useState([]);
  const [explodeIndex, setExplodeIndex] = useState(0);

  useEffect(() => {
    // Add debugging
    console.log("PieChart data:", data);
    console.log("PieChart y field:", y);

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn("PieChart: Invalid or empty data");
      return;
    }

    let newPieChartData = [];
    let newColorSchemes = [];
    let newExplodeIndex = 0;
    let hasValidData = false;

    data.forEach((process, curIndex) => {
      const yValue = process[y];

      // Check if y field exists and has valid value
      if (yValue !== undefined && yValue !== null && yValue > 0) {
        newPieChartData.push({
          x: process.Pid || `Item ${curIndex + 1}`, // Fallback if Pid is missing
          y: yValue,
        });
        newColorSchemes.push(
          process.color || `hsl(${curIndex * 40}, 70%, 50%)`
        ); // Fallback color
        hasValidData = true;

        // Choose the first non-zero value for exploding
        if (explodeIndex === 0 && yValue > 0) {
          newExplodeIndex = newPieChartData.length - 1;
        }
      }
    });

    console.log("Processed pie chart data:", newPieChartData);
    console.log("Has valid data:", hasValidData);

    if (!hasValidData) {
      console.warn("PieChart: No valid data points found");
      return;
    }

    setPieChartData(newPieChartData);
    setColorSchemes(newColorSchemes);
    setExplodeIndex(newExplodeIndex);
  }, [data, y]); // Added dependencies

  // Don't render if no valid data
  if (!pieChartData || pieChartData.length === 0) {
    return <div>No data available for chart</div>;
  }

  return (
    <AccumulationChartComponent
      id={`chart-${y}`}
      className="pie-chart-container"
      height="400px"
      enableSmartLabels={true}
      tooltip={{ enable: true }}
      background="transparent"
      textRender={(args) => {
        args.font.color = "var(--chart-text-color)";
        args.font.size = "var(--chart-font-size)";
      }}
      legendSettings={{
        textStyle: {
          color: "var(--chart-text-color)",
          size: "var(--chart-font-size)",
        },
      }}
    >
      <Inject
        services={[
          AccumulationLegend,
          AccumulationTooltip,
          AccumulationDataLabel,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={pieChartData}
          xName="x"
          yName="y"
          type="Pie"
          explode={true}
          explodeOffset="17"
          explodeIndex={explodeIndex}
          dataLabel={{ visible: true }}
          palettes={colorSchemes}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default PieChart;
