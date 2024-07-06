import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../redux/thunk/userThunks";
import ProgramsNavBar from "../../components/Programs/ProgramsNavBar";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const people = (users?.data?.users || [])
    .filter((user) => user.role === "investor")
    .map((user) => ({
      _id: user._id,
      userName: user.userName,
      role: user.role,
      photo: user.photo,
    }));

  return (
    <>
      <ProgramsNavBar />
      <section className="text-center p-10">
        <h1 className="text-4xl font-bold mb-4">LEADERSHIP</h1>
        <p className="text-lg text-gray-700 mb-10">
          We're led by a team who constantly questions, tinkers, and challenges
          to unlock great creativity around every turn.
        </p>
        <div className="flex flex-wrap justify-center">
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" &&
            people.map((person) => (
              <div
                key={person.userName}
                className="m-4 text-center transform hover:scale-105 transition-transform"
                onClick={() => navigate(`/profile/${person._id}`)}
              >
                <img
                  className="w-36 h-36 rounded-full object-cover mx-auto"
                  src={person.photo}
                  alt={person.userName}
                />
                <h2 className="text-xl font-semibold mt-4">
                  {person.userName}
                </h2>
                <p className="text-gray-600">{person.role}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Teams;
