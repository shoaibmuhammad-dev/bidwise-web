import { useEffect, useRef } from "react";

interface ErrorProps {
  errorMessage: string | any;
}

const ErrorMessage = ({ errorMessage }: ErrorProps) => {
  const errorSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (errorMessage && errorSectionRef.current) {
      const y =
        errorSectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        50;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [errorMessage]);

  return (
    <div
      ref={errorSectionRef}
      className="w-full bg-red-900/20 border border-red-900/50 text-red-500 rounded-2xl p-4 md:p-5 shadow-2xl relative backdrop-blur-xl mb-8"
    >
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
