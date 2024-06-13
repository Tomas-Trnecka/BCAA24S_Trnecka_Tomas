import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FinderContext } from "./FinderContext";

// Logos
import intelLogo from "./assets/intel.png";
import amdLogo from "./assets/amd.png";
import nvidiaLogo from "./assets/nvidia.png";

function FinderList() {
  const { eventList, state } = useContext(FinderContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeType, setActiveType] = useState("cpu"); // Default value is "cpu"

  useEffect(() => {
    // Filter events based on searchTerm and activeType (CPU/GPU)
    let filtered = eventList.filter(
      (event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeType ? event.type.toLowerCase() === activeType.toLowerCase() : true)
    );

    // Sort filtered events by ranking
    filtered.sort((a, b) => a.ranking - b.ranking);

    setFilteredEvents(filtered);
  }, [eventList, searchTerm, activeType]);

  useEffect(() => {
    let filtered = eventList.filter((event) => event.type.toLowerCase() === "cpu");
    filtered.sort((a, b) => a.ranking - b.ranking);
    setFilteredEvents(filtered);
  }, [eventList]);

  if (state === "pending") {
    return <div>Loading...</div>;
  }

  if (state === "error") {
    return <div>Error loading data</div>;
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search hardware..."
          value={searchTerm}
          onChange={handleChange}
          style={{
            width: "80%",
            maxWidth: "400px",
            padding: "8px",
            fontSize: "16px",
            textAlign: "center",
            borderRadius: "7px",
            borderWidth: 1,
            marginRight: "10px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            style={{
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
              padding: "10px",
              backgroundColor: activeType === "cpu" ? "#007bff" : "#70acfa",
              color: "#fff",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
          >
            <input
              type="radio"
              name="type"
              value="cpu"
              checked={activeType === "cpu"}
              onChange={() => handleTypeChange("cpu")}
              style={{ display: "none" }}
            />
            CPU
          </label>
          <label
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor: activeType === "gpu" ? "#007bff" : "#70acfa",
              color: "#fff",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
          >
            <input
              type="radio"
              name="type"
              value="gpu"
              checked={activeType === "gpu"}
              onChange={() => handleTypeChange("gpu")}
              style={{ display: "none" }}
            />
            GPU
          </label>
        </div>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredEvents.map((event) => (
          <li key={event.id} style={{ marginBottom: "10px" }}>
            <Link
              to={`/hardwareDetail/${event.id}`}
              style={{
                display: "block",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                textDecoration: "none",
                color: "#333",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h3 style={{ textAlign: "left", margin: 10 }}>{event.name}</h3>
                  <p style={{ textAlign: "left", margin: 10 }}>Type: {event.type.toUpperCase()}</p>
                  {event.name.includes("Intel") && (
                    <img src={intelLogo} alt="Intel Logo" style={{ height: 30, float: "left", marginLeft: 10 }} />
                  )}
                  {event.name.includes("AMD") && (
                    <img src={amdLogo} alt="AMD Logo" style={{ height: 60, float: "left", marginLeft: 10 }} />
                  )}
                  {event.name.includes("NVIDIA") && (
                    <img src={nvidiaLogo} alt="NVIDIA Logo" style={{ height: 30, float: "left", marginLeft: 10 }} />
                  )}
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <p>Price: ${event.price}</p>
                  <p>Ranking: {event.ranking}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FinderList;
