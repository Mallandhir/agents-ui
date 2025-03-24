const Header: React.FC = () => {
  return (
    <>
      <header className="w-full text-center space-y-6">
        <h1 className="text-black text-3xl sm:text-[32px] font-ppNeue-regular tracking-[-0.31px] leading-[1.2]">
          Welcome!
        </h1>
        <div className="space-y-1">
          <p className="text-[#8b8b8b] text-lg sm:text-[22px] font-ppNeue-regular tracking-[-0.15px] leading-[1.2]">
            Let&apos;s Supercharge Your Productivity with
          </p>
          <p className="text-black text-lg sm:text-[22px] font-ppNeue-regular tracking-[-0.15px] leading-[1.2]">
            AI &amp; Human Agents!
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
