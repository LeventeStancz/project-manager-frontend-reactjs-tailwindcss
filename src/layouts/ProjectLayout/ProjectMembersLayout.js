import AddMemberToProject from "../../components/Members/AddMemberToProject";

function ProjectMembersLayout() {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hide flex flex-col justify-start items-center">
      <div className="w-1/2">
        <h1 className="text-3xl text-semibold">Add member to project:</h1>
        <AddMemberToProject />
        <h1 className="text-3xl text-semibold">Remove member from project:</h1>
      </div>
    </div>
  );
}

export default ProjectMembersLayout;
