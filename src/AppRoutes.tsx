import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import { DefaultContainer } from "./containers/DefaultContainer";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Home } from "./pages/home";
import { Me } from "./pages/me";

export default function AppRoutes() {

  interface IPrivateAndIsLogged {
    children: any
  }

  const Private = ({children}: IPrivateAndIsLogged) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/" />
    return children;
  }

  const IsLogged = ({children}: IPrivateAndIsLogged) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return <Navigate to="/me" />
    return children;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route
            path="/"
            element={
              <IsLogged>
                <DefaultContainer>
                  <Home />
                </DefaultContainer>
              </IsLogged>
            }
          />

          <Route
            path="/me"
            element={
              <Private>
                <DefaultContainer>
                  <Me />
                </DefaultContainer>
              </Private>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>
  )
}