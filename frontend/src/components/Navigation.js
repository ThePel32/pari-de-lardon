import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navigation">
            <div className="container">
                <div className="nav-buttons">
                    <NavLink 
                        to="/"
                        className={({ isActive }) => isActive ? 'btn-nav-active' : 'btn-nav-inactive'}
                        end
                    >
                        🏠 Accueil
                    </NavLink>
                    <NavLink 
                        to="/participer"
                        className={({ isActive }) => isActive ? 'btn-nav-active' : 'btn-nav-inactive'}
                    >
                        📝 Participer
                    </NavLink>
                    <NavLink 
                        to="/participants"
                        className={({ isActive }) => isActive ? 'btn-nav-active' : 'btn-nav-inactive'}
                    >
                        👥 Participants
                    </NavLink>
                    <NavLink 
                        to="/admin"
                        className={({ isActive }) => isActive ? 'btn-nav-active' : 'btn-nav-inactive'}
                    >
                        🔐 Admin
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;