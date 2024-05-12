import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import FinderList from "./FinderList";
import FinderProvider from "./FinderProvider";

function App() {
  return (
    <div style={componentStyle()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<FinderList />} />
            <Route
              path="hardwareDetail"
              element={
                <FinderProvider>
                </FinderProvider>
              }
            />
            <Route path="*" element={"404"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  };
}

export default App;
