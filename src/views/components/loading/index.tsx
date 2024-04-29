import LoadingCtx from "./styled";

const Loading = (): JSX.Element => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen z-[20000] bg-[#00000064]`}
    >
      <LoadingCtx>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </LoadingCtx>
    </div>
  );
};

export default Loading;
