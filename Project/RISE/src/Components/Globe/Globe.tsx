import { useEffect } from "react";
import { globeConfig } from "./utils/config.globe";
import { World } from "./utils/globe";
import "./Globe.scss";

function Globe() {
  useEffect(() => {
    if (!document.getElementById("globe-canvas")) {
      const container = document.querySelector("#scene-container");
      const world = new World(container as Element, undefined, globeConfig);
      world.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="wrapperg">
      <div id="text">
        <h1 id="globe-h1">Locust Movement</h1>
        <span id="lorem">
          Locust swarms can move anywhere from 50 to 150km per day and can hence
          effect and spread to multiple countries and regions
        </span>
      </div>
      <div
        id="scene-container"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "70%",
          marginLeft: "10%",
          marginTop: "15%",
        }}
      ></div>
    </section>
  );
}

export default Globe;
