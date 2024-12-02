import { useNavigate } from "react-router-dom";

const MissingQtyTable = () => {
    const navigate = useNavigate();

  return (
    <div className=""><h1>MissingQtyTable</h1> 

        <button onClick={()=>navigate(`/purchasing/missing-qty/details/${1}`)}>nav</button>
    </div>
  )
}

export default MissingQtyTable