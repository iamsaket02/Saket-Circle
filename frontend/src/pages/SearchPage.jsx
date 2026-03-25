import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOutgoingFriendReqs,
  getSearchedUsers,
  sendFriendRequest,
} from "../lib/api.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";
import { Capitalize, capitalizeWords } from "../common/utils.js";

const SearchPage = () => {
  const queryClient = useQueryClient();
  const [ongoingRequestIds, setOngoingRequestIds] = useState(new Set());
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { mutate: searchMutation, isPending: loadingUsers } = useMutation({
    mutationFn: getSearchedUsers,
    onSuccess: (data) => setSearchedUsers(data),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    searchMutation(searchInput);
  };

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const {
    mutate: sendReqestMutation,
    isPending: sendFriendRequestPending,
    error,
  } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      toast.success("Friend request sent");
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOngoingRequestIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 mb-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Search new friends
        </h1>
        <form onSubmit={handleSearch}>
          <div className="flex flex-row gap-3">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              {loadingUsers ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Searching
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>
        {loadingUsers ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : searchedUsers.length == 0 ? (
          <div className="card bg-base-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">No Search Result</h3>
            <p className="text-base-content opacity-70">Please try again!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedUsers.map((user) => {
              const hasRequestBeenSent = ongoingRequestIds.has(user._id);
              return (
                <div
                  key={user._id}
                  className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="card-body p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar size-16">
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {capitalizeWords(user.fullName)}
                        </h3>
                        {user.location && (
                          <div className="badge badge-secondary text-xs mt-1">
                            <MapPinIcon className="size-3 mr-1" />
                            {Capitalize(user.location)}
                          </div>
                        )}
                      </div>
                    </div>

                    {user.bio && (
                      <p className="text-sm opacity-70">{user.bio}</p>
                    )}

                    <button
                      className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"}`}
                      onClick={() => sendReqestMutation(user._id)}
                      disabled={hasRequestBeenSent || sendFriendRequestPending}
                    >
                      {hasRequestBeenSent ? (
                        <>
                          <CheckCircleIcon className="size-4 mr-2" />
                          Request sent
                        </>
                      ) : (
                        <>
                          <UserPlusIcon className="size-4 mr-2" />
                          Send friend request
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
