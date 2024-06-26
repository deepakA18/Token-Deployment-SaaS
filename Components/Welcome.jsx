import React from "react";

const Welcome = () => {
  return (
    <div className="welcome-area bg-color-4 fix area-padding-2">
      <div className="container">
        <div className="row d-flex flex-wrap align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div
                  className="well-services first-well wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="services-img">
                    <a className="big-icon" href="#">
                      <img src="img/icon/t1.png" alt="" />
                    </a>
                  </div>
                  <div className="main-wel">
                    <div className="wel-content">
                      <h4>Latest Tech!</h4>
                      <p>
                        Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                        tellus. Phasellus viverra nulla ut metus varius laoreet.
                        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi
                        vel augue. Curabitur ullamcorper ultricies nisi. Nam
                        eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
                        condimentum rhoncus, sem quam semper libero, sit amet
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="well-services second-well wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="services-img">
                    <a href="#" className="big-icon">
                      <img src="img/icon/t2.png" alt="" />
                    </a>
                  </div>
                  <div className="main-wel">
                    <div className="wel-content">
                      <h4>Certik Certified</h4>
                      <p>
                        Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                        tellus. Phasellus viverra nulla ut metus varius laoreet.
                        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi
                        vel augue. Curabitur ullamcorper ultricies nisi. Nam
                        eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
                        condimentum rhoncus, sem quam semper libero, sit amet
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="well-services three-well wow fadeInUp"
                data-wow-delayed="0.5s"
                >
                  <div className="services-img">
                    <a href="#" className="big-icon">
                      <img src="img/icon/t3.png" alt="" />
                    </a>
                  </div>
                  <div className="main-wel">
                    <div className="wel-content">
                      <h4>Minning Platform</h4>
                      <p>
                        Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                        tellus. Phasellus viverra nulla ut metus varius laoreet.
                        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi
                        vel augue. Curabitur ullamcorper ultricies nisi. Nam
                        eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
                        condimentum rhoncus, sem quam semper libero, sit amet
                      </p>
                    </div>
                  </div>
                </div>
                <div className="well-services four-well wow fadeInUp" data-wow-delay="0.5s">
                  <div className="services-img">
                    <a href="#" className="big-icon">
                      <img src="img/icon/t4.png" alt="" />
                    </a>
                  </div>
                  <div className="main-wel">
                    <div className="wel-content">
                      <h4>Metaverse Blockchain</h4>
                      <p> Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                        tellus. Phasellus viverra nulla ut metus varius laoreet.
                        Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi
                        vel augue. Curabitur ullamcorper ultricies nisi. Nam
                        eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
                        condimentum rhoncus, sem quam semper libero, sit amet
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <div className="well-service-text">
              <div className="top-text-title">Ultimate Metaverse</div>
              <h2 className="main-title">
                {" "}
                <span className="color-text-bold">Blockchain</span>provide you 
                best services
              </h2>
              <p>
                Our Blockchain opt in to the projects they genuinely want to 
                work on.maintains the amount of lines. When replacing a selection. help 
                agencies to define. define their new business objectives and then our consultants opt
                in to the projects they genuinely want to work on. maintains the amount of lines. When
                replacing a selection. help agencies to define. define their new business objectives and then 
                business objectives and then our consultants
              </p>
              <a href="/" className="services-btn coin-btn">
              Learn more
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
