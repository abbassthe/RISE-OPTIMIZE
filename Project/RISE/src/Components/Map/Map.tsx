import "./Map.css";
import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import mapboxgl from "mapbox-gl"; // updated import syntax
import Sidebar from "../navbar/Sidebar/Sidebar";
import { Chart, registerables } from "chart.js"; // corrected import
// test
Chart.register(...registerables);

mapboxgl.accessToken = "pk.eyJ1IjoibXJhc2xhbjUiLCJhIjoiY2x4YnhyZXJqMDNtaDJvczUwNm9tY2NtciJ9._FI1VpIgHM4kJcaAgNBYpA";

function Map() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [year, setYear] = useState<number>(2019);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        const INITIAL_CENTER: [number, number] = [37.16126, 36.1997];
        const INITIAL_ZOOM = 15.0;
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: "mapbox://styles/mapbox/dark-v11",
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM,
        });

        map.current.on("load", () => {
            map.current!.setFog({});
            map.current!.addSource("aleppo-citadel", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                boro_code: 1,
                                owner: "raslan",
                                year: 2019,
                                color: "green",
                            },
                            geometry: {
                                coordinates: [
                                    [
                                        [37.162058986289054, 36.20042878923378],
                                        [37.16428109376366, 36.20136825114136],
                                        [37.16228005398972, 36.201739202083814],
                                        [37.160220578426646, 36.200951899880806],
                                        [37.1594203898797, 36.19936620997022],
                                        [37.161496828513975, 36.197604748728935],
                                        [37.16478367893484, 36.1983322247648],
                                        [37.164869775171184, 36.19958690069576],
                                        [37.162058986289054, 36.20042878923378],
                                    ],
                                ],
                                type: "Polygon",
                            },
                            id: 0,
                        },
                        {
                            type: "Feature",
                            properties: {
                                boro_code: 2,
                                owner: "kay",
                                year: 2020,
                                color: "purple",
                            },
                            geometry: {
                                coordinates: [
                                    [
                                        [37.16659541208, 36.20022351595546],
                                        [37.16860621562887, 36.20079212923277],
                                        [37.1675492547885, 36.20202642189011],
                                        [37.16659541208, 36.20022351595546],
                                    ],
                                ],
                                type: "Polygon",
                            },
                            id: 1,
                        },
                        {
                            type: "Feature",
                            properties: {
                                boro_code: 3,
                                owner: "cat",
                                year: 2020,
                                color: "blue",
                            },
                            geometry: {
                                coordinates: [
                                    [
                                        [37.16508408774769, 36.20271463513458],
                                        [37.16428338243426, 36.202033592033516],
                                        [37.16540869800906, 36.20184150188287],
                                        [37.166642217005375, 36.2025050840428],
                                        [37.169866678941275, 36.2032385104107],
                                        [37.16878464473456, 36.20647772800238],
                                        [37.16368826362114, 36.20393700532533],
                                        [37.16508408774769, 36.20271463513458],
                                    ],
                                ],
                                type: "Polygon",
                            },
                        },
                        {
                            type: "Feature",
                            properties: {
                                boro_code: 4,
                                year: 2021,
                                owner: "dog",
                                color: "red",
                            },
                            geometry: {
                                coordinates: [
                                    [
                                        [37.15716187386866, 36.203641454142016],
                                        [37.15360773394511, 36.20916724442769],
                                        [37.148276524058815, 36.201525462796894],
                                        [37.14864494100149, 36.196995999816664],
                                        [37.15763864873662, 36.19947936718505],
                                        [37.15716187386866, 36.203641454142016],
                                    ],
                                ],
                                type: "Polygon",
                            },
                        },
                    ],
                },
            });
            map.current!.addLayer({
                id: "aleppo-citadel-fill",
                type: "fill",
                source: "aleppo-citadel",
                paint: {
                    "fill-color": [
                        "match",
                        ["get", "color"],
                        "green",
                        "green",
                        "purple",
                        "purple",
                        "blue",
                        "blue",
                        "red",
                        "red",
                        "steelblue",
                    ],
                },
            });
            map.current!.addLayer({
                id: "aleppo-citadel-line",
                type: "line",
                source: "aleppo-citadel",
                paint: {
                    "line-color": "white",
                    "line-width": 4,
                    "line-opacity": 0.6,
                },
            });
            filterBy(year);
            addData();
        });
    }, [year]);

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
                        grid: {
                            color: "#FFFFFF",
                        },
                        type: "linear",
                        position: "top",
                        title: {
                            display: true,
                            text: "Year",
                            color: "#FFFFFF",
                        },
                        ticks: {
                            color: "#FFFFFF",
                            maxTicksLimit: 20,
                        },
                    },
                    y: {
                        grid: {
                            color: "#FFFFFF",
                        },
                        title: {
                            display: true,
                            text: "Y-Axis",
                            color: "#FFFFFF",
                        },
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
                    tooltip: {
                        callbacks: {
                            label: function (context: any) {
                                let label = context.dataset.label || "";
                                if (label) {
                                    label += ": ";
                                }
                                label += `(${context.parsed.x}, ${context.parsed.y.toFixed(2)})`;
                                return label;
                            },
                        },
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

    const filterBy = (year: number) => {
        const filters = ["==", ["get", "year"], year];
        if (map.current!.getLayer("aleppo-citadel-line") && map.current!.getLayer("aleppo-citadel-fill")) {
            map.current!.setFilter("aleppo-citadel-line", filters);
            map.current!.setFilter("aleppo-citadel-fill", filters);
        }
    };

    const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newYear = parseInt(event.target.value);
        setYear(newYear);
        filterBy(newYear);
    };

    return ( 
        <div id="container">             <Sidebar />       <div id="map" ref={mapContainer}></div>     <div id="c1">
 
        <div id="bar1">
            <div id="yearInput">
                <input
                    type="range"
                    min="2019"
                    max="2021"
                    value={year}
                    id="range"
                    onChange={handleYearChange}
                />
                <div className="value">{year}</div>
            </div>
            
        </div>
        <div className="ts1">
            <div className="ts2">
                <canvas id="myChart" ref={chartRef}></canvas>
            </div>
        </div>
    </div></div>
 
    );
}

export default Map;

