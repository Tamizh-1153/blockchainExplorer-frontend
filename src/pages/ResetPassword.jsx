import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "../api/posts"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const { id, token } = useParams()
  const refresh = useNavigate()
  const { mutate } = useMutation({
    mutationFn: ({ id, token, password }) =>
      resetPassword({ id, token, password }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message)
        refresh("/login")
      } else {
        toast.error(data.message)
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const password = e.target.password.value
    mutate({ id, token, password })
  }

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4">
          <div className="card my-5">
            <div className="card-body">
              <div className="d-flex justify-content-center mt-5 mb-2"></div>
              <p className="card-title text-center mb-3  fs-4">
                Change BlockchainTM password
              </p>
              <p
                style={{ fontSize: 17, fontWeight: 500 }}
                className="card-title "
              >
                Create a strong password
              </p>
              <p style={{ fontSize: 16 }} className="card-title mb-4 ">
                Create a new, strong password that you don’t use for other
                websites
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter a new password"
                />

                <div className="text-center">
                  <button className="btn btn-primary my-4" type="submit">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
