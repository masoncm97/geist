import classNames from "classnames";

export interface HamburgerProps {
  isOpen: boolean;
  triggerMobileNav: () => void;
}

export default function Hamburger({
  isOpen,
  triggerMobileNav,
}: HamburgerProps) {
  const genericHamburgerLine = `h-0.5 w-14 lg:w-12 my-[.317rem] bg-sand justify-self-center self-center transition ease transform duration-300 bg-gray-400`;
  return (
    <button
      aria-label="Open Sidebar"
      className="md:hidden flex flex-col justify-center items-center group mx-5 z-40 right-0"
      onClick={() => triggerMobileNav()}
    >
      <div
        className={classNames(
          genericHamburgerLine,
          isOpen
            ? "rotate-45 translate-y-3 group-hover:opacity-100"
            : "group-hover:opacity-100"
        )}
      />
      <div
        className={classNames(
          genericHamburgerLine,
          isOpen ? "opacity-0" : "group-hover:opacity-100"
        )}
      />
      <div
        className={classNames(
          genericHamburgerLine,
          isOpen
            ? "-rotate-45 -translate-y-3 group-hover:opacity-100"
            : "group-hover:opacity-100"
        )}
      />
    </button>
  );
}
