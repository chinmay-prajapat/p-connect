import React, { Component } from 'react';
import './css/styles.css';
import Art from './assets/img/arts.jpeg';
import Science from './assets/img/science.jpeg';
import myImage from './assets/img/Teacher.png';
import Commerce from './assets/img/commerce.jpeg';
import Video from '../Image/MyVideo.mp4';
import ReactPlayer from 'react-player';

import { Photo } from '../Image/p-connect.png';
import { Button } from 'reactstrap';
import { Player, ControlBar } from 'video-react';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  // componentDidMount() {
  //   // subscribe state change
  //   this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  // }
  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state,
    });
  }
  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }
  render() {
    return (
      <div>
        <header className="masthead">
          <div className="container d-flex h-100 align-items-center">
            <div className="mx-auto text-center">
              <h1 className="mx-auto my-0 text-uppercase">P-Connect</h1>
              <h2 className="text-white-50 mx-auto mt-2 mb-5">
                One Step Towards Your Profession
              </h2>
              <a className="btn btn-primary js-scroll-trigger" href="/register">
                Get Started
              </a>
            </div>
          </div>
        </header>
        {/* About*/}
        <section className="about-section text-center" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h2 className="text-white mb-4">P-Connect</h2>
                <p className="text-white-50">
                  Our motive is to provide guidelines or consult from experts
                  who have profound experience in the field of the cooperating
                  world. We pledge ourselves to give your comfort in the
                  learning.
                </p>
              </div>
            </div>
            {/* <img className="img-fluid" src={myImage} alt="Question" /> */}
          </div>
        </section>
        {/* Projects*/}
        <section className="projects-section bg-light" id="projects">
          <div className="container">
            {/* Featured Project Row*/}
            <div className="row align-items-center no-gutters mb-4 mb-lg-5">
              <div className="col-xl-8 col-lg-7">
                <ReactPlayer
                  controls={true}
                  url={Video}
                  //  light={true}
                  playing={true}
                ></ReactPlayer>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="featured-text text-center text-lg-left">
                  <h4>Watch Our Promotion</h4>
                  {/* <p className="text-black-50 mb-0">
                    As we live in a world of advanced technologies where
                    knowledge only far from your fingertips but still, are we
                    getting all the answers from google? No? still, we need
                    human or an expert or professional intervention to express
                    ourselves so that we can get all or doubts cleared. So after
                    considering the problem we came out with an idea to get the
                    professional from various backgrounds to a single platform.
                  </p> */}
                </div>
              </div>
            </div>
            <div className="row align-items-center no-gutters mb-4 mb-lg-5">
              <div className="col-xl-8 col-lg-7">
                <img
                  className="img-fluid mb-3 mb-lg-0"
                  src={myImage}
                  alt="Mentor for project"
                />
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="featured-text text-center text-lg-left">
                  <h4>Story Behind</h4>
                  <p className="text-black-50 mb-0">
                    As we live in a world of advanced technologies where
                    knowledge only far from your fingertips but still, are we
                    getting all the answers from google? No? still, we need
                    human or an expert or professional intervention to express
                    ourselves so that we can get all or doubts cleared. So after
                    considering the problem we came out with an idea to get the
                    professional from various backgrounds to a single platform.
                  </p>
                </div>
              </div>
            </div>
            {/* Project One Row*/}
            <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
              <div className="col-lg-6">
                <img className="img-fluid" src={Art} alt="arts" />
              </div>
              <div className="col-lg-6">
                <div className="bg-black text-center h-100 project">
                  <div className="d-flex h-100">
                    <div className="project-text w-100 my-auto text-center text-lg-left">
                      <h4 className="text-white">Professional</h4>
                      <p className="mb-0 text-white-50">
                        Can be an Author, Teacher, Industrialist, professor, or
                        any legitimate professional who is willing share
                        knowledge.
                      </p>
                      <hr className="d-none d-lg-block mb-0 ml-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Project Two Row*/}
            <div className="row justify-content-center no-gutters">
              <div className="col-lg-6">
                <img className="img-fluid" src={Commerce} alt="commerce" />
              </div>
              <div className="col-lg-6 order-lg-first">
                <div className="bg-black text-center h-100 project">
                  <div className="d-flex h-100">
                    <div className="project-text w-100 my-auto text-center text-lg-right">
                      <h4 className="text-white">Subscriber</h4>
                      <p className="mb-0 text-white-50">
                        Any person who is willing to learn or eager to seek
                        knowledge.
                      </p>
                      <hr className="d-none d-lg-block mb-0 mr-0" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
                <div className="col-lg-6">
                  <img className="img-fluid" src={Science} alt="science" />
                </div>
                <div className="col-lg-6">
                  <div className="bg-black text-center h-100 project">
                    <div className="d-flex h-100">
                      <div className="project-text w-100 my-auto text-center text-lg-left">
                        <h4 className="text-white">More ?</h4>
                        <p className="mb-0 text-white-50">
                          Professionals can also be asked for a workshop, guest
                          lecture, or clarify doubts.
                        </p>
                        <hr className="d-none d-lg-block mb-0 ml-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Signup*/}
        <section className="signup-section" id="signup">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-auto text-center">
                <i className="far fa-paper-plane fa-2x mb-2 text-white" />
                <h2 className="text-white mb-5">Write Us To Know More</h2>
                <form className="form-inline d-flex">
                  {/* <button className="btn btn-primary mx-auto" type="submit"> */}
                  <a href="/about" className="btn btn-primary mx-auto">
                    Write Us
                  </a>
                  Subscribe
                  {/* </button> */}
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Contact*/}
        <section className="contact-section bg-black">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card py-4 h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-map-marked-alt text-primary mb-2" />
                    <h4 className="text-uppercase m-0">Address</h4>
                    <hr className="my-4" />
                    <div className="small text-black-50">
                      Banshankari,Bangalore-85
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card py-4 h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-envelope text-primary mb-2" />
                    <h4 className="text-uppercase m-0">Email</h4>
                    <hr className="my-4" />
                    <div className="small text-black-50">
                      <a href="#!">prajapatchinmay@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card py-4 h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-mobile-alt text-primary mb-2" />
                    <h4 className="text-uppercase m-0">Phone</h4>
                    <hr className="my-4" />
                    <div className="small text-black-50">+91 81-945-3533</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer bg-black small text-center text-white-50">
          <div className="container">
            Copyright © 2020 P-Connect, All rights reserved.
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
