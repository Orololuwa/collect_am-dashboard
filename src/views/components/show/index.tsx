import React from "react";

type ShowProps = { iff?: any; children: React.ReactNode };

const Show = ({ iff = true, children }: ShowProps) =>
  Boolean(iff) ? <>{children}</> : null;

export default Show;
