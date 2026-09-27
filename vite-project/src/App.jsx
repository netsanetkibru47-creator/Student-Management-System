import { useState } from 'react';
import StudentCard from './StudentCard.jsx';
import StudentForm from './StudentForm.jsx';
import './App.css';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [currentView, setCurrentView] = useState('dashboard');
  const [students, setStudents] = useState([
    { id: 1, name: "Abebe", course: "JavaScript", grade: "A+" },
    { id: 2, name: "Hana", course: "HTML & CSS", grade: "A" }
  ]);
  const [courses, setCourses] = useState(["JavaScript Core", "HTML & CSS Foundations", "React Development", "Python Basics"]);
  const [selectedEnrollStudent, setSelectedEnrollStudent] = useState('');
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState('React Development');

  // FOR THE TOGGLE CLICK
  const [isMonthDetailOpen, setIsMonthDetailOpen] = useState(false);
  const [isTopPerformerOpen, setIsTopPerformerOpen] = useState(false);

    const topPerformers = students.filter(s => s.grade.startsWith('A')).slice(0, 3);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authForm.username || !authForm.password) return alert("Fill out all fields");
    if (!isRegistered) { setIsRegistered(true); alert("Registration successful! Please login."); } else { setIsLoggedIn(true); }
  };
  const handleAddStudent = (newStudent) => { setStudents([...students, { id: Date.now(), grade: 'A', ...newStudent }]); };
  const handleDeleteStudent = (id) => { setStudents(students.filter(s => s.id !== id)); };
  const handleEnroll = (e) => {
    e.preventDefault();
    if (!selectedEnrollStudent) return alert("Please type a student's name");
    setStudents([...students, { id: Date.now(), name: selectedEnrollStudent, course: selectedEnrollCourse, grade: 'B+' }]);
    alert(`${selectedEnrollStudent} successfully enrolled in ${selectedEnrollCourse}!`);
    setSelectedEnrollStudent('');
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>{isRegistered ? "Portal Login" : "Portal Registration"}</h2>
          <form onSubmit={handleAuthSubmit}>
            <input type="text" placeholder="Username" value={authForm.username} onChange={e => setAuthForm({...authForm, username: e.target.value})} />
            <input type="password" placeholder="Password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} />
            <button type="submit">{isRegistered ? "Login" : "Register Account"}</button>
          </form>
          <p onClick={() => setIsRegistered(!isRegistered)}>{isRegistered ? "Don't have an account? Register" : "Already registered? Login"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header"><h3>SMS Admin</h3></div>
        <nav className="sidebar-nav">
          <button className={currentView === 'dashboard' ? 'active' : ''} onClick={() => setCurrentView('dashboard')}>Dashboard</button>
          <button className={currentView === 'courses' ? 'active' : ''} onClick={() => setCurrentView('courses')}>Courses</button>
          <button className={currentView === 'students' ? 'active' : ''} onClick={() => setCurrentView('students')}>Students</button>
          <button className={currentView === 'enroll' ? 'active' : ''} onClick={() => setCurrentView('enroll')}>Enroll to Course</button>
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
        </nav>
      </aside>

      <main className="main-content">
       
        {currentView === 'dashboard' && (
          <div>
            <h2>Overview Dashboard</h2>
            
            <div className="metrics-row">
              <div className="metric-box bg-blue">
                <h4>Number of Students</h4>
                <p className="metric-num">{students.length}</p>
              </div>
              <div className="metric-box bg-green">
                <h4>Total Courses</h4>
                <p className="metric-num">{courses.length}</p>
              </div>

              <div 
                className="metric-box bg-purple clickable-box" 
                onClick={() => setIsTopPerformerOpen(!isTopPerformerOpen)}
                style={{ cursor: 'pointer' }}
              >
                <h4>Top Performing <span>(Click to view 3)</span></h4>
                <p className="metric-num">{students.filter(s => s.grade.startsWith('A')).length}</p>
              </div>
              
              <div 
                className="metric-box bg-orange clickable-box" 
                onClick={() => setIsMonthDetailOpen(!isMonthDetailOpen)}
                style={{ cursor: 'pointer' }}
              >
                <h4>Enrolled This Month <span>(Click to view)</span></h4>
                <p className="metric-num">{students.length}</p>
              </div>
            </div>

             {isTopPerformerOpen && (
              <div className="top-performers-details" style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: '#6b21a8' }}>🏆 Top 3 Star Performers</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                      <th style={{ padding: '10px 0' }}>Student Name</th>
                      <th>Course</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformers.map((student) => (
                      <tr key={student.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '500' }}>⭐ {student.name}</td>
                        <td style={{ color: '#555' }}>{student.course}</td>
                        <td style={{ color: '#16a34a', fontWeight: 'bold' }}>{student.grade}</td>
                      </tr>
                    ))}
                    {topPerformers.length === 0 && (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No students with 'A' grades yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

           
            {isMonthDetailOpen && (
              <div className="monthly-enrollment-details" style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3>Monthly Enrollment Breakdown</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                      <th style={{ padding: '10px 0' }}>Student Name</th>
                      <th>Enrolled Course Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '500' }}>👤 {student.name}</td>
                        <td style={{ color: '#2563eb' }}>📘 {student.course}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        { }
        {currentView === 'courses' && (
          <div>
            <h2>Available Institutional Courses</h2>
            <ul className="courses-list">
              {courses.map((course, idx) => <li key={idx}>📘 {course}</li>)}
            </ul>
          </div>
        )}

        {currentView === 'students' && (
          <div>
            <h2>Manage Active Student Roster</h2>
            <StudentForm onAddStudent={handleAddStudent} />
            <div className="students-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
              {students.map(student => (
                <StudentCard key={student.id} name={student.name} course={student.course} onDelete={() => handleDeleteStudent(student.id)} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'enroll' && (
          <div>
            <h2>Course Enrollment Registry Form</h2>
            <form onSubmit={handleEnroll} className="enroll-form">
              <input type="text" placeholder="Type Student's Name" value={selectedEnrollStudent} onChange={e => setSelectedEnrollStudent(e.target.value)} />
              <select value={selectedEnrollCourse} onChange={e => setSelectedEnrollCourse(e.target.value)}>
                {courses.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
              <button type="submit">Submit Enrollment</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;


