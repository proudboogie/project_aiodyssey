"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

import Profile from '@components/Profile';

const UserProfile = ( { params } ) => {
  const searchParams = useSearchParams();
  const profileName = searchParams.get("name");

  //const userId = usePathname().slice(9);
  
  const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();
          setPosts(data);
        } 
    
        if (params?.id) fetchPosts();
      }, [params?.id]);


  return (
    <Profile 
    name={profileName}
    desc={`Welcome to ${profileName} profile page`}
    data={posts}
    />
  )
}

export default UserProfile