import "./Styles/Style.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mainCard" style={{ width: "100vw" }}>
      <h1>Random User</h1>
      {user && (
        <div className="card">
          <Card style={{ width: "30rem" }}>
            <Card.Img variant="top" src={user.picture.large} />
            <Card.Body>
              <Card.Title>
                {user.name.first} {user.name.last}
              </Card.Title>
              <Card.Text className="address">
                {user.location.street.number} {user.location.street.name}
                <br></br>
                {user.location.city}, {user.location.state}{" "}
                {user.location.postcode}
                <br></br>
                <Card.Link href={`tel:${user.cell}`}>{user.email}</Card.Link>
                <br></br>
                Mobile:
                <Card.Link href={`mailto:${user.email}`}>
                  {formatPhoneNumber(user.cell)}
                </Card.Link>
                <br></br>
                Date of Birth: {formatDate(user.dob.date)}
                <br></br>
                Date Registered: {formatDate(user.registered.date)}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}

      <Button
        onClick={fetchUser}
        variant="primary"
        className="randomUserButton"
      >
        Get New Random User
      </Button>
    </div>
  );
}

export default App;
