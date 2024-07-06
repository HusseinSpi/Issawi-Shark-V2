import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartJs = () => {
  const dispatch = useDispatch();
  const {
    data: projects = [],
    status,
    error,
  } = useSelector((state) => state.project || {});

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const categories = [
    "Hitech",
    "Banking",
    "Healthcare",
    "Educational",
    "Retail",
  ];

  const getTopRatedProjects = (category, projects) => {
    return projects
      .filter((project) => project.categories.includes(category))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((project) => ({ name: project.title, value: project.rating }));
  };

  const allData = categories.reduce((acc, category) => {
    acc[category] = getTopRatedProjects(category, projects);
    return acc;
  }, {});

  const [selectedCategory, setSelectedCategory] = useState("Hitech");
  const [chartData, setChartData] = useState(allData[selectedCategory] || []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setChartData(allData[category] || []);
  };

  const data = {
    labels: chartData.map((company) => company.name),
    datasets: [
      {
        label: `${selectedCategory} Projects`,
        data: chartData.map((company) => company.value),
        backgroundColor:
          selectedCategory === "Hitech"
            ? "#DC5F00"
            : selectedCategory === "Banking"
            ? "#E84545"
            : selectedCategory === "Healthcare"
            ? "#903749"
            : selectedCategory === "Educational"
            ? "#53354A"
            : "#3CB371",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <section className="mt-5 mb-0">
      <div className="flex justify-start mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded p-2 bg-white shadow-sm"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="w-10/12 mx-auto pb-16">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default ChartJs;
