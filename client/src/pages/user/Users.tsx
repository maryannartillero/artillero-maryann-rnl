import { useState } from "react";
import AddUserModal from "../../components/modals/user/AddUserModal";
import EditUserModal from "../../components/modals/user/EditUserModal";
import UsersTable from "../../components/tables/gender/user/UsersTable";
import type { Users } from "../../interfaces/Users";
import MainLayout from "../layout/MainLayout";

const Users = () => {
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [openAddUserModal, setOpenAddModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);

  const handleOpenEditUserModal = (user: Users) => {
    setSelectedUser(user);
    setOpenEditUserModal(true);
  };

  const handleCloseEditUserModal = () => {
    setSelectedUser(null);
    setOpenEditUserModal(false);
  };

  const content = (
    <>
      <AddUserModal
        showModal={openAddUserModal}
        onRefreshUsers={() => setRefreshUsers(!refreshUsers)}
        onClose={() => setOpenAddModal(false)}
      />
      <EditUserModal
        showModal={openEditUserModal}
        user={selectedUser}
        onRefreshUsers={() => setRefreshUsers(!refreshUsers)}
        onClose={handleCloseEditUserModal}
      />
      <div className="d-flex justify-content-end mt-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setOpenAddModal(true)}
        >
          Add User
        </button>
      </div>
      <UsersTable
        refreshUsers={refreshUsers}
        onEditUser={handleOpenEditUserModal}
      />
    </>
  );

  return <MainLayout content={content} />;
};

export default Users;
