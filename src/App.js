import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        if (!response.ok) {
          throw new Error("Network reponse was not okay");
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

    fetchUser();
  }, []);

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
              {user.location.street.number} {user.location.street.name}{" "}
              {user.location.city}, {user.location.state}{" "}
              {user.location.postcode}
            </p>
            <p className="addressLine2"></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
