import { DocumentTextIcon } from "@heroicons/react/24/outline";

function TaskCount(props) {
  return (
    <div className="w-fit h-fit flex flex-nowrap text-custom-gray-bright space-x-2">
      <DocumentTextIcon className="w-6 h-6" />
      <p className="font-semibold">{props.count}</p>
    </div>
  );
}

export default TaskCount;
