import Skeleton from "react-loading-skeleton";

function ProjectCardSkeleton({ cardsCount }) {
  return Array(cardsCount)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="w-64 h-fit">
        <div className="bg-custom-gray-base rounded-xl px-4 py-4">
          <div className="flex flex-col gap-y-4 items-start ">
            <div className="w-full flex justify-between items-center">
              <Skeleton containerClassName="w-44" height={24} />
              <Skeleton circle width={26} height={26} />
            </div>
            <div className="w-full flex justify-center">
              <Skeleton containerClassName="w-32" height={28} />
            </div>
            <div className="w-full flex justify-between">
              <Skeleton containerClassName="w-8" height={22} />
              <Skeleton containerClassName="w-8" height={22} />
            </div>
          </div>
        </div>
      </div>
    ));
}

export default ProjectCardSkeleton;
