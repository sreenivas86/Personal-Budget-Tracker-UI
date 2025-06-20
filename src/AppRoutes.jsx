import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import UpdateExpenseForm from "./pages/UpdateExpenseForm";
import AddExpenseForm from "./pages/AddExpenseForm";
import BudgetList from "./pages/BudgetList";
import UpdateBudgetForm from "./pages/UpdateBudgetForm";
import AddBudgetForm from "./pages/AddBudgetForm";
const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/">
            <Route
              path="expense/edit/:id"
              element={
                <PrivateRoute>
                  <UpdateExpenseForm />
                </PrivateRoute>
              }
            />
            <Route
              path="expenses"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="expense/add"
              element={
                <PrivateRoute>
                  <AddExpenseForm />
                </PrivateRoute>
              }
            />
            <Route
              path="budgets"
              element={
                <PrivateRoute>
                  <BudgetList />
                </PrivateRoute>
              }
            />
            <Route
              path="budget/add"
              element={
                <PrivateRoute>
                  <AddBudgetForm/>
                </PrivateRoute>
              }
            />
            <Route
              path="budget/edit/:id"
              element={
                <PrivateRoute>
                  <UpdateBudgetForm />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="contact" Component={ContactUsPage} />
          <Route path="about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
