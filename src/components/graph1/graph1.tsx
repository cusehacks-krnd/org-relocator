"use client"; // Required for client-side interactivity

import "../globals.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";

export default function Graph1() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Load the CSV file
    Papa.parse("/city_skyline.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // Initialize the map
      const map = L.map("map").setView([43.0481, -76.1474], 13); // Syracuse coordinates

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add markers for each data point
      data.forEach((row) => {
        if (row.Lat && row.Lng) {
          // Generate popup content dynamically
          let popupContent = "";

          // Customize popup content based on the department
          if (row.Agency_Name === "Water & Sewage" && row.Request_type === "Sewer Back-ups (INTERNAL)") {
            popupContent = `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h3 style="margin: 0 0 10px; font-size: 16px;">${row.Agency_Name}</h3>
                <p style="margin: 0 0 5px;"><b>Request Type:</b> ${row.Request_type}</p>
                <p style="margin: 0 0 5px;"><b>Address:</b> ${row.Address}</p>
                <p style="margin: 0 0 5px;"><b>Description:</b> ${row.Description}</p>
                <p style="margin: 0 0 5px;"><b>Contact:</b> Dina 450-3461</p>
                <p style="margin: 0 0 5px;"><b>Created At:</b> ${row.Created_at_local}</p>
                <p style="margin: 0;"><b>Status:</b> ${row.Closed_at_local ? "Closed" : "Open"}</p>
              </div>
            `;
          } else {
            // Default popup content for other departments
            popupContent = `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h3 style="margin: 0 0 10px; font-size: 16px;">${row.Agency_Name}</h3>
                <p style="margin: 0 0 5px;"><b>Request Type:</b> ${row.Request_type}</p>
                <p style="margin: 0 0 5px;"><b>Address:</b> ${row.Address}</p>
                <p style="margin: 0 0 5px;"><b>Description:</b> ${row.Description}</p>
                <p style="margin: 0 0 5px;"><b>Created At:</b> ${row.Created_at_local}</p>
                <p style="margin: 0;"><b>Status:</b> ${row.Closed_at_local ? "Closed" : "Open"}</p>
              </div>
            `;
          }

          // Add the marker with the popup content
          L.marker([row.Lat, row.Lng])
            .addTo(map)
            .bindPopup(popupContent);
        }
      });
    }
  }, [data]);

  return (
    <div>
      <h1>Syracuse Service Requests Map</h1>
      <p>Click on a marker to see details about the service request.</p>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
}