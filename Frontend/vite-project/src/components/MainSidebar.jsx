/*import React from 'react'

export default function MainSidebar() {
    return (
        <div className='sidebar'>
            <form className='sidebar-form'>
                
                <label htmlFor="techStack">Tech Stack:</label>
                <input type="text" id="techStack" name="techStack" placeholder="Enter Tech Stack" />

                <label htmlFor="role">Looking For:</label>
                <select id="role" name="role">
                    <option value="guide">Guide</option>
                    <option value="partner">Partner</option>
                </select>

                
                <button type="submit">Search</button>
            </form>
        </div>
            )
}
*/
import React, { useState } from 'react';

export default function MainSidebar({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <div className='sidebar'>
      <form className='sidebar-form' onSubmit={handleSubmit}>
        <label htmlFor="techStack">Tech Stack:</label>
        <input
          type="text"
          id="techStack"
          name="techStack"
          placeholder="Enter Tech Stack"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

