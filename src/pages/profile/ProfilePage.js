import React from "react";
import ProfileContainer from "../../containers/Profile";

function ProfilePage(props) {
  return (
    <>
      <ProfileContainer email={props.location.state.email} />
    </>
  );
}

export default ProfilePage;
