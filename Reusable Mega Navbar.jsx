export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <ul>
        <li className="nav-item">
          <a href="#">Dashboard</a>
        </li>

        <li className="nav-item">
          <a href="#">Widgets</a>
        </li>

        <li className="nav-item">
          <button
            aria-expanded={isOpen ? "true" : "false"}
            onClick={() => setIsOpen(!isOpen)}
          >
            Apps
          </button>

          <ul
            className={`sub-menu ${isOpen ? "sub-menu--open" : ""}`}
            aria-label="Apps"
          >
            <li><a href="#">Calendar</a></li>
            <li><a href="#">Chat</a></li>
            <li><a href="#">Email</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
