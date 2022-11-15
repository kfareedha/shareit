import React, { useState } from "react";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { UilPen } from "@iconscout/react-unicons";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="InfoCard">
      <div className="InfoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>
      <div className="Info">
        <span>
          <b>Status </b>
        </span>
        <span>In Relationship</span>
      </div>
      <div className="Info">
        <span>
          <b>Lives In </b>
        </span>
        <span>Calicut</span>
      </div>
      <div className="Info">
        <span>
          <b>Works at </b>
        </span>
        <span>Brototype</span>
      </div>
      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
