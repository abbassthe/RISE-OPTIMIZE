import React from "react";
import "./Home.scss";

function Home() {
  return (
    <div className="wrapperh">
      <div className="Banner">
        <section>
          <section
            className="u-clearfix u-image u-section-1"
            id="carousel_500f"
          >
            <div className="u-clearfix u-sheet u-valign-bottom u-sheet-1">
              <h3 className="u-text u-text-body-alt-color u-text-default u-text-1">
                Let us protecct
              </h3>
              <h1 className="u-custom-font u-font-playfair-display u-text u-text-body-alt-color u-text-default u-text-2">
                nature
              </h1>
              <p className="u-text u-text-body-alt-color u-text-3">
                With the help of FlutterForcast we can fight pests images become
                using satiltie imagry and machine learning
              </p>
              <a
                href="#"
                className="u-border-2 u-border-white u-link u-no-underline u-text-body-alt-color u-link-1"
              >
                read more
              </a>
            </div>
          </section>
        </section>
        <div className="clouds">
          <img src="/cloud1.png" id="c1"></img>
          <img src="/cloud2.png" id="c2"></img>
          <img src="/cloud3.png" id="c3"></img>
          <img src="/cloud4.png" id="c4"></img>
          <img src="/cloud5.png" id="c5"></img>
        </div>
      </div>
    </div>
  );
}
export default Home;
