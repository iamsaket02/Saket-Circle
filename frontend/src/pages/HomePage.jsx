import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getDeveloper,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api.js";
import { Link, useNavigate } from "react-router";
import {
  CheckCircleIcon,
  ExternalLink,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import { toast } from "react-hot-toast";
import { Capitalize, capitalizeWords } from "../common/utils.js";

const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ongoingRequestIds, setOngoingRequestIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: developer = [], isLoading: loadingDeveloper } = useQuery({
    queryKey: ["developer"],
    queryFn: getDeveloper,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const {
    mutate: sendReqestMutation,
    isPending,
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

  const goToLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/saket-kumar-pandey-b34b43190/",
      "_blank",
    );
  };

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
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length == 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet new friends
                </h2>
                <p className="opacity-70">
                  Discover new friends based on your profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length == 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommended users found
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new recommendations!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
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
                        disabled={hasRequestBeenSent || isPending}
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
        </section>

        <section>
          {loadingDeveloper ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : developer.length == 0 ? (
            <></>
          ) : (
            <>
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      Meet the developer
                    </h2>
                    <p className="opacity-70">
                      Tell me what you really think… I can handle it
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {developer.map((user) => {
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
                          className="btn-primary btn w-full mt-2"
                          onClick={() => goToLinkedIn()}
                        >
                          <ExternalLink />
                          LinkedIn
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
