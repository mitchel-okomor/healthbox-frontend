import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="page-footer font-small  pt-5">
      <div className="container text-center text-md-left">
        <div className="row">
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-3 mx-auto">
            <ul className="list-unstyled">
              <li>
                <a href="/contact">Contact us</a>
              </li>
              <li>
                <a href="/feedback">Feedback</a>
              </li>
              <li>
                <a href="/more">More</a>
              </li>
            </ul>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-3 mx-auto">
            <ul className="list-unstyled">
              <li>
                <a href="/about">About Us</a>
              </li>

              <li>
                <a href="./faq">FAQs</a>
              </li>
            </ul>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-6 mx-auto">
            <h5 className="font-weight-bold text-uppercase mt-2 mb-2">
              connect with us
            </h5>
            <a href="/twitter">
              <i className="fa fa-twitter mr-4" aria-hidden="true"></i>
            </a>
            <a href="/facebook">
              <i className="fa fa-facebook mr-4" aria-hidden="true"></i>
            </a>
            <a href="/linkedin">
              <i className="fa fa-linkedin mr-4" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3 mt-4">
        <a href="/">© Jomed-RX 2020</a>
      </div>
    </footer>
  );
};

export default Footer;
