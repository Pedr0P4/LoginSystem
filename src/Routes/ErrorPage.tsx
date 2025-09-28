import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
      <div className="flex items-baseline">
        <div className="text-9xl font-bold text-[#022740]">404</div>
        <div className="text-6xl font-bold text-[#FDCF00]">Error</div>
      </div>
      <div className="text-xl">Looks like you reached a no way page...</div>
      <div
        className="text-md font-light p-2 underline text-blue-800 hover:cursor-pointer hover:text-blue-950"
        onClick={() => {
          navigate("/");
        }}
      >
        Go back!
      </div>
    </div>
  );
}

export default ErrorPage;
