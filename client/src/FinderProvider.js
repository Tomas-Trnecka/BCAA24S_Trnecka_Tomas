import { useEffect, useState } from "react";
import { FinderContext } from "./FinderContext.js";

function FinderProvider({ children }) {
  const [eventLoadObject, setEventLoadObject] = useState({
    state: "ready",
    error: null,
    data: [],
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch(`http://localhost:8000/hardware/list`, {
        method: "GET",
      });
      const responseJson = await response.json();
      if (response.ok) {
        setEventLoadObject({ state: "ready", data: responseJson, error: null });
      } else {
        setEventLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson.error || "Error loading data",
        }));
      }
    } catch (error) {
      setEventLoadObject({
        state: "error",
        data: [],
        error: error.message,
      });
    }
  }

  async function handleCreate(dtoIn) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch(`http://localhost:8000/hardware/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();

      if (response.ok) {
        setEventLoadObject((current) => {
          const newData = [...(current.data || []), responseJson];
          newData.sort((a, b) => new Date(a.date) - new Date(b.date));
          return { state: "ready", data: newData, error: null };
        });
        return responseJson;
      } else {
        setEventLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson.error || "Error creating data",
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
      throw error;
    }
  }

  async function handleUpdate(dtoIn) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch(`http://localhost:8000/hardware/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();

      if (response.ok) {
        setEventLoadObject((current) => {
          const newData = current.data.map((item) =>
            item.id === responseJson.id ? responseJson : item
          );
          newData.sort((a, b) => new Date(a.date) - new Date(b.date));
          return { state: "ready", data: newData, error: null };
        });
        return responseJson;
      } else {
        setEventLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson.error || "Error updating data",
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
      throw error;
    }
  }

  async function handleDelete(dtoIn) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch(`http://localhost:8000/hardware/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();

      if (response.ok) {
        setEventLoadObject((current) => {
          const newData = current.data.filter(
            (item) => item.id !== responseJson.id
          );
          return { state: "ready", data: newData, error: null };
        });
        return responseJson;
      } else {
        setEventLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson.error || "Error deleting data",
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    } catch (error) {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
      throw error;
    }
  }

  const value = {
    state: eventLoadObject.state,
    eventList: eventLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <FinderContext.Provider value={value}>
      {children}
    </FinderContext.Provider>
  );
}

export default FinderProvider;
