import classNames from "classnames";

export default function Exit({ trigger }: { trigger: () => void }) {
  const genericHamburgerLine = `h-0.5 w-14 lg:w-12 my-[.66rem] bg-sand justify-self-center self-center transition ease transform duration-300 bg-gray-600`;
  return (
    <button
      aria-label="Exit Information"
      className=" top-10 flex flex-col justify-center items-center group mx-5 md:mx-16 md:mt-10 z-40 right-0 h-20 place-self-end"
      onClick={trigger}
    >
      <div
        className={classNames(
          genericHamburgerLine,
          "rotate-45 translate-y-3 group-hover:opacity-100"
        )}
      />
      <div
        className={classNames(
          genericHamburgerLine,
          "-rotate-45 -translate-y-3 group-hover:opacity-100"
        )}
      />
    </button>
  );
}
