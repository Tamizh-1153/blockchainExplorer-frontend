import React from "react"
import "./searchBar.css"
import { useForm } from "@mantine/form"
import { Box, Button, TextInput } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { getWalletDetails } from "../../api/posts"

const SearchBar = () => {

    const refresh = useNavigate()

    

  const form = useForm({
    initialValues: {
      address: "",
    },
  })

  const { address } = form.values

  const handleSubmit = () => {
    refresh(`address/${address}`)

  }

  return (
    <div className="search_container">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <span >Get your wallet details</span>
        <TextInput
          withAsterisk
          className="search_input"
          placeholder="Enter an address"
          {...form.getInputProps("address")}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}

export default SearchBar
