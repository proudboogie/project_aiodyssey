"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, handleProfile}) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState("Copy");

  const handleCopy = () => {
    setCopied("Copied!");
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied("Copy"), 3000);
  }

  return (
    <div className='prompt__card'>
      <div className='flex justify-between items-start gap-5'>
        <div
        className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        onClick={() => handleProfile && handleProfile(post.creator)}
        >
          <div className='flex flex-col'>
            <h3 className='prompt__name'>{post.creator.username}</h3>
            <p className='prompt__email'>{post.creator.email}</p>
          </div>
        </div>

        <div className='universal__btn copy_btn' onClick={handleCopy}>
          {copied}
        </div>
      </div>

      <p className='my-4 prompt__prompt'>{post.prompt}</p>
      <p className='prompt__tag cursor-pointer'
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-orange-400 pt-3'>
          <p className='prompt__edit_button'
          onClick={handleEdit}
          >
            Edit
          </p>
          <p className='prompt__delete_button'
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard