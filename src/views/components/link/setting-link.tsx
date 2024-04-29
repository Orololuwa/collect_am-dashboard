import {
  Link,
  LinkProps,
  useResolvedPath,
  useMatch,
  PathMatch
} from "react-router-dom";
import styled from "styled-components";

const SettingLink = ({
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
        className="py-2 pr-2 outline-none transition-colors text-xl whitespace-nowrap"
      >
        {children}
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.button<{ match: PathMatch<string> | null }>`
  color: ${({ theme, match }) =>
    match ? theme.colors.main.primary[400] : theme.colors.base.dark[400]};
  border-bottom: 2px solid
    ${({ theme, match }) =>
      match ? theme.colors.main.primary[400] : "transparent"};

  &:hover {
    color: ${({ theme }) => theme.colors.main.primary[400]};
    border-bottom: 2px solid ${({ theme }) => theme.colors.main.primary[400]};
  }
`;

export default SettingLink;
