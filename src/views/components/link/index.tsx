import { NavLink, NavLinkProps } from "react-router-dom";
import styled from "styled-components";

interface LinkProps extends NavLinkProps {
  navlink?: boolean;
}

const Link = (props: LinkProps): JSX.Element => {
  const { children, navlink = false } = props;

  let activeClassName = "active";

  return (
    <StyledLink navlink={navlink} className="inline-block">
      <NavLink
        {...props}
        className={({ isActive }) => (isActive ? activeClassName : undefined)}
      >
        {children}
      </NavLink>
    </StyledLink>
  );
};

const StyledLink = styled.div<{ navlink?: boolean }>`
  color: ${({ theme, navlink }) =>
    navlink ? theme.colors.base.light[100] : theme.colors.main.primary[400]};
  transition: color 150ms;
  font-size: 14px;

  &:hover {
    color: ${({ theme, navlink }) =>
      navlink
        ? theme.colors.main.primary[400]
        : theme.colors.main.secondary[400]};
  }

  .active {
    color: ${({ theme }) => theme.colors.main.primary[300]}};
  }
`;

export default Link;
