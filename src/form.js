import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    gender: '',
    skills: [],
    image: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let updatedErrors = { ...errors };

    if (type === 'checkbox') {
      const { skills } = formData;
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          skills: [...skills, value],
        }));
      } else {
        const updatedSkills = skills.filter((skill) => skill !== value);
        setFormData((prevState) => ({
          ...prevState,
          skills: updatedSkills,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (!value.trim()) {
        updatedErrors = {
          ...updatedErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        };
      } else {
        updatedErrors = {
          ...updatedErrors,
          [name]: '',
        };
      }
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === 'string' && !formData[key].trim()) {
        formErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSubmittedData(formData);
    setFormData({
      name: '',
      email: '',
      website: '',
      gender: '',
      skills: [],
      image: '',
    });
    setErrors({});
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      website: '',
      gender: '',
      skills: [],
      image: '',
    });
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <div className="container">
      <h1>Student Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <br />
        <label>
          Website:
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
          {errors.website && <span className="error">{errors.website}</span>}
        </label>
        <br />
        <label>
          Gender:
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />{' '}
            Male
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
            />{' '}
            Female
          </label>
        </label>
        <br />
        <label>
          Skills:
          <br />
          <label>
            <input
              type="checkbox"
              name="skills"
              value="java"
              checked={formData.skills.includes('java')}
              onChange={handleChange}
            />{' '}
            Java
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="skills"
              value="html"
              checked={formData.skills.includes('html')}
              onChange={handleChange}
            />{' '}
            HTML
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="skills"
              value="css"
              checked={formData.skills.includes('css')}
              onChange={handleChange}
            />{' '}
            CSS
          </label>
        </label>
        <br />
        <label>
          Image Link:
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </label>
        <br />
        <button type="submit">Enroll</button>
        <button class="clear" type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
      {submittedData && (
        <div className="display-box">
          <h2>Enrolled Student:</h2>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Website: {submittedData.website}</p>
          <p>Gender: {submittedData.gender}</p>
          <p>Skills: {submittedData.skills.join(', ')}</p>
          {submittedData.image && (
            <div>
              <h3>Image:</h3>
              <img src={submittedData.image} alt="Entered" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
