import { NavLink, Outlet } from "react-router-dom";
import '../styles/stylenav.css';

export default function Layout() {
    return (
        <div className="container">
            <nav>
                <h1>Staybnb Chat</h1>
                <div>
                    <a href="http://localhost:3000" rel="noopener noreferrer">Home</a>
                    <NavLink to="/">What is Staybnb Chat?</NavLink>
                    <NavLink to="/chat">Chat</NavLink>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
