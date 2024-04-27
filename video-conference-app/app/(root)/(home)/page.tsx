import MeetingActionsList from "@/components/MeetingActionsList";

const Home = () => {
  const currentDate = new Date();

  const time = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(currentDate);

  return (
    <section className="flex flex-col w-full gap-8">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h1 className="glassmorphism max-w-[270px] p-2 rounded-lg text-center text-white">
            Upcoming meeting at 12:30
          </h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-6xl text-white font-bold">{time}</h2>
            <p className="text-2xl text-white font-normal">{day}</p>
          </div>
        </div>
      </div>

      <MeetingActionsList />
    </section>
  );
};

export default Home;
