import React, {
  createContext,
  useCallback,
  useReducer,
  useEffect,
} from "react";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import { reducer, initialState } from "../src/components/reducers/reducer";
import Login from "./components/login/login";
import checklogin from "./components/helpers/checkLogin";
import Signup from "./components/signup/signup";
//import Admin from "./components/admin/admin";
//import Edit from "./components/edit/edit";
import Home from "./components/home/home";
import History from "./components/services/history";
import Navigation from "./components/navigation/navigation";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import About from "./components/about/about";
import NotFound from "./components/notfound/notfound";
import Eventdetails from "./components/event-details/event-details";
import {
  SET_LOADING,
  SERVER_URL,
  SET_USER,
} from "./components/helpers/constant";
import Profile from "./components/profile/profile";
import Contact from "./components/contact/contact";
import axios from "axios";
import "aos/dist/aos.css";

// const store = createStore(reducer);
export const myContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //Initialize animation function

  const id = localStorage.getItem("userId");

  //fetch user info when app starts
  const fetchUser = useCallback(async () => {
    const url = SERVER_URL + "/api/user/" + id;

    if (id) {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.status === 200) {
          const data = response.data;
          dispatch({ type: SET_USER, payload: data });

          //  dispatch({ type: "SET_USER", payload: data });
        }
      } catch (error) {
        console.log(error);
      }
    }
    return;
  }, [id]);

  useEffect(() => {
    fetchUser();
    checklogin();
  }, []);

  return (
    <myContext.Provider value={{ state, dispatch }}>
      <Router history={History}>
        <div className="App">
          <Header />
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
            <Route path="/event/:id" component={Eventdetails} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </myContext.Provider>
  );
}

export default App;
