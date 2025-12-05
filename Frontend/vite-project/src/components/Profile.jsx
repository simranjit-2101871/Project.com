import React, { useEffect, useState } from "react";


export default function Profile() {
  const [makeProfile, setMakeProfile] = useState(0);
  const [status, setStatus] = useState({});

  const [edit, setEdit] = useState(0);


  useEffect(() => {
    const itm = localStorage.getItem('UserProfile');
    if (itm === null) {
      setStatus({ ...status });
    }
    else {
      setStatus(JSON.parse(itm)); // Parse the string into an object
      setEdit(0);
    }
    //cannot convert the udefined or null into an object
  }, []);



  const [profile, setProfile] = useState({
    photo: "",
    name: "",
    skills: "",
    project: [{ project: "", github: "" }],
    leetcode: "",
    linkedin: "",
  });
  console.log(profile);



  const addProject = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      project: [...prevProfile.project, { project: "", github: "" }]
    }));
  };

  // Handle input change for projects
  const handleProjectChange = (index, field, value) => {
    //copy the old object
    const prevObject = { ...profile }
    //opy te old array state
    const prevArray = [...profile.project]
    prevArray[index] = { ...prevArray[index], [field]: value };
    setProfile({ ...profile, project: prevArray })//state has been updated
    console.log(profile);
  }


  const handleOnChange = (e) => {

    if (e.target.type === "file") {
      const file = e.target.files[0];
      setProfile((prevalue) => ({
        ...prevalue,
        photo: file,
        certificates: file
      }));
    } else {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value

      })
    }

    console.log(profile);
  }

  /*const onSubmit = (e) => {
    e.preventDefault();
    //setMakeProfile(1);
    //localStorage.setItem('ProfileStatus', makeProfile);
    localStorage.setItem('UserProfile', profile);
    const item = localStorage.getItem('usrProfile');
    //setStatus({...status,item})//dont know of the syntax would be correct or not
    setStatus(item)
  }*/
  const onSubmit = async (e) => {
    e.preventDefault();
    //the ftechmethod here will be used to send the data to mongo
    
    const form=new FormData();
    form.append("photo", profile.photo); // Assuming profile.photo is a File object
    form.append("name", profile.name);
    form.append("skills", profile.skills);
    form.append("project", JSON.stringify(profile.project));//NEED TO STRINGY BECAUSE IT WAS SHOWING UNEXPECTD RESULTS
    form.append("linkedin", profile.linkedin);
    form.append("leetcode", profile.leetcode);

    try {
      const url = "http://localhost:8080/auth/setProfile"
      const response = await fetch(url, {
        method: "POST",
        /*headers: {
          "Content-Type": "multipart/form-data"

        },*///no need when using formdata
        body: form
      })

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        alert("Post has been send to server successfully ")
        localStorage.setItem('UserProfile', JSON.stringify(profile)); // Store as JSON string
        const item = JSON.parse(localStorage.getItem('UserProfile')); // Retrieve and parse JSON
        setStatus(item); // Update state properly
        console.log(status);
        setEdit(0);
      }
      else {
        alert(message,error)
      }
    } catch (err) {
      alert(`error in submit button try block${err}`);

    }

    // the below code will be used to send and retrive data to laocal storage for the purpose of swtiching tabs between make and edit profile option
    /*localStorage.setItem('UserProfile', JSON.stringify(profile)); // Store as JSON string
    const item = JSON.parse(localStorage.getItem('UserProfile')); // Retrieve and parse JSON
    setStatus(item); // Update state properly
    console.log(status);
    setEdit(0);
    */

  };

  const allowEdit = async (e) => {
    e.preventDefault();
    try{
      console.log("enterd try");
      const url = "http://localhost:8080/auth/editProfile"
      const response = await fetch(url, {
        method: "DELETE",
      })
      if(response.ok){
        console.log("response")
      }else{
        console.log("no response");
      }

    }catch(err){
      alert("Delete try block not eneterd");   
    }
    localStorage.clear();
    setEdit(1);
  }


  return (
    <>
      {
        Object.keys(status).length === 0 || edit === 1 ? (
          <div className="enclosure">
            <div className="profile-container">
              <h2>Create Your Profile</h2>
              <form className="profile-form">
                {/* Photo Upload */}
                <label>Upload Photo:</label>
                <input onChange={handleOnChange} name="image" type="file" accept="image/*" />

                {/* Full Name */}
                <label>Full Name:</label>
                <input onChange={handleOnChange} name="name" type="text" placeholder="Enter your full name" />

                {/* Tech Skills */}
                <label>Tech Skills:</label>
                <input onChange={handleOnChange} name="skills" type="text" placeholder="E.g., React, Node.js, Python" />

                {/* Projects Section */}
                <div className="projects-section">
                  <label>Projects:</label>

                  {profile.project.map((project, index) => (

                    <div key={index} className="project-field">
                      <input
                        name="project"
                        type="text"
                        placeholder="Project Name"
                        //value={project.name}
                        onChange={(e) => handleProjectChange(index, "project", e.target.value)}
                      />
                      <input
                        name="github"
                        type="text"
                        placeholder="GitHub Link"
                        //value={project.github}
                        onChange={(e) => handleProjectChange(index, "github", e.target.value)}
                      />
                    </div>
                  ))}
                  <button onClick={addProject} type="button" >
                    + Add Another Project
                  </button>
                </div>

                {/* Problem-Solving Platform Link */}
                <label>LeetCode/CodeChef Profile:</label>
                <input onChange={handleOnChange} name="leetcode" type="text" placeholder="Enter profile link" />

                {/* LinkedIn Profile Link */}
                <label>LinkedIn Profile:</label>
                <input onChange={handleOnChange} name="linkedin" type="text" placeholder="Enter LinkedIn profile link" />


                {/* Make Profile Button */}
                <button onClick={onSubmit} type="submit" className="submit-btn">
                  Make Profile
                </button>
              </form>
            </div>
          </div>

        ) : (
          <div className="enclosure">
            <div className="profile-container">
              <h2>Create Your Profile</h2>
              <form className="profile-form">
                {/* Photo Upload */}
                <label>Upload Photo:</label>
                <input value={status.image} name="image" type="file" accept="image/*" />

                {/* Full Name */}
                <label>Full Name:</label>
                <input value={status.name} name="name" type="text" placeholder="Enter your full name" />

                {/* Tech Skills */}
                <label>Tech Skills:</label>
                <input value={status.skills} name="skills" type="text" placeholder="E.g., React, Node.js, Python" />

                <div className="projects-section">
                  <label>Projects:</label>

                  {status.project.map((item, index) => (

                    <div key={index} className="project-field">
                      <input
                        name="project"
                        type="text"
                        placeholder="Project Name"
                        value={item.project}

                      />
                      <input
                        name="github"
                        type="text"
                        placeholder="GitHub Link"
                        value={item.github}

                      />
                    </div>
                  ))}
                </div>


                {/* Problem-Solving Platform Link */}
                <label>LeetCode/CodeChef Profile:</label>
                <input value={status.leetcode} name="leetcode" type="text" placeholder="Enter profile link" />

                {/* LinkedIn Profile Link */}
                <label>LinkedIn Profile:</label>
                <input calue={status.linkedin} name="linkedin" type="text" placeholder="Enter LinkedIn profile link" />


                <button onClick={allowEdit} type="submit" className="submit-btn">Edit Profile</button>
              </form>
            </div>
          </div>

        )
      }

    </>
  )

}



