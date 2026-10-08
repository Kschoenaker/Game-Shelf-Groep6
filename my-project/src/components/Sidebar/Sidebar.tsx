import "./Sidebar.css";
import * as icons from "lucide-react";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h1><icons.Gamepad2 /> GameShelf</h1>

            <nav>
                <button>
                    <icons.Home />
                    <span>Home</span>
                </button>

                <button className="active">
                    <icons.Library />
                    <span>Collections & Shelves</span>
                </button>
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