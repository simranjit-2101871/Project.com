/*import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GSideBar() {
    const navigate = useNavigate();
    const createGroup = (e) => {
        e.preventDefault();
        navigate('/createGroup');
    }
    return (
        <div className='gsidebar'>
            <form className='sidebar-form'>
               

                <button  onClick={createGroup}type="submit">Create</button>
            </form>
        </div>
            )
*/
import React, { useState } from 'react';
import Modal from './Modal';
import Create from './Create';

export default function Groups() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="create-btn" onClick={() => setShowModal(true)}>Create</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Create />
        </Modal>
      )}

      {/* rest of your groups UI */}
    </div>
  );
}


