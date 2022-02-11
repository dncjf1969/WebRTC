import { PieChart } from "react-minimal-pie-chart";

const Chart = () => {
  const data = [
    { title: "One", value: 30, dataEntry:2, color: "#F6CB44" },
    { title: "Two", value: 15, color: "#E3A454" },
    { title: "Three", value: 20, color: "#76BEE3" },
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