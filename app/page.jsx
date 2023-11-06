import Feed from '@components/Feed'
const Home = () => {
  return (
    <section className="w-full flex-center
    flex-col">
        <h1 className="universal__head_text text-center">
        AI Odyssey:
            <br />
            <span className="text-orange-500 font-extralight text-center">  Your Decision, Your Story
</span>
        </h1>
        <p className="universal__description text-center">
        See a prompt you like? Copy it and ask the IA to play a "Choose your own adventure game",
        then introduce the prompt as the initial setting!
        </p>

        <Feed />
    </section>
  )
}

export default Home