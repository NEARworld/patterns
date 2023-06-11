import { Outlet, useNavigate, useNavigation } from "react-router-dom";

export default function Home() {
  const navigation = useNavigate();

  return (
    <div>
      <button onClick={() => navigation("blinking_squares")}>
        blinking squares
      </button>
      <button onClick={() => navigation("parabola")}>parabola</button>
      <Outlet />
    </div>
  );
}
