import { useState, useEffect } from "react";
import { db } from "./FirebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import "./App.css";
function App() {
  const userCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [key, setKey] = useState(true);
  const [updateId, setUpdateId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });
  const getUsers = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, [db]);

  const createUser = async () => {
    await addDoc(userCollectionRef, formData);
    setFormData({ ...formData, name: "", age: "" });
    getUsers();
  };
  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, formData);
    setFormData({ ...formData, name: "", age: "" });
    getUsers();
    setKey(true);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  return (
    <div>
      <form className="form">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          placeholder="Name..."
          className="form-control"
        />
        <input
          type="number"
          value={formData.age}
          onChange={(e) => {
            setFormData({ ...formData, age: +e.target.value });
          }}
          placeholder="Age..."
          className="form-control my-3"
        />
        <button
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            key ? createUser() : updateUser(updateId);
          }}
        >
          {key ? "add" : "edit"}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, i) => {
              return (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          name: user.name,
                          age: user.age,
                        });
                        setUpdateId(user.id);
                        setKey(false);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default App;
