import { UsersIcon } from "@heroicons/react/24/outline";

function UserCount(props) {
  return (
    <div className="w-fit h-fit flex flex-nowrap text-custom-gray-light space-x-2">
      <UsersIcon className="w-6 h-6" />
      <p className="font-semibold">{props.count}</p>
    </div>
  );
}

export default UserCount;
