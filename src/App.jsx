import React from "react"

import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import "./App.css"
import WalletPage from "./pages/walletPage/WalletPage"
import TransactionPage from "./pages/transactionPage/TransactionPage"
import AddAddress from "./pages/addAddress/AddAddress"
import Layout from "./components/layout/Layout"


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" Component={Home} />
            <Route path="/address/:id" Component={WalletPage} />
            <Route path="/hash/:id" Component={TransactionPage} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/forgot_password" Component={ForgotPassword} />
            <Route
              path="/reset_password/:id/:token"
              Component={ResetPassword}
            />
            <Route path="/user/addAddress" Component={AddAddress} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </>
  )
}

export default App
