import { default as parse } from 'html-react-parser';


const RenderContentHTML = ({html}) => {
  if(!html) return null
  return (
    <div>
      {parse(html)}
    </div>
  )
}


export default RenderContentHTML