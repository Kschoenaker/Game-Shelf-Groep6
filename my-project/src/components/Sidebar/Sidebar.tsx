import "./Sidebar.css";
import * as icons from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

function Sidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="sidebar">
            <h1><icons.Gamepad2 /> GameShelf</h1>


            <nav>
                <button className="view-all-games-button" onClick={() => navigate("/home")}>
                    <icons.Home />
                    Home
                </button>

                <button type="button">
                    <icons.Library />
                    <span>Collections & Shelves</span>
                </button>
                <button className="active">
                    <icons.Library />
                    <span>Game session</span>
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