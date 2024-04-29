import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <span>404 | Page not found...</span>
      <span>
        Go back <Link to="/">home</Link>
      </span>
    </div>
  );
};

export default NotFound;
