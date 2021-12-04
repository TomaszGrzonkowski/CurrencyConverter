import { Link, Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="content">
      <h1 className={"bla"}>Currency converter</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/history">History</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
