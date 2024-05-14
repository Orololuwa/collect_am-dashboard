import React from "react";

type HideProps = { iff?: boolean; children: React.ReactNode };

const Hide = ({ iff = true, children }: HideProps) =>
  iff ? null : <>{children}</>;

export default Hide;
