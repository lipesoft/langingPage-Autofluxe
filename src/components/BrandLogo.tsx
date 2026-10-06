type BrandLogoProps = {
  className?: string;
  loading?: "eager" | "lazy";
};

export default function BrandLogo({ className = "", loading = "eager" }: BrandLogoProps) {
  return (
    <img
      src="/autofluxe-logo.jpeg"
      alt="Autofluxe"
      width={1600}
      height={400}
      loading={loading}
      decoding="async"
      className={"block h-auto w-full object-contain " + className}
    />
  );
}
