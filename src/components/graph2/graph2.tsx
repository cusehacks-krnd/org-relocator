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
  const [connections, setConnections] = useState<{ [key: string]: L.Layer[] }>({});
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

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

      const newConnections: { [key: string]: L.Layer[] } = {};
      const newMarkers: L.Marker[] = [];

      data.forEach((row) => {
        if (row.Lat && row.Lng) {
          const departmentLocation = turf.point([row.Lng, row.Lat]);
          const serviceLocation = turf.point([row.LONG, row.LAT]);
          const distance = turf.distance(departmentLocation, serviceLocation);

          let lineColor = "#00FF00"; // Green for distances under 3km
          if (distance > 3) lineColor = "#FFA500"; // Orange for distances 3-4.5km
          if (distance > 4.5) lineColor = "#FF0000"; // Red for distances over 4.5km

          const line = turf.lineString([
            [row.Lng, row.Lat],
            [row.LONG, row.LAT],
          ]);

          // Create the line layer but don't add it to the map yet
          const lineLayer = L.geoJSON(line, {
            style: {
              color: lineColor,
              weight: 3,
            },
          });

          // Generate detailed popup content based on department
          let popupContent = "";
          switch (row.Agency_Name) {
            case "Garbage, Recycling & Graffiti":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Garbage, Recycling & Graffiti</h3>
                  <img src="/garbage_recycling.png" alt="Garbage, Recycling & Graffiti" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13206</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Handles garbage collection, recycling, and graffiti removal.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 640-3447</p>
                </div>
              `;
              break;

            case "Water & Sewage":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Water & Sewage</h3>
                  <img src="/water-sewage.png" alt="Water & Sewage" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13210</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Manages water supply and sewage systems.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-8360</p>
                </div>
              `;
              break;

            case "Housing & Property Maintenance":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Housing & Property Maintenance</h3>
                  <img src="/housing.png" alt="Housing & Property Maintenance" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13209</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Oversees housing standards and property maintenance.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Streets, Sidewalks & Transportation":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Streets, Sidewalks & Transportation</h3>
                  <img src="/streets.png" alt="Streets, Sidewalks & Transportation" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13286</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Maintains streets, sidewalks, and transportation infrastructure.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Green Spaces, Trees & Public Utilities":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Green Spaces, Trees & Public Utilities</h3>
                  <img src="/green.png" alt="Green Spaces, Trees & Public Utilities" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13296</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Maintains green spaces, trees, and public utilities.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Parking & Vehicles":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Parking & Vehicles</h3>
                  <img src="/parking.png" alt="Parking & Vehicles" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13211</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Manages parking and vehicle-related issues.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Animals":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Animals</h3>
                  <img src="/animals.png" alt="Animals" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13299</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Handles animal control and welfare.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;

            case "Feedback to the City":
              popupContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <h3 style="margin: 0 0 10px; font-size: 16px;">Feedback to the City</h3>
                  <img src="/feedback.png" alt="Feedback to the City" style="width: 100%; max-width: 200px; height: auto; margin-bottom: 10px;">
                  <p style="margin: 0 0 5px;"><b>Department Address:</b> 13652</p>
                  <p style="margin: 0 0 5px;"><b>Description:</b> Handles feedback and suggestions for the city.</p>
                  <p style="margin: 0 0 5px;"><b>Contact:</b> (315) 448-2489</p>
                </div>
              `;
              break;
          }

          const deptKey = `${row.Lat},${row.Lng}`;

          // Create department marker with click events instead of hover
          const deptMarker = L.marker([row.Lat, row.Lng], { icon: buildingIcon })
            .bindPopup(popupContent)
            .on('click', () => {
              if (selectedDept === deptKey) {
                // If clicking the same department, deselect it
                setSelectedDept(null);
                // Remove all connections and service markers for this department
                Object.values(newConnections).flat().forEach(layer => {
                  map.removeLayer(layer);
                });
                // Show all department markers again
                markers.forEach(m => m.addTo(map));
              } else {
                // Select the new department
                setSelectedDept(deptKey);
                // First clear any existing connections
                Object.values(newConnections).flat().forEach(layer => {
                  map.removeLayer(layer);
                });
                // Then show connections for the newly selected department
                newConnections[deptKey].forEach(layer => map.addLayer(layer));
                // Show only this department marker
                markers.forEach(m => m.remove());
                deptMarker.addTo(map);
              }
            });

          // Create service location marker
          const serviceMarker = L.marker([row.LAT, row.LONG], { icon: serviceIcon })
            .bindPopup(`<b>Service Location:</b> ${row.Address}`);

          // Store connections for this department
          if (!newConnections[deptKey]) {
            newConnections[deptKey] = [];
          }
          newConnections[deptKey].push(lineLayer, serviceMarker);

          newMarkers.push(deptMarker);
          deptMarker.addTo(map);
        }
      });

      setConnections(newConnections);
      setMarkers(newMarkers);
    }
  }, [data, map]);

  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Clear all connections when component unmounts
      if (map) {
        Object.values(connections).flat().forEach(layer => map.removeLayer(layer));
      }
    };
  }, [map, connections]);

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