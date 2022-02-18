import "./App.css";
import "./helpers/string.helpers"
import React, { Suspense } from "react";
import BaseScreen from "./screens/BaseScreen";
import LoadingSpinner from "./components/layouts/LoadingSpinner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const HomeScreen = React.lazy(() => import("./screens/HomeScreen"));
const CategoryScreen = React.lazy(() => import("./screens/CategoryScreen"));
const GenderScreen = React.lazy(() => import("./screens/GenderScreen"));
const ProductScreen = React.lazy(() => import("./screens/ProductScreen"));
const NotFoundScreen = React.lazy(() => import("./screens/NotFoundScreen"));
const ContactScreen = React.lazy(() => import("./screens/ContactScreen"));
const LoginRegisterScreen = React.lazy(() => import("./screens/LoginRegisterScreen"));
const AccountValidationScreen = React.lazy(() => import("./screens/AccountValidationScreen"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseScreen />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HomeScreen />
              </Suspense>
            }
          />
          <Route
            path="/category"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <CategoryScreen />
              </Suspense>
            }
          />
          <Route
            path="/category/:id"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <CategoryScreen />
              </Suspense>
            }
          />
          <Route
            path="/gender"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GenderScreen />
              </Suspense>
            }
          />
          <Route
            path="/gender/:id"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GenderScreen />
              </Suspense>
            }
          />
          <Route
            path="/product"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProductScreen />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ContactScreen />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LoginRegisterScreen isLogin/>
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LoginRegisterScreen isRegister/>
              </Suspense>
            }
          />
          <Route
            path="/account/validation"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AccountValidationScreen/>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFoundScreen />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
