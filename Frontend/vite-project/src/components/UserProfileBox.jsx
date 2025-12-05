import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfileBar = () => {
  const params  = useParams();
  const value= params.boolInvite;
  const [profileInfo, setProfileInfo] = useState([]);
  const [expand, setExpandIndex] = useState(0);
  const [invite, setinvite] = useState(value ?? false); // Default to false if not provided
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  useEffect(() => {
    getProfile();
    console.log("Invite Status:", invite);
    console.log("Params:", value);
  }, []);

  useEffect(() => {
    console.log("Profile Info:", profileInfo);
    if (profileInfo.length > 0) {
      setExpandIndex(1);
    }
  }, [profileInfo]);


  const getProfile = async () => {
    try {
      const url = "http://localhost:8080/auth/getUserProfile";
      const response = await fetch(url);
      const data = await response.json();

      if (data?.result) {
        setProfileInfo(data.result);
      } else {
        console.log("no response");
      }
    } catch (err) {
      alert("Failed to fetch user profiles.");
    }
  };

  //const filteredProfiles = profileInfo.filter(profile =>
  // profile.skills.toLowerCase().includes(props.searchTerm.toLowerCase())
  //);

  const addData = async (e, id) => {
    
    if (invite == false) {
      console.log("add function called")
      //return;
    }
    console.log("addData called with id:", id);
    if (invite == "true") {
      e.stopPropagation(); // Prevent the click from propagating to the parent element
      console.log("addData called with id:");
      if (selection.find((item) => item.UserId == id)) {
        alert("Already Invited");
        return

      } else {
        //selection.push(k)//rerendering will not happen so it is discoruaged to be use
        setSelection(prev => [...prev, { UserId: id }]);
        console.log(selection);
        return
      }
    }

  }

  return (
    <div className="profile-box">
      {expand === 1 ? (
        profileInfo.map((profile, index) => (
          <div onClick={function (e) { addData(e, profile._id) }} className="user-profile-bar" key={profile._id}>
            <h3>👤 User Profile</h3>
            <p>
              Name: {profile.name} | Tech: {profile.skills} | <br />
              Leetcode: <a href={profile.leetcode} target="_blank" style={{ color: "white" }}>{profile.leetcode}</a> | <br />
              LinkedIn: <a href={profile.linkedin} target="_blank" style={{ color: "white" }}>{profile.linkedin}</a> |
            </p>
            {profile.project.map((proj, index) => (
              <div key={proj._id || index}>
                Project Link: <a href={proj.github} target="_blank" style={{ color: "white" }}>{proj.project}</a>
              </div>
            ))}
          </div>
        ))
      ) : (
        <h2>No Matching User Profiles Found</h2>
      )}
    </div>
  );
};

export default UserProfileBar;
