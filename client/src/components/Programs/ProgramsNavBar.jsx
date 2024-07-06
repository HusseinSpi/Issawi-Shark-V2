import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/thunk/navbarThunks";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { useNavigate } from "react-router-dom";

const ProgramsNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.navbar);
  const { data: projectsData } = useSelector((state) => state.project);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projectsData) {
      const filtered = projectsData.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
      console.log(filteredProjects);
    }
  }, [searchTerm, projectsData]);

  const person = userData?.data.user || {
    _id: "",
    userName: "",
    email: "",
    role: "",
    photo: "",
  };

  return (
    <div className="flex flex-col p-4 bg-thirdColor shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="flex items-center border rounded-xl px-2 py-1 w-96 h-11 bg-white shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search projects"
              className="w-full h-full outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => navigate(`/profile/${person._id}`)}
        >
          <span className="text-gray-700">{person.email}</span>
          <img
            src={
              person.photo ||
              "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      {searchTerm && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Search Results:</h2>
          <ul>
            {filteredProjects.map((project) => (
              <li
                key={project._id}
                className="cursor-pointer p-2 border-b"
                onClick={() => navigate(`/project/${project._id}`)}
              >
                {project.title}
              </li>
            ))}
          </ul>
          {filteredProjects.length === 0 && (
            <p className="text-gray-500">No projects found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramsNavBar;
