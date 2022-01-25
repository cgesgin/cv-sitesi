import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";

import EventBus from "./common/EventBus";
import ListCVComponent from "./components/ListCVComponent.jsx";
import DetailCVComponent from "./components/DetailCVComponent.js";
import CreateCVComponent from "./components/CreateCVComponent";
import UserCVViewComponent from "./components/UserCVViewComponent";
import UpdateCVComponent from "./components/UpdateCVComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {

      currentUser: undefined,
      showList: false,
      create: false,
      myResume: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showList: user.roles.includes("ROLE_ADMIN"),
        create: user.roles.includes("ROLE_USER"),
        myResume: user.roles.includes("ROLE_USER"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      showList: false,
      create: false,
      myResume: false,
    });
  }

  render() {
    const { currentUser, showList, create, myResume } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link className="navbar-brand">
            Tein Software
          </Link>
          <div className="navbar-nav mr-auto">
            {showList && (
              <li className="nav-item">
                <Link to={"/list"} className="nav-link">
                  List CV
                </Link>
              </li>
            )}
            {myResume && (
              <li className="nav-item">
                <Link to={"/myResume/" + currentUser.id} className="nav-link">
                  My CV
                </Link>
              </li>
            )}


            {create && (
              <li className="nav-item">
                <Link to={"/create"} className="nav-link">
                  Create CV
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path= "/create" component={CreateCVComponent} />
            <Route path="/list" component={ListCVComponent} />
            <Route path="/detail/:id" component={DetailCVComponent} />          
            <Route path="/myResume/:id" component={UserCVViewComponent} />
            <Route path="/update/:id" component={UpdateCVComponent} />

          </Switch>
        </div>

        { }
      </div>
    );
  }
}

export default App;
