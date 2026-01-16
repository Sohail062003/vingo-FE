import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
// import Spinner from "../components/commons/Spinner";


const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="flex flex-col items-center gap-4">
          <ClipLoader size={45} color="#f97316" />
          <p className="text-white/80 text-sm tracking-wide">
            Loading...
          </p>
        </div>
      </div>
    }>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;