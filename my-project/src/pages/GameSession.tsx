
import "./GameSession.css";
import SideBar from "../components/Sidebar/Sidebar";

const Sessioncards = [
    {},
    {},
    {},
    {}
];

type Session = {
    sessionId: number,
    title: string,
    description : string,
    date : Date,
    status : "canceled" | "ongoing",
}

type SignUp = {
    signUpId : number
}

type headerProps = {
    title : string,
    subtitle : string
}

function header(props : headerProps){
    return (
        <div>
            <h1>{props.title}</h1>,
            <p>{props.subtitle}</p>
        </div>
    )
}



function Sessioncard() {
    return (
        <p>test card</p>
        
    );
}


export function GameSession() {
    return (
        <>
            <SideBar />

            <main className="session-page">
                <Sessioncard />
            </main>
        </>
    );
}

export default GameSession;
