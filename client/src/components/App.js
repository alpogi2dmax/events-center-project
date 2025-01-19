
import { Switch, Route } from "react-router-dom";
import EventList from './EventList'
import MyList from './MyList'
import Header from'./Header'
import Login from './Login'
import { useState, useEffect } from "react";

function App() {

  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([])


  useEffect(() => {
    fetch('/checksession')
    .then((r) => {
      if (r.ok) {
        if (r.headers.get('content-length') > 0) {
          r.json()
          .then((user) => {
            setUser(user)
        })
          .catch((error) => console.error("JSON parsing error:", error));
        } else {
          console.warn("No content returned from /checksession");
        }
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}, []);

  if (!user) return <Login onLogin={setUser} onSetPurchases={setPurchases}/>

  function addPurchase(purchase) {
    setPurchases([...purchases, purchase])
  }

  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <main>
        <Switch>
        <Route path='/mylist'>
            <MyList purchases={purchases}/>
          </Route>
          <Route path='/'>
            <EventList user={user} onAddPurchase={addPurchase} />
          </Route>
        </Switch>
      </main>
    </div>
  )

}



export default App
