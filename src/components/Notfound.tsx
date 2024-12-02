import {  useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

    
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className=" border-2 w-1/2 h-1/2 justify-center bg-red-200 text-red-400 border-red-400 flex flex-col items-center">
        <p>حدث خطا</p>
        <button
          className="cursor-pointer underline text-black "
          onClick={() => {
            nav(-1);
          }}
        >
        </button>
      </div>
    </div>
  );
};

export default NotFound;
