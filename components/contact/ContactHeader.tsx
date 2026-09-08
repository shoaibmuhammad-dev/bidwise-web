import Logo from "../common/Logo";
import Animate from "../common/Animate";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Animate y={-20}>
      <div className="mb-10 text-center md:text-left">
        <Logo />

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 my-4">
          {title}
        </h1>
        <p className="text-zinc-400 text-lg md:text-lg max-w-2xl leading-[1.35]">
          {description}
        </p>
      </div>
    </Animate>
  );
}
