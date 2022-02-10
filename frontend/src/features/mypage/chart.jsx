import { PieChart } from "react-minimal-pie-chart";

const Chart = ({Personality, Debate, PT}) => {
  const data = [
    { title: "One", value: Personality, dataEntry:2, color: "#F6CB44" },
    { title: "Two", value: Debate, color: "#E3A454" },
    { title: "Three", value: PT, color: "#76BEE3" },
  ];

  return (
      <PieChart
        data={data}
        label={({ dataEntry }) => dataEntry.value}
        animate
      />
  );
};

export default Chart;