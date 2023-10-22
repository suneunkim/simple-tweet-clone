import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="m-44 flex flex-col justify-center items-center space-y-8">
      <h2>잠시만 기다려주세요.</h2>
      <PacmanLoader color="#0ea5e9" />
    </div>
  );
};

export default Loader;
