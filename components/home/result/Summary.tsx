interface Props {
  summary: string;
}

export default function Summary({ summary }: Props) {
  return <p className="text-zinc-300 text-lg leading-relaxed">{summary}</p>;
}
