import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  updateUser,
  getUserById,
} from "../../redux/thunk/userThunks";
import MyAccountForm from "../../components/account/MyAccountForm";
import MyAccountProfile from "../../components/account/MyAccountProfile";
import { useParams } from "react-router-dom";
import AccountForm from "../../components/account/AccountForm";
import AccountProfile from "../../components/account/AccountProfile";

const Account = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const {
    data: userData,
    status,
    error,
  } = useSelector((state) => state.navbar);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    age: false,
    github: false,
    about: false,
    photo: false,
  });

  const [userDetails, setUserDetails] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: "",
    age: "",
    github: "",
    about: "",
    photo: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId)).then((response) => {
        if (response.payload) {
          setUserDetails(response.payload.data.user);
        }
      });
    }
  }, [dispatch, userId]);

  console.log(userDetails);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSave = async (field) => {
    await dispatch(updateUser({ [field]: userDetails[field] }));
    setEditMode({ ...editMode, [field]: false });
    dispatch(getCurrentUser());
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <div className="text-2xl font-bold">My Account</div>
        <p className="text-gray-600">
          You can change your account settings here
        </p>
      </div>

      <div className="flex space-x-8">
        {userData.data.user._id === userDetails._id ? (
          <>
            <MyAccountForm
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              editMode={editMode}
              setEditMode={setEditMode}
              handleSave={handleSave}
            />
            <MyAccountProfile
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              editMode={editMode}
              setEditMode={setEditMode}
              handleSave={handleSave}
            />
          </>
        ) : (
          <>
            <AccountForm userDetails={userDetails} />
            <AccountProfile userDetails={userDetails} />
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
