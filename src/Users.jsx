import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Navbar from './Navbar';

function Users() {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const handleDeleteUser = _id => {
    fetch(`http://localhost:5000/users/${_id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          alert('Deleted Successfully');
          const remaining = users.filter(user => user._id !== _id);
          setUsers(remaining);
        }
      });

  };
  return (
    <>
      <Navbar/>
      <div className="w-screen h-screen">
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          {users.map(user => {
            return (
              <div
                key={user._id}
                className="py-2 px-6 rounded-lg bg-gray-900 text-white w-96"
              >
                <p className="text-center text-2xl font-semibold">
                  {' '}
                  {user.name}
                </p>
                <p className="text-center">{user.email}</p>
                <p className="text-center">{user._id}</p>
                <div className=" flex gap-4 items-center justify-center">
                  <Link to={`/update/${user._id}`}>
                    <button className="border border-green-500 px-4 py-2 rounded-lg mt-4 hover:bg-green-500 duration-300 active:bg-green-700">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="border border-green-500 px-4 py-2 rounded-lg mt-4 hover:bg-green-500 duration-300 active:bg-green-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Users;
