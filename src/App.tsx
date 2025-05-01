// src/App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <Router>
      <AppRoutes />
    </Router>
    <ToastContainer />
    </>
  );
};

export default App;
