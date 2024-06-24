import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://randomuser.me/api/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setUser(data.results[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Random User</h1>
      {user && (
        <div className="userCard">
          <img src={user.picture.large} alt="" />
          <h1 className="name">
            {user.name.title} {user.name.first} {user.name.last}
          </h1>
          <div className="address">
            <p className="addressLine1">
              {user.location.street.number} {user.location.street.name}
            </p>
            <p className="addressLine2">
              {user.location.city}, {user.location.state}{" "}
              {user.location.postcode}
            </p>
            <p className="email">
              Email: <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
            <p className="dateOfBirth">
              Date of Birth: {formatDate(user.dob.date)}
            </p>
            <p className="phoneNumber">
              Cell phone: <a href={`tel:${user.cell}`}>{user.cell}</a>
            </p>
            <p className="userLoginInfo">Username: {user.login.username}</p>
          </div>
        </div>
      )}

      <button onClick={fetchUser}>Get New Random User</button>
    </div>
  );
}

export default App;
