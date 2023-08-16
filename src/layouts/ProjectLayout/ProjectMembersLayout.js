import AddMemberToProject from "../../components/Members/AddMemberToProject";
import RemoveMemberFromProject from "../../components/Members/RemoveMemberFromProject";

function ProjectMembersLayout() {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hide flex flex-col justify-start items-center">
      <div className="w-1/3">
        <h1 className="text-center text-3xl text-semibold">
          Add member to project:
        </h1>
        <AddMemberToProject />
        <h1 className="text-center text-3xl text-semibold">
          Remove member from project:
        </h1>
        <RemoveMemberFromProject />
      </div>
    </div>
  );
}

export default ProjectMembersLayout;
