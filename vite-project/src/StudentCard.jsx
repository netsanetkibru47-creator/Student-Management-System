// src/StudentCard.jsx
export default function StudentCard({ name, course, onDelete }) {
  return (
    <div className="student-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h2>{name}</h2>
      <p>Course: <strong>{course}</strong></p>
      <button className="delete-btn" onClick={onDelete}>
        Delete Student
      </button>
    </div>
  );
}
