import styled from "styled-components";

const Footer = (): JSX.Element => {
  return (
    <Wrapper>
      Copyright &copy; <span className="collectam">CollectAM</span>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 0px 10px rgba(119, 119, 119, 0.3);
  padding: 1.5rem;

  .collectam {
    color: ${({ theme }) => theme.colors.main.primary[400]};
    padding-left: 10px;
  }
`;

export default Footer;
