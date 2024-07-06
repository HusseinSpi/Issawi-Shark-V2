import ChartJs from "../../components/Programs/ChartJs";
import ProgramsNavBar from "../../components/Programs/ProgramsNavBar";
import ProjectDev from "../../components/Programs/ProjectsDev";

const General = () => {
  return (
    <>
      <ProgramsNavBar />
      <div className="container mx-auto p-4">
        <ChartJs />
        <ProjectDev />
      </div>
    </>
  );
};

export default General;
