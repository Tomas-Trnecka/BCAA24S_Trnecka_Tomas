import React, { useState, useContext, useEffect } from "react";
import { FinderContext } from "./FinderContext";
import "./MyPC.css";

function MyPC() {
  const { eventList } = useContext(FinderContext);
  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [ram, setRAM] = useState("");
  const [rankingMessage, setRankingMessage] = useState("");

  const handleRAMChange = (e) => {
    // Only numbers are valid
    const value = e.target.value.replace(/\D/, "");
    setRAM(value);
  };

  const handleSubmit = () => {
    const cpu = eventList.find((event) => event.id === selectedCPU);
    const gpu = eventList.find((event) => event.id === selectedGPU);

    if (cpu && gpu) {
      const cpuRanking = parseInt(cpu.ranking);
      const gpuRanking = parseInt(gpu.ranking);
      const rankingDifference = Math.abs(cpuRanking - gpuRanking);

      // If RAM is less than 16, output bottleneck :)
      if (parseInt(ram) < 16) {
        setRankingMessage("Not good! Your selected components cause a bottleneck!");
      } else {
        // Determine message based on ranking difference
        // This is just a placeholder algorithm of course
        if (rankingDifference < 3) {
          setRankingMessage("All good! This combination of hardware works great together.");
        } else if (rankingDifference >= 3 && rankingDifference <= 5) {
          setRankingMessage("All good! This combination of hardware doesn't suffer a major bottleneck.");
        } else {
          setRankingMessage("Not good! Your selected components cause a bottleneck!");
        }
      }
    } else {
      alert("Please select both CPU and GPU.");
    }
  };

  useEffect(() => {
    if (rankingMessage !== "") {
      alert(rankingMessage);
    }
  }, [rankingMessage]);

  return (
    <div className="mypc-container">
      <h2 className="mypc-heading">My PC Configuration</h2>
      <div className="mypc-input-group">
        <label className="mypc-label">
          Select CPU:
          <select className="mypc-select" value={selectedCPU} onChange={(e) => setSelectedCPU(e.target.value)}>
            <option value="">Select CPU</option>
            {eventList
              .filter((event) => event.type === "cpu")
              .map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="mypc-input-group">
        <label className="mypc-label">
          Select GPU:
          <select className="mypc-select" value={selectedGPU} onChange={(e) => setSelectedGPU(e.target.value)}>
            <option value="">Select GPU</option>
            {eventList
              .filter((event) => event.type === "gpu")
              .map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="mypc-input-group">
        <label className="mypc-label">
          RAM (GB):
          <input className="mypc-input" type="text" value={ram} onChange={handleRAMChange} />
        </label>
      </div>
      <button className="mypc-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default MyPC;
