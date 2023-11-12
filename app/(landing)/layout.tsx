const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[100vh] w-full bg-[#111827] overflow-auto">
      <div className="h-[100vh] w-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
