import Link from 'next/link';

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
        <h1 className="universal__head_text text-left">
            <span className='universal__head_text--secondary'>{type} Post</span>
        </h1>
        <p className="universal__description text-left max-w-md">
            {type} and share amazing stories with the world, and 
            let your imagination run wild with any AI-powered
            platform.
        </p>

        <form 
        onSubmit={handleSubmit}
        className="form"
        >
            <label>
                <span className="form__title">
                    Your AI Prompt
                </span>

                <textarea 
                value={post.prompt}
                onChange={(e) => setPost({ ...post,
                prompt: e.target.value })}
                placeholder='Write your prompt here...'
                required
                className='form__textarea'
                />
            </label>
            <label>
                <span className="form__title">
                    Tag {' '}
                    <span className='font-normal'>(#fantasy, #space, #RPG)</span>
                </span>

                <input 
                value={post.tag}
                onChange={(e) => setPost({ ...post,
                tag: e.target.value })}
                placeholder='#tag'
                required
                className='form__input'
                />
            </label>

            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className="form__cancel_button">
                    Cancel
                </Link>

                <button
                type='submit'
                disabled={submitting}
                className="form__entry_button"
                >
                    {submitting ? `${type}...` : type}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Form