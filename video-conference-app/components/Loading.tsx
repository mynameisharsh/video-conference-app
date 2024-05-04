import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loading;
