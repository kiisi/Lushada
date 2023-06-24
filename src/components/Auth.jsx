/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import MiniSpinner from './MiniSpinner'
import { base_url_endpoint } from '../utils/endpoints'
import axios from 'axios'
import { useAppStateContext } from '../context/AppStateContext'
const PageSpinner = ({children}) => {

  const [loading, setLoading] = useState()
  const { dispatch } = useAppStateContext()

  useEffect(() => {
    (async () => {

      setLoading(true)

      try {

        const res = await axios.get(`${base_url_endpoint}/auth/verify-user`)

        console.log(res)

        dispatch({type: "SET_USER", payload: res.data.payload})

        setLoading(false)

      } catch (err) {
        console.log(err)
        setLoading(false)
      }

    })()
  }, [])


  return (
    <>
      {
        loading ?
          <main className="w-full min-h-[100vh] bg-[#000000bf] grid place-items-center">
            <MiniSpinner />
          </main>
          : children
      }
    </>
  )
}

export default PageSpinner