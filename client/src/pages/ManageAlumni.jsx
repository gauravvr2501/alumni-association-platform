import React, { useEffect, useState } from "react"; 
import axios from "axios";

const ManageAlumni = () => {
  const [alumniList, setAlumniList] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/all-alumni");
        setAlumniList(response.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Alumni</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Graduation Year</th>
          </tr>
        </thead>
        <tbody>
          {alumniList.map((alumni) => (
            <tr key={alumni._id}>
              <td>{alumni.name}</td>
              <td>{alumni.email}</td>
              <td>{alumni.graduationYear}</td>
            </tr>
          ))}
        </tbody>    
      </table>
    </div>
  );
};

export default ManageAlumni;
 