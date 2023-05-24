type BoxesProps = {
  src: string;
  title: string;
  description: string;
};

export default function Box({ src, title, description }: BoxesProps) {
  return (
    <article className="max-w-sm p-5 space-y-5 bg-white rounded-xl">
      <div className="flex items-center gap-3">
        <img src={src} alt="" width={35} height={35} />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-500">{description}</p>
    </article>
  );
}
