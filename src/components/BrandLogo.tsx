type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <img
      src="/autofluxe-logo.jpeg"
      alt="Autofluxe"
      className={"block h-auto w-full object-contain " + className}
    />
  );
}
