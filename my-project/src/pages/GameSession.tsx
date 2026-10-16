
import { useState } from "react";
import {Link, Route, Routes} from "react-router";
import "./GameSession.css";
import SideBar from "../components/Sidebar/Sidebar";
import * as icons from "lucide-react";

// TYPES

type GameSessionItem = {
    id: number;
    hostId: number;
    title: string;
    dateTime: string;
    place: string;
    capacity: number;
    cancelled: boolean;
};

type SessionView =
    | "start"
    | "create"
    | "explore"
    | "joined"
    | "created";

type SessionHeaderProps = {
    title: string;
    subtitle: string;
};

type SessionCardProps = {
    title: string;
    description: string;
    icon: typeof icons.PlusCircle;
    onClick: () => void;
};

type GameSessionItemCardProps = {
    gameSessionItem: GameSessionItem;
};

// TEMPORARY SESSION DATA

const tempSessions: GameSessionItem[] = [
    {
        id: 1,
        hostId: 101,
        title: "FIFA Game Night",
        dateTime: "2026-10-20T19:00:00",
        place: "Club Room",
        capacity: 4,
        cancelled: false,
    },
    {
        id: 1,
        hostId: 101,
        title: "FIFA Game Night",
        dateTime: "2026-10-20T19:00:00",
        place: "Club Room",
        capacity: 4,
        cancelled: false,
    },
    {
        id: 2,
        hostId: 102,
        title: "Board Game Evening",
        dateTime: "2026-10-21T18:30:00",
        place: "Kitchen Table",
        capacity: 3,
        cancelled: false,
    },
    {
        id: 3,
        hostId: 103,
        title: "Strategy Games",
        dateTime: "2026-10-22T19:00:00",
        place: "Club Room",
        capacity: 6,
        cancelled: false,
    },
];

// START PAGE CARDS

const SessionCards = [
    {
        id: 1,
        title: "Create a Session",
        description: "Create and organize your own session.",
        icon: icons.PlusCircle,
        view: "create",
    },
    {
        id: 2,
        title: "Explore Sessions",
        description: "Discover available sessions and find one to join.",
        icon: icons.Compass,
        view: "explore",
    },
    {
        id: 3,
        title: "My Joined Sessions",
        description: "View the sessions you have signed up for.",
        icon: icons.Users,
        view: "joined",
    },
    {
        id: 4,
        title: "Created Sessions",
        description: "Manage the sessions you have created.",
        icon: icons.Gamepad2,
        view: "created",
    },
] as const;

// HEADER COMPONENT

function SessionHeader({
    title,
    subtitle,
}: SessionHeaderProps) {
    return (
        <header className="session-header">
            <p className="session-eyebrow">GAME CENTER</p>
            <h1>{title}</h1>
            <p className="session-subtitle">{subtitle}</p>
        </header>
    );
}

// START PAGE CARD COMPONENT

function SessionCard({title,description,icon: Icon,onClick,}: SessionCardProps) {
    return (
        <button
            type="button"
            className="session-card"
            onClick={onClick}
        >
            <div className="session-card-icon">
                <Icon size={28} />
            </div>

            <div className="session-card-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            <icons.ArrowUpRight
                className="session-card-arrow"
                size={20}
            />
        </button>
    );
}



// INDIVIDUAL GAME SESSION CARD

function GameSessionItemCard({gameSessionItem,}: GameSessionItemCardProps) {
    const date = new Date(gameSessionItem.dateTime);

    const day = date.toLocaleDateString("nl-NL", {
        day: "2-digit",
    });

    const month = date
        .toLocaleDateString("nl-NL", {
            month: "short",
        })
        .replace(".", "");

    const time = date.toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <article className="session-card session-game-card ">
            <div className="session-date">
                <span>{day}</span>
                <span>{month}</span>
            </div>

            <div className="session-card-content">
                <h2>{gameSessionItem.title}</h2>

                <p>Location: {gameSessionItem.place}</p>

                <p>
                    Time: {time}
                </p>

                <p>
                    Capacity: {gameSessionItem.capacity} players
                </p>

                {gameSessionItem.cancelled && (
                    <p>Cancelled</p>
                )}
            </div>
        </article>
    );
}

// MAIN PAGE

export function GameSession() {
    const [activeView, setActiveView] =
        useState<SessionView>("start");

    return (
        <div className="session-layout">
            <SideBar />

            <main className="session-page">

                {/* 1. START PAGE */}

                {activeView === "start" && (
                    <>
                        <SessionHeader
                            title="Game Sessions"
                            subtitle="Find your players. Start a game. Make it legendary."
                        />

                        <section className="session-grid">
                            {SessionCards.map((session) => (
                                <SessionCard
                                    key={session.id}
                                    title={session.title}
                                    description={session.description}
                                    icon={session.icon}
                                    onClick={() =>
                                        setActiveView(session.view)
                                    }
                                />
                            ))}
                        </section>
                    </>
                )}

                {/* 2. CREATE SESSION */}

                {activeView === "create" && (
                    <>
                        <button
                            type="button"
                            className="session-back"
                            onClick={() => setActiveView("start")}
                        >
                            <icons.ArrowLeft size={18} />
                            Back to Game Sessions
                        </button>

                        <SessionHeader
                            title="Create a Session"
                            subtitle="Set up a new gaming session."
                        />

                        {/* Create session form comes here */}
                    </>
                )}

                {/* 3. EXPLORE SESSIONS */}

                {activeView === "explore" && (
                    <>
                        <button
                            type="button"
                            className="session-back"
                            onClick={() => setActiveView("start")}
                        >
                            <icons.ArrowLeft size={18} />
                            Back to Game Sessions
                        </button>

                        <SessionHeader
                            title="Explore Sessions"
                            subtitle="See the sessions and find one to join."
                        />

                        <section className="game-session-card">
                            {tempSessions
                                .filter(
                                    (session) => !session.cancelled
                                )
                                .map((session) => (
                                    <GameSessionItemCard
                                        key={session.id}
                                        gameSessionItem={session}
                                    />
                                ))}
                        </section>
                    </>
                )}

                {/* 4. JOINED SESSIONS — TO BE BUILT */}

                {activeView === "joined" && (
                    <>
                        <button
                            type="button"
                            className="session-back"
                            onClick={() => setActiveView("start")}
                        >
                            <icons.ArrowLeft size={18} />
                            Back to Game Sessions
                        </button>

                        <SessionHeader
                            title="My Joined Sessions"
                            subtitle="View all sessions you have signed up for."
                        />
                    </>
                )}

                {/* 5. CREATED SESSIONS — TO BE BUILT */}

                {activeView === "created" && (
                    <>
                        <button
                            type="button"
                            className="session-back"
                            onClick={() => setActiveView("start")}
                        >
                            <icons.ArrowLeft size={18} />
                            Back to Game Sessions
                        </button>

                        <SessionHeader
                            title="Created Sessions"
                            subtitle="View and manage the sessions you organize."
                        />
                    </>
                )}

            </main>
        </div>
    );
}

export default GameSession;
