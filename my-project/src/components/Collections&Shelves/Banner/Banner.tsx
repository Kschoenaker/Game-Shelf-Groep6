import "./Banner.css";

function Banner() {
    const backgrounds = [
        "/backgrounds/gaming-01.jpg",
        "/backgrounds/gaming-03.jpg",
        "/backgrounds/gaming-08.jpg",
    ];

    const randomBackground =
        backgrounds[Math.floor(Math.random() * backgrounds.length)];

    return (
        <section className="banner">
            <div
                className="games-banner"
                style={{ backgroundImage: `url(${randomBackground})` }}
            >
                <div className="games-banner-content">
                    <h2>MY GAMES</h2>

                    <div className="games-banner-stats">
                        <span>24 GAMES</span>
                        <span>5 SHELVES</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;