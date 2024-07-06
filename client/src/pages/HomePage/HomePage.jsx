import Stats from "../../components/homePage/Stats";
import OurValueProposition from "../../components/homePage/OurValueProposition";
import OurBestPrograms from "../../components/homePage/OurBestPrograms";
import GetStarted from "../../components/homePage/GetStarted";
import TestimonialsAboutUs from "../../components/homePage/TestimonialsAboutUs";
import OurTeam from "../../components/homePage/OurTeam";
import HeaderH from "../../components/homePage/HeaderH";

const HomePage = () => {
  return (
    <>
      <HeaderH />
      <Stats />
      <OurValueProposition />
      <OurBestPrograms />
      <GetStarted />
      <OurTeam />
      <TestimonialsAboutUs />
    </>
  );
};

export default HomePage;
