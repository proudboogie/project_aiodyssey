import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleDelete, handleEdit, handleTagClick }) => {
  return (
  <div className="prompt__layout">
    {data.map((post, index) => (
      <PromptCard
      key={index}
      post={post}
      handleEdit={() => handleEdit && handleEdit(post)}
      handleDelete={() => handleDelete && handleDelete(post)}
      handleTagClick={handleTagClick}
      />
  ))}
</div>)
}

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleTagClick }) => {

  
  return (
    <section className='profile'>
        <h1 className='universal__head_text universal__head_text--secondary'>
            {name} Profile
        </h1>
        <p className='universal__description text-left pb-3'>{desc}</p>
        <PromptCardList 
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleTagClick={handleTagClick}
        />
    </section>
  )
}

export default Profile