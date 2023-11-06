'use client';

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick, handleProfile }) => {
  return(
    <div className="mt-16 prompt__layout">
      {data?.map((post, index) => (
        <PromptCard
        key={index}
        post={post}
        handleTagClick={handleTagClick}
        handleProfile={handleProfile}
        />
      ))}
    </div>
  );
}

const Feed = ({ repo }) => {
  const [initialPosts, setInitialPosts] = useState([])

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults ] = useState([]);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt', { next: { tags: ['collection']}});
      const data = await response.json();
      
      setInitialPosts(data);
      setSearchedResults(data);
    } 

    fetchPosts();
  }, []); 

  //Handle search and tag
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return initialPosts.filter(
      (post) =>
      regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  // look profile posts
  const handleProfile = (creator) => {
    if(creator._id === session?.user.id) router.push("/profile")
    else router.push(`/profile/${creator._id}?name=${creator.username}`)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
        type="text"
        placeholder=">Search for a prompt, tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="home__search_input peer"
         />
      </form>

      <PromptCardList
      data={searchedResults}
      handleTagClick={handleTagClick}
      handleProfile={handleProfile}
      />
      
    </section>
  )
}

export default Feed