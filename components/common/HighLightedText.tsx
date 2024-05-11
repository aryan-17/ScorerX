import React from 'react'

const HighLightedText = ({ style, text }: { style?: React.CSSProperties, text:String }) => {
  return (
    <p style={style}>
        {text}
    </p>
  )
}

export default HighLightedText
