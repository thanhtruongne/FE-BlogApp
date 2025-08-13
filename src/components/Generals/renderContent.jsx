import { default as parse } from 'html-react-parser';


const RenderContentHTML = ({ html }) => {
  if (!html) return null
  return (
    <div style={{ textRendering: "optimizeSpeed" }}>
      {parse(html)}
    </div>
  )
}


export default RenderContentHTML