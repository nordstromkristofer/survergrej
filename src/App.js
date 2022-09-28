import "./App.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { L } from "leaflet";
import { useEffect, useState, useRef } from "react";
import { logIn, logOut, signUp, useAuth, db, signInWithGoogle, sendEmail } from "./firebase";
import { async } from "@firebase/util";
import { onSnapshot, collection, getDocs, addDoc } from "@firebase/firestore";
import markerIcon from "./images/marker-icon.png";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  const currentUser = useAuth();
  const [error, setError] = useState("");

  // FIRESTORE READ
  const [locations, setLocations] = useState([]);
  const locationsCollectionRef = collection(db, "locations");

  const getLocations = async () => {
    const data = await getDocs(locationsCollectionRef);
    setLocations(data.docs.map((doc) => ({ ...doc.data() })));
  };

  useEffect(() => {
    getLocations();
  }, []);

  // FIRESTORE CREATE

  const [newLocationName, setNewLocationName] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");
  const [sitOrStand, setSitOrStand] = useState(null)
  const createPin = async () => {
    await addDoc(locationsCollectionRef,
      {
        lat: newLatitude,
        long: newLongitude,
        place: newLocationName,
        user: currentUser.email,
        stand: sitOrStand
      });
  }

  // CREATE USER!

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = async (e) => {
    setLoading(true);
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
      setError("");
    } catch (e) {
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already registered");
      }

      console.log(e.message);
    }
    setLoading(false);
  };

  // LOG IN USER

  const handleLogIn = async () => {
    setLoading(true);
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      setError("");
    } catch (e) {
      if (e.message === "Firebase: Error (auth/user-not-found).") {
        setError("Email not found");
      } else if (e.message === "Firebase: Error (auth/wrong-password).") {
        setError("Incorrect Password");
      } else if (
        e.message ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        setError("Too many login attemps, please try again later");
      }
      console.log(e.message);
    }
    setLoading(false);
  };

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logOut();
    } catch (error) {
      alert("Could not login! Try again");
    }
    setLoading(false);
  };

  // SET PIN AT LOCATION

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You did it here</Popup>
      </Marker>
    );
  };

  return (
    <div>
      <Navbar currentUser={currentUser} handleLogOut={handleLogOut} />
      <div className="leaflet-container">
        <MapContainer center={[59.32, 18.07]} zoom={14} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
          {locations.map((location) => {
            return <Marker position={[location.lat, location.long]}>
              <Popup>{location && location.place} <br />
                {location && location.user} <br />
                {location && location.stand}
              </Popup>
            </Marker>
          })

          };



        </MapContainer>
      </div>

      <div>
        {currentUser ? (
          <>Currently logged in as: {currentUser?.email} </>
        ) : null}
      </div>

      {currentUser ? null : (
        <h3 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          {error}
        </h3>
      )}
      {
        !currentUser ? (
          <>
            <div className="Signup-form">
              <input ref={emailRef} placeholder="Email" />
              <input ref={passwordRef} type="password" placeholder="Password" />

              <div className="Signup-buttons">
                <button
                  disabled={loading || currentUser}
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
                <button disabled={loading || currentUser} onClick={handleLogIn}>
                  Log In
                </button>
                <button disabled={loading || currentUser} onClick={signInWithGoogle}>Sign in with google</button>
              </div>
            </div>
          </>
        ) : null
        // <button disabled={loading || !currentUser} onClick={handleLogOut}>Log Out</button>
      }

      <div>
        {currentUser ? <>
          <input placeholder='Name'
            onChange={(event) => {
              setNewLocationName(event.target.value);
            }}
            required
          />
          <input placeholder='Latitude'
            onChange={(event) => {
              setNewLatitude(event.target.value);
            }}
            required
          />
          <input placeholder='Longitude'
            onChange={(event) => {
              setNewLongitude(event.target.value);
            }}
            required
          />
          <select onChange={(event) => {
            setSitOrStand(event.target.value)
          }}
            required>
            <option value="" hidden>Sitta eller stå</option>
            <option value="Stå">Stå</option>
            <option value="Sitta">Sitta</option>
          </select>
          <button onClick={createPin}>Set new pin</button>
        </>
          : null}
      </div>

      <div style={{ textAlign: "center" }}>
        <h1>
          {currentUser ? (
            <>You can now do everything on the website</>
          ) : (
            <>You must login to get access</>
          )}
        </h1>
      </div>
    </div>
  );
}

export default App;
