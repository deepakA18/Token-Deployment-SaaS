import React from "react";

const Footer = () => {
  const coinList = [
    "Ripple coin",
    "Bitcoin",
    "Ethereum",
    "Lite coin",
    "Solana",
    "Dot",
  ];

  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "ERC20",
      link: "#",
    },
    {
      name: "Contact Us",
      link: "#",
    },
    {
      name: "Blog",
      link: "#",
    },
    {
      name: "Detail",
      link: "#",
    }

  ];
  return (
    <footer className="footer1">
      <div className="footer-area">
        <div className="container">
          <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="footer-content logo-footer">
                      <div className="footer-head">
                        <div className="footer-logo">
                            <a href="#">
                              <img src="img/logo/logo2.png" alt="" />
                            </a>
                        </div>
                        <div className="footer-icons">
                          <ul>
                            {[1,2,3,4,5].map((social,i)=> (
                              <li>
                                <a href="#">
                                  <img src={`img/about/midea${i+1}.png`} alt="" />
                                </a>
                              </li>
                            ))}
                          </ul>

                        </div>
                      </div>
                  </div>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="footer-content rs-mar-0">
                        <div className="footer-head">
                              <h4>Payment option</h4>
                              <ul className="footer-list">
                                {coinList.map((coin,i)=> (
                                  <li>
                                    <a>{coin}</a>
                                  </li>
                                ))}
                              </ul>
                              <ul className="footer-list">
                                  {menuList.map((menu,i)=> (
                                    <li>
                                      <a href={menu.link}>{menu.name}</a>
                                    </li>
                                  ))}
                              </ul>
                        </div>
                  </div>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="footer-content last-content rs-mar-0">
                    <div className="footer-head">
                      <h4>Subscribe</h4>
                      <p>Looking for professional advice for your new lauch!</p>
                      <div className="sub-feilds">
                        <div className="suscribe-input">
                              <input type="email" className="email form-control width-80"
                              id="sus_email" placeholder="email"/>
                              <button 
                              type="submit"
                              id="sus_submit"
                              className="subs-btn coin-btn">
                                Subscribe
                              </button>
                        </div>

                      </div>
                    </div>              
                </div>

              </div>
          </div>
        </div>
      </div>

      <div className="footer-area-bottom">
        <div className="container">
            <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="copyright">
                                <p>
                                  Copyright © 2024
                                  <a href="#">@0xdeepak18</a>All Rights Reserved
                                </p>
                          </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="footer-menu">
                              <ul>
                                {["About", "Terms & Condition", "Privacy"].map((el,i)=> (
                                  <li>
                                    <a href="">{el}</a>
                                  </li>
                                ))}
                              </ul>
                        </div>
                  </div>
            </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
