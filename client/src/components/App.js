
import { Switch, Route } from "react-router-dom";
import EventList from './EventList'
import Header from'./Header'
import Login from './Login'
import { useState, useEffect } from "react";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/checksession')
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />

  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <EventList/>
    </div>
  )

}



export default App
