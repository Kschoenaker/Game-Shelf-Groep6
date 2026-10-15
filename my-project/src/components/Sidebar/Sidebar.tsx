import "./Sidebar.css";
import * as icons from "lucide-react";
import { NavLink } from "react-router";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h1><icons.Gamepad2 /> GameShelf</h1>


            <nav>
                <button type="button">
                    <icons.Home />
                    <span>Home</span>
                </button>

                <button type="button">
                    <icons.Library />
                    <span>Collections & Shelves</span>
                </button>

                <NavLink
                    className={({ isActive }) => isActive ? "active" : ""}
                    to="/lending"
                >
                    <icons.ArrowLeftRight />
                    <span>Lending</span>
                </NavLink>

                <NavLink
                    className={({ isActive }) => isActive ? "active" : ""}
                    to="/wishlists"
                >
                    <icons.Heart />
                    <span>Wishlists & Trading</span>
                </NavLink>
            </nav>
            <div className="sidebar-bottom">
                <button type="button">
                    <icons.User />
                    <span>Account</span>
                </button>

                <button type="button">
                    <icons.Settings />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;