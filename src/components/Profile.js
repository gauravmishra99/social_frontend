import React from "react";
import profile from "../images/gaurav.jpeg";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__header">
        {/* <img src={profile} className="profile_pic " alt="profile pic" /> */}
        <h3 className="profile__pic">Image</h3>
        <div className="profile__header_btn">
          <button className="profile__btn">Add Friend</button>
          <button className="profile__btn">Message</button>
        </div>
      </div>

      <div className="profile__body">
        <p>post</p>
      </div>
    </div>
  );
};

export default Profile;
