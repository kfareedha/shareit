import React from "react";
import { useSelector } from "react-redux";

import Modal from "../../components/Modal/Modal";

function Verify() {
  const { user } = useSelector((state) => state.authReducer.authData);

  // const userDetails = localStorage.getItem('user')
  console.log(user);
  return (
    <div>
      <Modal user={user} />
    </div>
  );
}

export default Verify;
