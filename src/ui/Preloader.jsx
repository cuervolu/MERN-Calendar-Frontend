import { PacmanLoader } from "react-spinners"


export const Preloader = () => {
  return (
    <div className="preloader">
        <PacmanLoader size={150} color={"#2a8c4a"} />
    </div>
  )
}