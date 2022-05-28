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
  const [formData, setFormData] = useState({
    name: "",
    age: null,
  });
  console.log(formData);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    await addDoc(userCollectionRef, formData);
    setFormData({ ...formData, name: "", age: "" });
  };
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { name: "a", age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          createUser(e);
        }}
      >
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
        <button className="btn btn-secondary">add</button>
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
                      onClick={() => updateUser(user.id, user.age)}
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
