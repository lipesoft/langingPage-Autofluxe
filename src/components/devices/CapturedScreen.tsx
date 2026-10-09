type CapturedScreenProps = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

export default function CapturedScreen({ src, alt, fit = "cover" }: CapturedScreenProps) {
  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden bg-white bg-center bg-no-repeat"
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: fit,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.06] to-white/0"
        aria-hidden="true"
      />
    </div>
  );
}
