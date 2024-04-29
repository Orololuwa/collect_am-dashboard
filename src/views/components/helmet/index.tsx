import { Helmet as HelmetTag } from "react-helmet";

interface HelmetProps {
  pageTitle: string;
  canonicalUrl?: string;
}

const Helmet = ({ pageTitle, canonicalUrl }: HelmetProps): JSX.Element => {
  return (
    <HelmetTag>
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
    </HelmetTag>
  );
};

export default Helmet;
