import { auth } from "./../../firebase/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  return (
    <header className="header">
      <div className="callToActions">
        {!currentUser ? (
          <ul>
            <li>
              <Link to="/dashboard">MY Account</Link>
            </li>
            <li>
              <Link to="/registration">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        ) : (
          <span onClick={() => auth.signOut()}>Logout</span>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
