import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    class: "", // For student registration
  });
  const [error, setError] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch classes
    axios
      .get("http://localhost:3000/api/classes")
      .then((response) => {
        setClasses(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.error("Error fetching classes:", error));

    // Fetch subjects
    axios
      .get("http://localhost:3000/api/subjects")
      .then((response) => setSubjects(response.data.data))
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isStudent
        ? "http://localhost:3000/api/addStudent"
        : "http://localhost:3000/api/addTeacher";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      alert("User created successfully");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <button
            type="button"
            onClick={() => setIsStudent((prev) => !prev)}
            className={styles.white_btn}
          >
            {isStudent ? "Add a Teacher" : "Add a Student"}
          </button>
        </div>

        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>{isStudent ? "Add Student" : "Add Teacher"}</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              value={data.phoneNumber}
              required
              className={styles.input}
            />

            {isStudent ? (
              <select
                name="class"
                onChange={handleChange}
                value={data.selectedClass}
                className={styles.input}
              >
                <option value="">Select Class</option>
                {classes.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.sector}-{item.group}
                  </option>
                ))}
              </select>
            ) : (
              <>
                <select
                  name="class"
                  onChange={handleChange}
                  value={data.selectedClass}
                  className={styles.input}
                >
                  <option value="">Select Class</option>
                  {classes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.sector}-{item.group}
                    </option>
                  ))}
                </select>
                <select
                  name="subject"
                  onChange={handleChange}
                  className={styles.input}
                >
                  <option value="">Select Subjects</option>
                  {subjects.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
