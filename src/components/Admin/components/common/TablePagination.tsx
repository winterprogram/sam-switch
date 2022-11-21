import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

export default function TablePagination(props: {
  curPage: number;
  setCurPage: (arg0: number) => void;
  lastPage: number;
}) {
  const getStart = () => {
    switch (props.curPage) {
      case 1:
        return 1;
      case 2:
        return 2;
      case props.lastPage:
        return props.lastPage > 4 ? props.lastPage - 4 : 1;
      case props.lastPage - 1:
        return props.lastPage > 3 ? props.lastPage - 4 : 1;
      default:
        return props.curPage - 2;
    }
  };

  const getEnd = () => {
    switch (props.curPage) {
      case 1:
        return props.lastPage > 5 ? 5 : props.lastPage;
      case 2:
        return props.lastPage > 6 ? 6 : props.lastPage;
      case props.lastPage:
        return props.lastPage;
      case props.lastPage - 1:
        return props.lastPage;
      default:
        return props.curPage + 2;
    }
  };

  var list = Array.from(
    { length: getEnd() - getStart() + 1 },
    (_, v) => v + getStart()
  );
  return (
    <div className="bg-white px-4 py-6 flex items-center justify-between ml-5 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          onClick={() =>
            props.curPage === 1
              ? undefined
              : props.setCurPage(props.curPage - 1)
          }
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={() =>
            props.curPage === props.lastPage
              ? undefined
              : props.setCurPage(props.curPage + 1)
          }
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              onClick={() => props.setCurPage(1)}
              className="relative inline-flex items-center px-2 py-2 rounded-l-full border border-gray-300 bg-white hover:cursor-pointer text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">First</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              onClick={() =>
                props.curPage === 1
                  ? undefined
                  : props.setCurPage(props.curPage - 1)
              }
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white  hover:cursor-pointer text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {list.map((index) => (
              <a
                onClick={() => props.setCurPage(index)}
                className={` border-gray-300 ${
                  index === props.curPage
                    ? "text-sky-600 bg-sky-100"
                    : "text-gray-500 bg-white"
                } hover:bg-gray-50 hover:cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {index}
              </a>
            ))}
            <a
              onClick={() =>
                props.curPage === props.lastPage
                  ? undefined
                  : props.setCurPage(props.curPage + 1)
              }
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm hover:cursor-pointer font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              onClick={() => props.setCurPage(props.lastPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-full border border-gray-300 hover:cursor-pointer bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Last</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
