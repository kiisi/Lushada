/* eslint-disable react/prop-types */
import { forwardRef } from 'react';


const Input = forwardRef(function Input(props, ref ){

  const { label, readOnly, ...prop} = props

  return (
    <div className="relative pt-[10px] w-full">
        <input 
        className={`border-[1px] border-primary caret-primary outline-none py-3 px-3 w-full rounded-[6px] ${readOnly ? "cursor-not-allowed" : "hover:border-primary focus:border-[transparent] focus:shadow-[0_0_0_2px_#459E8D]"}`}
        {...prop}
        readOnly={readOnly}
        ref={ref}
        />
        <label 
        className="translate-y-[-11px] translate-x-[8px] bg-white px-[4px] absolute left-0 text-[14px] auth-label">{label}</label>
    </div>
  )
})

export default Input