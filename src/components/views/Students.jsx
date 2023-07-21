import { useState, useEffect } from 'react';
import { CardContainer } from '../UI/Card.jsx';
import UserCard from '../entity/user/UserCard';

function Students() {
  // Initialisation ------------------------------
  const newStudent = {
    UserFirstname: 'Nathan',
    UserLastname: 'Olsson',
    UserEmail: 'K9999999@kingston.ac.uk',
    UserRegistered: 0,
    UserLevel: 4,
    UserYearID: 1,
    UserUsertypeID: 2,
    UserImageURL:
      'https://images.generated.photos/m8Sph5rhjkIsOiVIp4zbvIuFl43F6BWIwhkkY86z2Ms/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODU4MTE5LmpwZw.jpg',
    UserUsertypeName: 'Student',
    UserYearName: '2022-23',
  };
  const loggedInUserGroup = 13;
  const apiURL = 'http://localhost:5000/api';
  const myGroupEndpoint = `${apiURL}/users/groups/${loggedInUserGroup}`;

  // State ---------------------------------------
  const [students, setStudents] = useState(null);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setStudents(result);
  };

  useEffect(() => {
    apiGet(myGroupEndpoint);
  }, [myGroupEndpoint]);

  // Handlers ------------------------------------
  const handleAdd = (student) => {
    student.UserID = Math.floor(10000 * Math.random());
    setStudents([...students, student]);
    console.log(`Length of students: ${students.length}`);
  };

  // View ----------------------------------------
  return (
    <>
      <h1>Students</h1>

      <CardContainer>
        {!students ? (
          <p>Loading records ...</p>
        ) : students.length === 0 ? (
          <p>No records found.</p>
        ) : (
          students.map((student) => <UserCard user={student} key={student.UserID} />)
        )}
      </CardContainer>
      <button onClick={() => handleAdd(newStudent)}>Add student</button>
    </>
  );
}

export default Students;
