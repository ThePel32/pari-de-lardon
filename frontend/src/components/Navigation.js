function Navigation({ currentPage, setCurrentPage }) {
    return (
        <nav className="navigation">
            <div className="container">
                <div className="nav-buttons">
                    <button 
                        className={currentPage === 'accueil' ? 'btn-nav-active' : 'btn-nav-inactive'}
                        onClick={() => setCurrentPage('accueil')}
                    >
                        🏠 Accueil
                    </button>
                    <button 
                        className={currentPage === 'formulaire' ? 'btn-nav-active' : 'btn-nav-inactive'}
                        onClick={() => setCurrentPage('formulaire')}
                    >
                        📝 Participer
                    </button>
                    <button 
                        className={currentPage === 'participants' ? 'btn-nav-active' : 'btn-nav-inactive'}
                        onClick={() => setCurrentPage('participants')}
                    >
                        👥 Participants
                    </button>
                    <button 
                        className={currentPage === 'admin' ? 'btn-nav-active' : 'btn-nav-inactive'}
                        onClick={() => setCurrentPage('admin')}
                    >
                        🔐 Admin
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;