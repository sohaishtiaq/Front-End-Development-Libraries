const { useState } = React;

export function EventRSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [dietaries, setDietaries] = useState("");
  const [additionalGuests, setAdditionalGuests] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      name,
      email,
      attendees,
      dietaries, 
      additionalGuests
    });
  };

  return (
    <div className='section'>
      <form className="form-wrap" onSubmit={handleSubmit}>
        <label className='section column'> Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>

        <label className='section column'> Email Address
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>

        <label className='section column'> Number of attendees
          <input type="number" value={attendees} onChange={e => setAttendees(e.target.value)} min="1" required />
        </label>

        <label className='section column'> Dietary preferences
          <input type="text" value={dietaries} onChange={e => setDietaries(e.target.value)}/>
        </label>

        <label className='section'> Additional guests? 
          <input type="checkbox" checked={additionalGuests} onChange={e => setAdditionalGuests(e.target.checked)}/>
        </label>

        <button className='submit-btn' type="submit">Submit</button>

        {submittedData && (
          <div className="label-container">
            <h3>Confirmation</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Number of Attendees:</strong> {submittedData.attendees}</p>
            <p><strong>Dietary Preferences:</strong> {submittedData.dietaries || 'None'}</p>
            <p><strong>Bringing Additional Guests?:</strong> {submittedData.additionalGuests ? "Yes" : "No"}</p>
          </div>
        )}
      </form>
    </div>
  );
}
