import { useEffect, useState } from "react";
import { getData, changeStatus, userStatus } from "../graphql/fetcher";
import defaultUser from "../assets/defaultUser.svg";
import Image from "next/image";
import { CgUnblock } from "react-icons/cg";
import { CgBlock } from "react-icons/cg";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getData();
      setUsers(data.getAllUsers);
    };
    fetchUsers();
  }, []);

  const changeStatusOfUser = async (userId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "ACTIVE" ? userStatus.INACTIVE : userStatus.ACTIVE;
      const response = await changeStatus(userId, newStatus);
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === response.changeAcStatusById.userId
              ? {
                  ...user,
                  userStatus: newStatus,
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  const getStatusLabel = (userStatus) => {
    return userStatus === "ACTIVE" ? "Active" : "Inactive";
  };

  return (
    <div className="mt-10 text-center">
      <button
        className="flex gap-2 ms-4 text-primaryColor"
        onClick={() => router.back()}
      >
        <IoArrowBack size={24} /> Back
      </button>
      <h1 className="text-3xl font-bold text-primaryColor">Settings</h1>
      <div className="mt-10 mx-auto max-w-4xl p-2">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-4">User</th>
              <th className="border border-gray-300 py-2 px-4">Status</th>
              <th className="border border-gray-300 py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key} className="bg-white">
                <td className="border border-gray-300 py-2 px-4 flex justify-center ">
                  <div className="flex gap-2 justify-center items-center">
                    {user.profilePicture ? (
                      <Image
                        alt="user image"
                        priority={true}
                        src={user.profilePicture}
                        width={50}
                        height={50}
                        className="object-contain rounded-full"
                      />
                    ) : (
                      <Image
                        alt="user image"
                        priority={true}
                        src={defaultUser}
                        width={50}
                        height={50}
                        className="object-contain rounded-full"
                      />
                    )}
                    <span>{user.username}</span>
                  </div>
                </td>
                <td className="border border-gray-300 py-2 px-4">
                  {getStatusLabel(user.userStatus)}
                </td>
                <td className="border border-gray-300 py-2 px-4">
                  <button
                    onClick={() =>
                      changeStatusOfUser(user.userId, user.userStatus)
                    }
                    className={`${
                      user.userStatus === "ACTIVE"
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-blue-500 hover:bg-blue-700"
                    } text-white font-bold py-1 text-sm md:text-md px-3 rounded`}
                  >
                    {user.userStatus === "ACTIVE"
                      ? "Block User"
                      : "Unblock User"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
