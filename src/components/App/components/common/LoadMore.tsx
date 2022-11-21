export const LoadMore = ({ onClick }: any) => {
  return (
    <div className="flex pb-5 justify-center">
      <button
        onClick={() => onClick()}
        className="max-w-fit bg-gray-700 hover:brightness-110 px-14 py-3 font-semibold text-white rounded-lg"
      >
        Load More
      </button>
    </div>
  );
};
