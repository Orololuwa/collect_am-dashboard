import { useAppDispatch, useAppSelector } from "app/hooks";
import Loading from "views/components/loading";
import { useEffect } from "react";
import { fetchBusiness } from "data/store/action-creators/business";
import { Navigate } from "react-router-dom";
import ExpirySession from "app/utils/expirysession";
import BusinessSetup from "views/pages/business-setup/business-setup";

const BusinessGuard = ({ children }: { children: JSX.Element }) => {
  let { data, error, loading } = useAppSelector((state) => state.business);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBusiness());
  }, []);

  if (loading) return <Loading />;

  if (error) {
    ExpirySession.clear();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!data?.isSetupComplete) {
    return <BusinessSetup />;
  }

  return children;
};

export default BusinessGuard;
