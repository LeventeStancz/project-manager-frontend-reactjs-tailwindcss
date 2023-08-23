import ChangeOwner from "../../../components/ProjectLayout/AdminSettings/ChangeOwner";
import ChangeActiveStatus from "../../../components/ProjectLayout/AdminSettings/ChangeActiveStatus";

function ProjectAdminSettingsLayout() {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col justify-start items-center">
      <h1 className="text-3xl text-custom-blue font-semibold">
        Change project owner:
      </h1>
      <ChangeOwner />
      <h1 className="text-3xl text-custom-blue font-semibold">
        Change projects active status:
      </h1>
      <ChangeActiveStatus />
    </div>
  );
}

export default ProjectAdminSettingsLayout;
