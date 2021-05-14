import { Link } from 'react-router-dom';
import './styles.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="callToActions">
        <ul>
          <li>
            <Link to="/registration">Register</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
