
import spinner from "../../assets/spinner1.svg";

const Loading = () => {
  return (
    <div className="">
      <img src={spinner} alt="spinner" className="size-20 animate-spin " />

    </div>
  );
};

export default Loading;
