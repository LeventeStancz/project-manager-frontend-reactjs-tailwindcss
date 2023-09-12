import HorizontalLine from "../../Special/HorizontalLine";

function TaskModalBody({ task }) {
  return (
    <div className="w-full py-2 flex flex-col gap-y-4">
      <h1 className="text-2xl font-semibold px-1 text-custom-purple">Title:</h1>
      <div className="flex flex-col gap-y-2">
        <HorizontalLine />
        <h1 className="text-2xl px-1">{task?.title}</h1>
        <HorizontalLine />
      </div>
      <h1 className="text-2xl font-semibold px-1 text-custom-purple">
        Short description:
      </h1>
      <div className="flex flex-col gap-y-2">
        <HorizontalLine />
        <h2 className="text-xl px-1">{task?.shortDescription}</h2>
        <HorizontalLine />
      </div>
      <h1 className="text-2xl font-semibold px-1 text-custom-purple">
        Description:
      </h1>
      <div className="flex flex-col gap-y-2">
        <HorizontalLine />
        <h2 className="text-xl px-1 leading-relaxed">
          {task?.description ? task?.description : "No further information..."}
        </h2>
        <HorizontalLine />
      </div>
    </div>
  );
}

export default TaskModalBody;
