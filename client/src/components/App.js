
import { Switch, Route } from "react-router-dom";
import EventList from './EventList'
import MyList from './MyList'
import Header from'./Header'
import Login from './Login'
import EditProfile from "./EditProfile";
import { useState, useEffect } from "react";

function App() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    fetch('/checksession')
    .then((r) => {
      if (r.ok) {
        if (r.headers.get('content-length') > 0) {
          r.json()
          .then((user) => setUser(user))
          .catch((error) => console.error("JSON parsing error:", error));
        } else {
          console.warn("No content returned from /checksession");
        }
      }
    })
    .catch((error) => console.error("Fetch error:", error));
  }, []);

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
        if (r.ok) {
            setUser(null);
        }
    })
}

  if (!user) return <Login onLogin={setUser} />

  return (
    <div>
      <Header user={user} setUser={setUser} onLogOut={handleLogOut}/>
      <main>
        <Switch>
          <Route path='/mylist'>
            <MyList />
          </Route>
          <Route path='/editprofile'>
            <EditProfile user={user} onLogin={setUser} onLogOut={handleLogOut} />
          </Route>
          <Route path='/'>
            <EventList user={user}  />
          </Route>
        </Switch>
      </main>
    </div>
  )

}



export default App

