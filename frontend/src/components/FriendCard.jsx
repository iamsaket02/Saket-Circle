import { MapPinIcon } from "lucide-react";
import { Link } from "react-router";
import { Capitalize, capitalizeWords } from "../common/utils";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="rounded-full"
            />
          </div>
          <h3 className="font-semibold truncate">
            {capitalizeWords(friend.fullName)}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            <MapPinIcon className="size-3 mr-1" />
            {Capitalize(friend.location)}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
