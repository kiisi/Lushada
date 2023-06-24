/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import MiniSpinner from './MiniSpinner'
import { base_url_endpoint } from '../utils/endpoints'
import axios from 'axios'
import { useAppStateContext } from '../context/AppStateContext'
const PageSpinner = ({children}) => {


  const [loading, setLoading] = useState(true)
  const { dispatch } = useAppStateContext()

  useEffect(() => {
    (async () => {

      try {

        const res = await axios.get(`${base_url_endpoint}/auth/verify-user`)

        dispatch({type: "SET_USER", payload: res.data.payload})

      } catch (err) {
        console.log(err)
      }
      
      setLoading(false)

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