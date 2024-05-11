import { FC } from "react"

interface Props{
    text:string
}

const AuthButtons:FC<Props> = ({text}) => {
  return (
    <div className="border-2-solid border-richblack-200">
      {text}
    </div>
  )
}

export default AuthButtons
