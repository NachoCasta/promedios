import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import { auth } from "../firebase.js"
import { useAuthState } from 'react-firebase-hooks/auth';

const dashboardRoutes = [];

const styles = { };

function NavBar(props) {
  const { user } = useAuthState(auth);
  return (
    <Header
      color="transparent"
      routes={dashboardRoutes}
      brand="TuPromedio"
      rightLinks={<HeaderLinks user={user} />}
      fixed
      changeColorOnScroll={{
        height: 50,
        color: "white"
      }}
    />
  );
}

export default withStyles(styles)(NavBar);

/*

function NavBar(props) {
  const [user, setUser] = useState(false)
  useEffect(() => {
    const userChanged = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return userChanged
    }
  )


*/