import { InformationCircleIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";

import { useState } from "react";

import ProjectInfoModal from "../../components/Modals/Project/ProjectInfoModal";

function ProjectHeader({ project }) {
  const [favorite, setFavorite] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  return (
    <div className="w-fit flex flex-nowrap items-center gap-x-8 py-2">
      <h1 className="leading-none text-4xl font-semibold text-custom-orange">
        {project?.name}
      </h1>
      <div className="flex flex-nowrap items-center gap-x-4">
        <InformationCircleIcon
          onClick={() => setInfoModal((prev) => !prev)}
          className="w-7 h-7 hover:cursor-pointer"
        />
        <ProjectInfoModal
          show={infoModal}
          closeModal={() => setInfoModal(false)}
        />
        {favorite ? (
          <SolidStarIcon
            onClick={() => setFavorite(false)}
            className="w-7 h-7 text-custom-yellow-base hover:cursor-pointer"
          />
        ) : (
          <StarIcon
            onClick={() => setFavorite(true)}
            className="w-7 h-7 hover:cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default ProjectHeader;
