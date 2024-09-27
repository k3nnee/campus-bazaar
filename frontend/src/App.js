import "./css.css"

function App() {
  return (
    <>
      <nav>
        <div class="logo"> CB</div>
        <div class="nav-items">
            <a href="/"> HOME</a>
            <a href="/"> About Us</a>
        </div>
    </nav>

    <section class="hero">
        <div class="hero-container">
            <div class="column-left">
                <h1>Start Shopping Now!</h1>
                <p>Sign UP now for free delivery on your first order</p>
            </div>
            <div class = "column-right">
        
            
            </div>
        </div>
    </section>


    <form>

        <div class="search">
            <input class="search-input" type="search" placeholder="Search... " />
            <span class="search-icon material-symbols-outlined">search</span>

        </div>
    </form>
    </>
  );
}

export default App;
