const Image = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}) => <img src={src} alt={alt} className={className} />;

export default Image;
