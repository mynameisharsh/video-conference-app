import Image from "next/image";

const Loading = () => {
  return (
    <Image
      src="/icons/loading-circle.svg"
      alt="Loading"
      width={50}
      height={50}
    />
  );
};

export default Loading;
