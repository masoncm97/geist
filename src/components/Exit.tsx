import classNames from "classnames";

export default function Exit({
  trigger,
  className,
}: {
  trigger: () => void;
  className?: string;
}) {
  const genericHamburgerLine = `h-0.5 w-14 lg:w-12 my-[.66rem] bg-sand justify-self-center self-center transition ease transform duration-300`;
  return (
    <button
      aria-label="Exit Information"
      className="fixed top-5 right-5 md:top-10 md:right-16 flex flex-col justify-center items-center group z-50 h-20 w-20"
      onClick={trigger}
    >
      <div
        className={classNames(
          className,
          genericHamburgerLine,
          "rotate-45 translate-y-3 group-hover:opacity-100"
        )}
      />
      <div
        className={classNames(
          className,
          genericHamburgerLine,
          "-rotate-45 -translate-y-3 group-hover:opacity-100"
        )}
      />
    </button>
  );
}
