import React from "react"
import Header from "../../components/header/Header"
import "./home.css"
import SearchBar from "../../components/searchBar/SearchBar"
import useUserDetails from "../../hooks/useUserDetails"

const Home = () => {
  useUserDetails()
  return (
    <>
      <SearchBar />
    </>
  )
}

export default Home
