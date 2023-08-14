import Skeleton from "react-loading-skeleton";

function TaskCardSkeleton() {
  return (
    <div className=" w-fit flex flex-col items-center px-4">
      <div className="w-[360px] h-fit bg-custom-gray-base rounded-xl flex flex-row flex-nowrap">
        <div className="h-full w-full flex flex-col p-3 gap-y-3">
          <div className="w-full flex flex-col gap-y-2 justify-center">
            <h1 className="text-xl font-semibold">
              <Skeleton containerClassName="w-28" height={24} />
            </h1>
            <h2 className="text-custom-gray-bright font-medium">
              <Skeleton containerClassName="w-28" height={24} count={2} />
            </h2>
          </div>
          <div className="w-full flex flex-row justify-between">
            <Skeleton containerClassName="w-28" height={24} />
            <Skeleton containerClassName="w-28" height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCardSkeleton;
