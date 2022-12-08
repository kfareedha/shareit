import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logout } from "../../actions/Authactions";
const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);
  return (
    <div className="InfoCard">
      <div className="InfoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="Info">
        <span>
          <b>Status </b>
        </span>
        <span>
          {user._id === profileUserId
            ? profileUser?.relationship
            : profileUser?.data?.relationship}
        </span>
      </div>
      <div className="Info">
        <span>
          <b>Lives In </b>
        </span>
        <span>
          {user._id === profileUserId
            ? profileUser?.livesIn
            : profileUser?.data?.livesIn}
        </span>
      </div>
      <div className="Info">
        <span>
          <b>Works at </b>
        </span>
        <span>
          {user._id === profileUserId
            ? profileUser?.worksAt
            : profileUser?.data?.worksAt}
        </span>
      </div>
      {user._id === profileUserId && (
        <button className="button logout-button" onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default InfoCard;
