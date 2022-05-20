import "../Styles/admin-nav-bar-styles.css";
import logo from "../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";

const AdminNavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <div className="container-fluid align-items-end">
        <img src={logo} className="img-fluid logo" alt="" />
        <li className="nav-item">
          <a className="nav-link adminNavLinks" href="www.google.com">
            users orders
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link adminNavLinks" href="www.google.com">
            edit products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link adminNavLinks" href="www.google.com">
            logout
          </a>
        </li>
      </div>
    </nav>
  );
};

export default AdminNavBar;
