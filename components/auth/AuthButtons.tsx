import { FC } from "react"

interface Props{
    text:string
}

const AuthButtons:FC<Props> = ({text}) => {
  return (
    <div className="bg-persiangreen w-60 p-2 rounded-2xl text-center cursor-pointer text-lg font-semibold">
      {text}
    </div>
  )
}

export default AuthButtons
