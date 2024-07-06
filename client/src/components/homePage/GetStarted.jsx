import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-primaryColor text-secondaryColor py-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4 slide-in-up">
          Get Started With InvestPro
        </h3>
        <p className="mb-8 slide-in-up">
          Discover tips & news for your health from experts and get the best
          discounts by getting started.
        </p>
        <button
          className="bg-thirdColor text-primaryColor py-2 px-4 rounded hover-bounce"
          onClick={() => navigate("/sign-up")}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default GetStarted;
