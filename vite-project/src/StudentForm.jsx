// src/StudentForm.jsx
import { useState } from 'react';

export default function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('React'); // Default selected course

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Safety check: Don't add if the input name is empty!
    if (!name.trim()) return alert("Please type a student name");

    // Send the data up to the parent array hub
    onAddStudent({ name, course });

    // Reset the input box back to empty
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
      <h3>Register New Student</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter student name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', width: '250px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <select value={course} onChange={(e) => setCourse(e.target.value)} style={{ padding: '8px', width: '270px' }}>
          <option value="React">React Development</option>
          <option value="JavaScript">JavaScript Core</option>
          <option value="HTML & CSS">HTML & CSS Foundations</option>
        </select>
      </div>

      <button type="submit" style={{ padding: '8px 15px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Add Student
      </button>
    </form>
  );
}
