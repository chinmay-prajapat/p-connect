import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home/Home';
import Invite from './Invite/Invite';
import myProfile from './MyProfile/myProfile';
import Register from './Register';
import InviteProfile from './Invite/InviteProfile';
import New from './Professional/Contribute/New';
import Old from './Professional/Contribute/Old';
import ProfessionalHome from './Professional/Home/index';
import UserRegister from './Register/UserRegister';
import UserTerm from './Register/UserTerm';
import UserLogin from './LogIn/UserLogin';
import ProfessionalLogin from './LogIn/ProfessionalLogin';
import ProfessionalRegister from './Register/ProfessionalRegister';
import Header from './Header/index';
import Allowed from './Admin/ProfileRequest/Allowed';
import getOwnFeed from './Professional/OwnFeed/getOwnFeed';
import Comment from './Comment/Comment';
import AdminMessage from './Admin/AdminMessage/index';
import AdminHeader from './Admin/AdminHeader/index';
import About from './About/About';
import Img from './MyProfile/ProfilePic';
import Edit from './Admin/Access/Edit';
import Contribute from './Professional/Contribute';
import Login from './LogIn';
import HighRated from './HighRated/HighRated';
import PEvent from './EEvent';
import UserProfile from './Users/UserProfiles/index';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import Ask from './Messages/Ask';
import InviteTerm from './Invite/InviteTerm';
import viewProfile from './View/viewProfile';
import Message from './Messages/Message';
import ReplyAttach from './Messages/ReplyAttach';
import Request from './Professional/Requests/index';
import UserMentor from './Users/Mentor/index';
import updateProfile from './MyProfile/updateProfile';
import ProfileUser from './MyProfile/ProfileUser';
import inviteForm from './Invite/InviteForm';
import Reply from './Messages/Reply';
import checkSubscription from './LogIn/checkSubscription';
import ProfileRequest from './Admin/ProfileRequest/ProfileRequest';
import N_Subscriber from './Admin/Subscriber/N_Subscriber';
import Transcation from './Admin/Transcation/index';
import Subscriber from './Admin/Subscriber/Subscriber';
import Pay from './Stripe/Stripe';
import HighRate from './HighRated/HighRate';
import AdminFeed from './View/AdminFeed';
import ViewFeed from './View/ViewFeed';
import LogOut from './LogOut/LogOut';
import ReplyQuery from './Messages/ReplyQuery';
import Invites from './Admin/Invites/Invite';
import Session from './Admin/Session/Sessions';
import Terms from './Register/Terms';
import StarRating from './Users/UserProfiles/Rating';
import Attachment from './Messages/Attachment';
import Query from './Messages/Query';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { FaTumblrSquare } from 'react-icons/fa';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      role: null,
    };

    // this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        isAuthenticated: true,
        role: localStorage.getItem('role'),
      });
    }
  }

  onAuthentication = (boolean, string) => {
    this.setState({
      isAuthenticated: boolean,
      role: string,
      isLogged: false,
    });
  };
  render() {
    return (
      <div className="container-fluid p-0">
        <BrowserRouter>
          <Header role={this.state.role} />
          <Switch>
            <Route
              exact={true}
              path="/profilerequest"
              component={ProfileRequest}
            />
            <Route
              exact={true}
              path="/updateProfile/:id"
              component={updateProfile}
            />
            <Route
              exact={true}
              path="/viewProfile/:id"
              component={viewProfile}
            />
            <Route exact={true} path="/highrated" component={HighRated} />
            <Route
              exact={true}
              path="/attachment/:id/messagebox"
              component={Attachment}
            />
            <Route exact={true} path="/highrate/:id" component={HighRate} />
            <Route exact={true} path="/invite" component={Invite} />
            <Route
              exact={true}
              path="/inviteprofile/:id"
              component={InviteProfile}
            />
            <Route exact={true} path="/session" component={Session} />
            <Route exact={true} path="/allowed" component={Allowed} />
            <Route exact={true} path="/pay" component={Pay} />
            <Route exact={true} path="/img" component={Img} />
            <Route exact={true} path="/inviteform/:id" component={inviteForm} />
            <Route exact={true} path="/comment" component={Comment} />
            <Route exact={true} path="/adminfeed" component={AdminFeed} />
            <Route exact={true} path="/term" component={Terms} />
            <Route exact={true} path="/reply/:id" component={Reply} />
            <Route exact={true} path="/query/:id" component={Query} />
            <Route exact={true} path="/myProfile" component={myProfile} />
            <Route exact={true} path="/inviteterm" component={InviteTerm} />
            <Route exact={true} path="/userterm" component={UserTerm} />
            <Route exact={true} path="/feed" component={ViewFeed} />
            <Route exact={true} path="/adminMessage" component={AdminMessage} />
            <Route exact={true} path="/subscriber" component={Subscriber} />
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/replyquery/:id" component={ReplyQuery} />
            <Route
              exact={true}
              path="/replyattach/:id/messagebox"
              component={ReplyAttach}
            />
            <Route exact={true} path="/myinvite/:id" component={Invites} />
            <Route exact={true} path="/nsubscriber" component={N_Subscriber} />
            <Route exact={true} path="/getownfeed/:id" component={getOwnFeed} />
            <Route exact={true} path="/register" component={Register} />
            <Route
              exact={true}
              path="/profileuser/:id"
              component={ProfileUser}
            />

            <Route exact={true} path="/uregister" component={UserRegister} />
            <Route exact={true} path="/transcation" component={Transcation} />
            <Route exact={true} path="/rating/:id" component={StarRating} />
            <Route
              exact={true}
              path="/checksubscription"
              component={checkSubscription}
            />
            <Route
              path="/logout"
              render={(props) => {
                axios
                  .delete('http://localhost:3000/api/users/logoutALL', {
                    headers: {
                      'x-auth': localStorage.getItem('token'),
                    },
                  })
                  .then((response) => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('amountPaid');
                    window.location.href = `http://localhost:3000`;
                  });
              }}
            />
            <Route exact={true} path="/message" component={Message} />
            <Route
              exact={true}
              path="/professionalrequest"
              component={Request}
            />
            {/* <Route
              exact={true}
              path="/professionalprofile"
              component={ProfessionalProfile}
            /> */}
            <Route exact={true} path="/contribute" component={Contribute} />

            <Route
              exact={true}
              path="/professionalhome"
              component={ProfessionalHome}
            />
            <Route exact={true} path="/ask/:id/messagebox" component={Ask} />
            <Route exact={true} path="/mentor" component={UserMentor} />
            <Route exact={true} path="/mentor/:id" component={UserProfile} />
            <Route
              exact={true}
              path="/mentor/:id/inviteForm"
              component={PEvent}
            />

            {/* <Route
              path="/mentor"
              render={(props) => {
                return <UserMentor {...props} />;
              }}
            /> */}
            {/* <Route
              path="/mentor/:id"
              render={(props) => {
                return <UserProfile {...props} />;
              }}
            />
            <Route
              path="/mentor/:id/inviteForm"
              render={(props) => {
                return <PEvent {...props} />;
              }}
            /> */}
            <Route exact={true} path="/new/:id" component={New} />
            <Route exact={true} path="/old/:id" component={Old} />
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/adminheader" component={AdminHeader} />
            {/* <Route exact={true} path="/ulogin" component={UserLogin} /> */}
            {/* <Route exact={true} path="/plogin" component={ProfessionalLogin} /> */}
            <Route
              exact={true}
              path="/pregister"
              component={ProfessionalRegister}
            />

            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/edit/:id" component={Edit} />
            <Route
              exact={true}
              path="/adminlogin"
              render={(props) => {
                return (
                  <AdminLogin
                    {...props}
                    onAuthentication={this.onAuthentication}
                  />
                );
              }}
            />
            <Route
              path="/ulogin"
              render={(props) => {
                return (
                  <UserLogin
                    {...props}
                    onAuthentication={this.onAuthentication}
                  />
                );
              }}
            />
            <Route
              path="/plogin"
              render={(props) => {
                return (
                  <ProfessionalLogin
                    {...props}
                    onAuthentication={this.onAuthentication}
                  />
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
