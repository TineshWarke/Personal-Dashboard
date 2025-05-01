const Header = () => {
    return (
        <header className="text-center">
            <h1 className="text-2xl font-bold">Job Search Tracker – 30 Day Sprint</h1>
            <p className="text-gray-600">{new Date().toDateString()}</p>
        </header>
    );
};

export default Header;
