import { Suspense } from "react";
// import Spinner from "../components/commons/Spinner";


const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        {/* <Spinner show={true} fullscreen={false} /> */}
        loading...
      </div> 
    }>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;