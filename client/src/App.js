import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import FinderList from "./FinderList";
import FinderProvider from "./FinderProvider";
import HardwareDetail from "./HardwareDetail";
import MyPC from "./MyPC";

function App() {
  return (
    <div style={componentStyle()}>
      <FinderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<FinderList />} />
              <Route path="hardwareDetail/:id" element={<HardwareDetail />} />
              <Route path="pcconfig" element={<MyPC />} /> {}
              <Route path="*" element={<div>404</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FinderProvider>
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
