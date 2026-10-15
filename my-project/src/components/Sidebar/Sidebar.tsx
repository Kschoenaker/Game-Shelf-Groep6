import "./Sidebar.css";
import * as icons from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <h1><icons.Gamepad2 /> GameShelf</h1>

            <nav>
                {/* <button> */}
                    {/* <icons.Home /> */}
                    <button className="view-all-games-button" onClick={() => navigate("/home")}>
                    <icons.Home />
                        Home
                    </button>
                {/* </button> */}

                <div className="sidebar-dropdown">
                    <div className="sidebar-dropdown-heading">
                        <button
                            type="button"
                            className="view-all-games-button"
                            onClick={() => navigate("/collections&shelves")}
                        >
                            <icons.Library />
                            <span>Collections & Shelves</span>
                        </button>

                        <button
                            type="button"
                            aria-label="Menu openen of sluiten"
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <icons.ChevronDown />
                        </button>
                    </div>

                    {isOpen && (
                        <ul>
                            <button className="view-all-games-button" onClick={() => navigate("/games")}>
                                View all games
                            </button>
                            <button className="view-all-games-button" onClick={() => navigate("/shelves")}>
                                View all shelves
                            </button>
                        </ul>
                    )}
                </div>
            </nav>

            <div className="sidebar-bottom">
                <button>
                    <icons.User />
                    <span>Account</span>
                </button>

                <button>
                    <icons.Settings />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;