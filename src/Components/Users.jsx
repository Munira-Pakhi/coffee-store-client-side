import { useState } from "react";
import { useLoaderData } from "react-router-dom";


const Users = () => {
    const loadedUser = useLoaderData();
    const [users, setUsers] = useState(loadedUser);

    const handleDelete = id =>{
        //  make sure user is confirmed to delete
        fetch(`http://localhost:5000/user/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log('deleted successfully');
            //  remove the use from the UI
            const remainingUsers = users.filter(user => user._id !== id);
            setUsers(remainingUsers);
        })
    }

    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Created At</th>
        <th>Last login</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {
        users.map(user => <tr key={user._id}>
        <th>{user._id}</th>
        <td>{user.email}</td>
        <td>{user.createdAt}</td>
        <td></td>
        <td>
            <button onClick={()=>handleDelete(user._id)} className="btn">X</button>
        </td>
        </tr>
        
        )
      }
    </tbody>
  </table>
</div>
    );
};

export default Users;