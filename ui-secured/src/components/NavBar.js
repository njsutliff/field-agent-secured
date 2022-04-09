import { Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from "../AuthContext";
const NavBar = () => {

  const auth = useContext(AuthContext);
  return (
      <>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/todos">Todos</Link>
      </li>
      {!auth.user && (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </ul>
    {auth.user && (
        <div>
        <p>Hello {auth.user.username}!</p>
        <button onClick={() => auth.logout()} className="btn btn-primary">Logout</button>
        </div>
    )}
    </>
  );
};

export default NavBar;