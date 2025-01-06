import React from "react"

const SpanText = (props) => {
   const {class_name , text ,style = null} = props

   return (
     <span style={style} class={class_name}>
        {text}
     </span>
   )
}

export default SpanText