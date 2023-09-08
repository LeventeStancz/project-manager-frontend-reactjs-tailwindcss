import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  const back = () => navigate(-1);
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-y-20 text-5xl text-custom-red">
      <h1>404 not found!</h1>
      <div className="text-custom-blue text-2xl">
        <button onClick={back} className="underline">
          Back
        </button>
      </div>
    </section>
  );
};

export default Missing;
