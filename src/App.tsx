import { useRoutes } from "react-router-dom";
import routes from "app/routes";
import { Suspense } from "react";
import Loading from "views/components/loading";

const App = (): JSX.Element => {
  const routesHere = useRoutes(routes);

  return <Suspense fallback={<Loading />}>{routesHere}</Suspense>;
};

export default App;
