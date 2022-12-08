import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadActions";
import { updateUser } from "../../actions/UserActions";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="40%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            value={formData.username}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="LIves in"
            onChange={handleChange}
            value={formData.livesIn}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div>
          Profile image
          <input
            type="file"
            className="infoInput"
            name="profileImage"
            onChange={onImageChange}
          />
        </div>
        <div>
          Cover image
          <input
            type="file"
            className="infoInput"
            name="coverImage"
            onChange={onImageChange}
          />
        </div>
        <button className="button infoButton" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
