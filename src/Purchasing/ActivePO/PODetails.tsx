import { useParams } from "react-router-dom"

const PODetails = () => {
  const {id}=useParams()
  console.log(id);
  
  return (
    <div>PODetails</div>
  )
}

export default PODetails