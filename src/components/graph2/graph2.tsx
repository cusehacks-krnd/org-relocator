"use client"; // Required for client-side interactivity

import "../globals.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";
import * as turf from "@turf/turf";

const Graph2Component = () => {
  const [data, setData] = useState<any[]>([]);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    // Initialize the map only once
    const mapInstance = L.map("map").setView([43.0481, -76.1474], 13);
    setMap(mapInstance);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);

    // Cleanup function to remove the map when component unmounts
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Load the CSV file
    Papa.parse("/SYRCityline_Requests_(2021-Present).csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  useEffect(() => {
    if (data.length > 0 && map) {
      // Clear existing markers and lines
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.GeoJSON) {
          layer.remove();
        }
      });
      const buildingIcon = L.icon({
        iconUrl: "/building-icon.png", 
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32], 
      });
      const serviceIcon = L.icon({
        iconUrl: "/service-icon.png", 
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32], 
      });

      // Add markers and lines for each data point
      data.forEach((row) => {
        if (row.Lat && row.Lng) {
          const departmentLocation = turf.point([row.Lng, row.Lat]);
          const serviceLocation = turf.point([row.LONG, row.LAT]);

          // Calculate the distance between the two points in kilometers
          const distance = turf.distance(departmentLocation, serviceLocation);

          // Define line color based on distance
          let lineColor = "#00FF00"; // Green for short distances
          if (distance > 4) lineColor = "#FFA500"; // Orange for medium distances
          if (distance > 6) lineColor = "#FF0000"; // Red for long distances

          // Create a line between the two points
          const line = turf.lineString([
            [row.Lng, row.Lat],
            [row.LONG, row.LAT],
          ]);

          // Add the line to the map
          L.geoJSON(line, {
            style: {
              color: lineColor,
              weight: 3,
            },
          }).addTo(map);

          // Add markers for the department and service locations
          L.marker([row.Lat, row.Lng],{ icon: buildingIcon })
            .addTo(map)
            .bindPopup(`<b>Department:</b> ${row.Agency_Name}`);

          L.marker([row.LAT, row.LONG],{ icon: serviceIcon })
            .addTo(map)
            .bindPopup(`<b>Service Location:</b> ${row.Address}`);
        }
      });
    }
  }, [data, map]);

  return (
    <div className="flex justify-center w-full p-4">
      <div className="w-3/4 border-2 border-white bg-white rounded-2xl overflow-hidden p-4">
        <h1 className="text-2xl font-bold text-black mb-4 tracking-[.1em]">
          Service Location Distance Analysis
        </h1>
        <h2 className="text-xl text-gray-600 tracking-wide">
          Department &nbsp;to &nbsp;Service &nbsp;Location &nbsp;Connections
        </h2>
        <p>Lines connect departments to service locations. Line color depends on distance.</p>
        <div id="map" style={{ height: "500px", width: "100%" }}></div>
      </div>
    </div>
  );
};

export default Graph2Component;