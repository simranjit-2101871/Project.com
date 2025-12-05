import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const navigate=useNavigate();
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    console.log(groupName)

  },[groupName]);

  const handleSubmit = async (e) => {
    e.preventDefault();//by removing this line the page is the datat mongo uploads two times dont know why
    let form= new FormData();
    form.append('groupName', groupName);

    try{
      let url="http://localhost:8080/create/createGroup";
      let response = await fetch(url, {
        method: 'POST',
        body: form,
      });
      let result= await response.json();
      if(result){
        console.log(result);
      
      }
      else{
        console.log("Error in sending back the data");
      }

    }catch(err){
      console.log("The control has not enterd the the try",err)
    }
  };


  return (
    <div style={styles.formContainer}>
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            style={styles.input}
            required
          />
        </label>
        <button   onClick={handleSubmit} type="submit" style={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    width: '300px',
    color: 'black',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '0.5rem',
  },
  button: {
    backgroundColor: 'purple',
    color: 'white',
    padding: '0.6rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
