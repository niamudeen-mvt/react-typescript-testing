type Props = {
  children: React.ReactNode;
};

const ThemeContainer = ({ children }: Props) => {
  return (
    <section className="bg-slate-500">
      <div className="custom__container flex__center h-screen">{children}</div>
    </section>
  );
};

export default ThemeContainer;
