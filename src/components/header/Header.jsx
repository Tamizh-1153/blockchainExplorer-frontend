import React from "react"
import "./header.css"
import { Button } from "@mantine/core"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useUserDetails from "../../hooks/useUserDetails"
import AccountMenu from "../accountMenu/AccountMenu"
import logo from "../../assets/Black and White Monogram Business Logo.png"

const Header = () => {
  useUserDetails()
  const { user } = useSelector((store) => store.user)

  const refresh = useNavigate()

  return (
    <div className="container h_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => refresh("/")}
          className="h_image"
          src={logo}
          alt="recipe book"
        />
      </div>
      <div className="h_right">
        {!user ? (
          <Button className="comment_submit" onClick={() => refresh("/login")}>
            Sign In
          </Button>
        ) : (
          <AccountMenu  user={user} />
        )}
      </div>
    </div>
  )
}

export default Header
