// @ts-nocheck

import "./Map.css";
import { useRef, useEffect, useState, ChangeEvent } from "react";
import mapboxgl from "mapbox-gl";
import Sidebar from "../navbar/Sidebar/Sidebar";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);
Chart.defaults.borderColor = "#33333300";
Chart.defaults.color = "#33333300";
mapboxgl.accessToken =
  "pk.eyJ1IjoibXJhc2xhbjUiLCJhIjoiY2x4YnhyZXJqMDNtaDJvczUwNm9tY2NtciJ9._FI1VpIgHM4kJcaAgNBYpA";

function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [year, setYear] = useState<number>(2020); // Start year at 2020

  useEffect(() => {
    if (map.current) return; // initialize map only once
    const INITIAL_CENTER: [number, number] = [42.5621, 17.4401]; // Center near Baysh
    const INITIAL_ZOOM = 10.0;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/dark-v11",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    map.current.on("load", () => {
      map.current!.setFog({});
      fetchPoints(year);
      addData();
    });
  }, [year]);

  const fetchPoints = async (year: number) => {
    const response = await axios.get(
      `http://127.0.0.1:8000//api/eggs/${year}/?format=json`
    );
    const data = await response.data;

    const points = {
      type: "FeatureCollection",
      features: data.map((egg: any) => ({
        type: "Feature",
        properties: { year: egg.year },
        geometry: {
          type: "Point",
          coordinates: egg.geom.coordinates,
        },
      })),
    };
    console.log(points);
    if (map.current!.getSource("points-source")) {
      map.current!.getSource("points-source").setData(points);
    } else {
      map.current!.addSource("points-source", {
        type: "geojson",
        data: points,
      });

      map.current!.addLayer({
        id: "points-layer",
        type: "circle",
        source: "points-source",
        paint: {
          "circle-radius": 4,
          "circle-color": "red",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });
    }
  };

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value);
    setYear(newYear);
    fetchPoints(newYear);
  };

  const addData = () => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
    const data = {
      labels: [],
      datasets: [
        {
          label: "Dynamic Data",
          borderColor: "rgba(0, 191, 255, 0.5)",
          backgroundColor: "rgba(135, 206, 235, 0.5)",
          data: [],
          pointRadius: 0,
          fill: true,
          tension: 0.4,
        },
      ],
    };
    const config = {
      type: "line" as const,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "linear",
            position: "top",

            ticks: {
              color: "#FFFFFF",
              maxTicksLimit: 20,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);
    let xValue: number = 0;
    for (let i = 0; i < 11; i++) {
      const yValue = Math.sin(xValue * 0.1) * 10 + Math.random() * 10;
      myChart.data.labels.push(xValue);
      myChart.data.datasets[0].data.push({ x: xValue + 2020, y: yValue });
      xValue++;
    }
    myChart.update();
  };

  return (
    <div id="ynot">
      <div id="containerMap">
        <Sidebar />
        <div id="map" ref={mapContainer}></div>
        <div id="c">
          <div id="bar1">
            <div id="yearInput">
              <input
                type="range"
                min="2020"
                max="2030"
                value={year}
                id="range"
                onChange={handleYearChange}
              />
            </div>
          </div>
          <div className="ts2">
            <canvas id="myChart" ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
