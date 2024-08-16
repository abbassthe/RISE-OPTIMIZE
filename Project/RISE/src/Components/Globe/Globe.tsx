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
        <h1 id="globe-h1">Lorem ipsum </h1>
        <span id="lorem">
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut.
        </span>
      </div>
      <div id="scene-container"></div>
    </section>
  );
}

export default Globe;
