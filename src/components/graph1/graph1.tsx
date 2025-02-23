"use client"; // Required for client-side interactivity

import "../globals.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";

const Graph1Component = () => {
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
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });

      // Add markers for each data point
      data.forEach((row) => {
        if (row.Lat && row.Lng) {
          // Generate popup content dynamically based on the department
          let popupContent = "";

          // Customize popup content for each department
          switch (row.Agency_Name) {
            case "Garbage, Recycling & Graffiti":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Garbage, Recycling & Graffiti</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 65640</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Handles garbage collection, recycling, and graffiti removal.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Water & Sewage":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Water & Sewage</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 20451</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Manages water supply and sewage systems.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Housing & Property Maintenance":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Housing & Property Maintenance</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 9509</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Oversees housing standards and property maintenance.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Streets, Sidewalks & Transportation":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Streets, Sidewalks & Transportation</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 8586</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Maintains streets, sidewalks, and transportation infrastructure.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Sanitation Carts":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Sanitation Carts</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 4662</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Manages sanitation carts and waste collection.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Green Spaces, Trees & Public Utilities":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Green Spaces, Trees & Public Utilities</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 3196</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Maintains green spaces, trees, and public utilities.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Parking & Vehicles":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Parking & Vehicles</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 1111</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Manages parking and vehicle-related issues.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Animals":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Animals</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 1099</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Handles animal control and welfare.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Sanitation":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Sanitation</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 741</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Oversees sanitation and waste management.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Feedback to the City":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Feedback to the City</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 652</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Handles feedback and suggestions for the city.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Streets & Transportation":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Streets & Transportation</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 484</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Manages streets and transportation systems.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Health, Safety & Social Services":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Health, Safety & Social Services</h3>
                  <p style="margin: 0 0 5px;"><b>Department ID:</b> 103</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Provides health, safety, and social services.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            default:
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
              break;
          }

          // Add the marker with the popup content
          L.marker([row.Lat, row.Lng])
            .addTo(map)
            .bindPopup(popupContent);
        }
      });
    }
  }, [data, map]);

  return (
    <div className="flex justify-center w-full p-4">
      <div className="w-3/4 border-2 border-white bg-white rounded-2xl overflow-hidden p-4">
        <h1 className="text-2xl font-bold text-black mb-4">Syracuse Service Request Analysis</h1>
        <h2 className="text-xl text-gray-600">Syracuse Service Requests Map</h2>
        <p>Click on a marker to see details about the department.</p>
        <div id="map" style={{ height: "500px", width: "100%" }}></div>
      </div>
    </div>
  );
};

export default Graph1Component;