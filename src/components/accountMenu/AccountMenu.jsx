import {
  Avatar,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from "@mantine/core"
import React from "react"
import "./accountMenu.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeUser } from "../../features/user/userSlice"

const AccountMenu = ({ user }) => {
  const dispatch = useDispatch()
  const refresh = useNavigate()

  const logOut = () => {
    dispatch(removeUser())
    localStorage.removeItem("token")
    refresh("/")
    window.location.reload()
  }

  return (
    <Menu trigger="hover" width={200}>
      <MenuTarget>
        <Avatar
          style={{ cursor: "pointer" }}
          size="2.5rem"
          className="account_icon"
          color="cyan"
          radius="xl"
        >
          {user?.name.charAt(0)}
        </Avatar>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>Account</MenuLabel>
        <MenuItem
          onClick={() => {
            refresh("/add_recipe")
          }}
        >
          My wallet
        </MenuItem>
        
        <MenuItem onClick={() => logOut()}>Log out</MenuItem>
      </MenuDropdown>
    </Menu>
  )
}

export default AccountMenu
