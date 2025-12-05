import React, { useState } from 'react';
import MainNav from './MainNav';
import MainSidebar from "./MainSidebar";
import UserProfileBox from './UserProfileBox';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function User() {
  const [searchTerm, setSearchTerm] = useState("");
  const { boolInvite } = useParams();



  return (
    <>
      <MainNav />
      <MainSidebar setSearchTerm={setSearchTerm} />
      {
        boolInvite ? (<UserProfileBox searchTerm={searchTerm} boolInvite={boolInvite} />
        ) : (<UserProfileBox searchTerm={searchTerm} />

        )}

    </>
  );
}


