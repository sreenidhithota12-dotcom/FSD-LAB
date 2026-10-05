import "./App.css";

const posts = [
  ["React Components", "Learn how reusable components make React applications simple and organized."],
  ["JavaScript Basics", "Understand the core concepts every beginner should know before building web apps."],
  ["What is an API?", "Learn how applications communicate and exchange data using APIs."],
  ["Git for Beginners", "A simple introduction to version control and why developers use Git."]
];

function App() {
  return (
    <>
      <header>
        <p>CODELOG</p>
        <h1>Learn. Build. Explore.</h1>
        <span>Web Development • Programming • Technology</span>
      </header>

      <main>
        <section className="featured">
          <small>FEATURED</small>
          <h2>Getting Started with React</h2>
          <p>
            Learn how React makes it easier to build modern,
            interactive user interfaces.
          </p>
          <button>Read Article →</button>
        </section>

        <h2>Latest Posts</h2>

        <div className="posts">
          {posts.map((post, i) => (
            <article key={i}>
              <small>ARTICLE {i + 1}</small>
              <h3>{post[0]}</h3>
              <p>{post[1]}</p>
              <button>Read More →</button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;