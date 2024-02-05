import React from "react"
import { Button, Center, Flex, TextInput } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "@mantine/form"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { addAddress } from "../../api/posts"
import { addUserAddress } from "../../features/user/userSlice"

const AddAddress = () => {
  const { user } = useSelector((store) => store.user)
  const refresh = useNavigate()
  const dispatch = useDispatch()
  console.log(user)

  const form = useForm({
    initialValues: {
      address: user?.address,
    },
  })

  const { address } = form.values

  const {mutate} = useMutation({
    mutationFn:()=>addAddress(address),
    onSuccess:(data)=>{

      console.log(data)
      dispatch(addUserAddress(data.address))
        toast.success("Addresses added successfully")
        form.reset()
        refresh('/')
    }
  })

  const handleSubmit = () => {
    console.log(address);
    mutate(address)
  }

  return (
    <>
      <Flex direction="column">
        <Center mt={50}>
          <h4>Add address to get live transactions</h4>
        </Center>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <TextInput
            withAsterisk
            className="search_input"
            placeholder="Enter an address"
            {...form.getInputProps("address")}
          />
          <Center>
            <Button type="submit">Add/Change</Button>
          </Center>
        </form>
      </Flex>
    </>
  )
}
export default AddAddress
