import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>ISSAT SO DASHBOARD</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
        <Link to="/signup">
          <button type="button" className={styles.white_btn}>
            Add Users
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Main;
