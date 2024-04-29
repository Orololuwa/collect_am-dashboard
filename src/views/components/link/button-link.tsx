import {
  Link,
  LinkProps,
  useResolvedPath,
  useMatch,
  PathMatch
} from "react-router-dom";
import styled from "styled-components";

const ButtonLink = ({
  children,
  to,
  className,
  ...props
}: LinkProps): JSX.Element => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} {...props} className={className}>
      <Wrapper
        match={match}
        className="px-4 py-2 outline-none transition-colors"
      >
        {children}
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.button<{ match: PathMatch<string> | null }>`
  border: 1px solid ${({ theme }) => theme.colors.main.primary[400]};
  color: ${({ theme }) => theme.colors.base.dark[400]};
  background: ${({ theme, match }) =>
    match ? theme.colors.main.primary[400] : "transparent"};

  &:hover {
    background: ${({ theme }) => theme.colors.main.primary[400]};
  }
`;

export default ButtonLink;
