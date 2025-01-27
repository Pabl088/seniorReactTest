import BackButton from "./BackButton";

export const NotFoundArticles = () => {
  return (
    <div className="flex flex-col justify-center h-screen w-[70vw]">
      <p className="text-white text-6xl font-bold">Articles not found</p>
      <BackButton />
    </div>
  );
};
