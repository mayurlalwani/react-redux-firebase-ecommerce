import { auth } from './../../firebase/utils';
import { Link } from 'react-router-dom';
import './styles.scss';

const Header = (props) => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="callToActions">
        {!currentUser ? (
          <ul>
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
