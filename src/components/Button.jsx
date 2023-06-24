/* eslint-disable react/prop-types */
import MiniSpinner from '../components/MiniSpinner'

const Button = (props) => {

  const {children, className, onClick, loading, ...prop} = props

  return (
    <button onClick={loading ? undefined : onClick} className={`h-[42px] grid place-items-center px-6 bg-primary text-white rounded-[6px] ${className}`} {...prop}>
      { loading ?  <MiniSpinner/> : children }
     </button>
  )
}

export default Button