import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import { AuthProvider } from "./AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="appbg">
          <Routes>
            <Route
              path="/"
              element={
                <div className="login">
                  <Login />
                </div>
              } />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute>
                  <div className="usermanagement">
                    <UserManagement />
                  </div>
                </ProtectedRoute>
              } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
