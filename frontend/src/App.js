import "./css.css"

function App() {
    return (
        <>
            <nav>
                <div class="logo">CB</div>
                <div class="nav-items">
                    <a href="/">HOME</a>
                    <a href= "/">LOGIN</a>
                    <a href="/">About Us</a>

                </div>
            </nav>
            <div class="parent-container">
                <div class="content">
                    <div class="slider-wrapper">
                        Shop For
                        <div class="slider">
                            <div class="slider-text1">Shoes</div>
                            <div class="slider-text2">Cars</div>
                            <div class="slider-text3">AIRPODS</div>
                        </div>
                    </div>
                </div>
                <div class="image-container">
                    <img src="jordans.png" alt="shoes" width="300" height="300" />
                </div>
            </div>
        </>
    );
}

export default App;
