import React, { useEffect, useState } from 'react';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("manjaycoder");

  const fetchUserData = async (user) => {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("");
      const result = await response.json();
      setUserData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchUserData(username);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username);
    }
  };

  return (
    <section  className='text-zinc-300' id="main" style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <form className='flex justify-center' onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Fetch User</button>
      </form>

      {userData ? (
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "10px" }}>
          <img src={userData.avatar_url} alt={userData.login} width={100} style={{ borderRadius: "50%" }} />
          <h2 className='text-zinc-300 text-xl' >{userData.name} ({userData.login})</h2>
          <p><strong>Bio:</strong> {userData.bio}</p>
          <p><strong>Location:</strong> {userData.location}</p>
          <p><strong>Company:</strong> {userData.company || "N/A"}</p>
          <p><strong>Blog:</strong> <a href={userData.blog} target="_blank" rel="noopener noreferrer">{userData.blog}</a></p>
          <p><strong>Email:</strong> {userData.email || "Not public"}</p>
          <p><strong>Hireable:</strong> {userData.hireable ? "Yes" : "No"}</p>
          <p><strong>Followers:</strong> {userData.followers}</p>
          <p><strong>Following:</strong> {userData.following}</p>
          <p><strong>Public Repos:</strong> {userData.public_repos}</p>
          <p><strong>Public Gists:</strong> {userData.public_gists}</p>
          <p><strong>GitHub URL:</strong> <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
          <p><strong>Created At:</strong> {new Date(userData.created_at).toLocaleDateString()}</p>
          <p><strong>Last Updated:</strong> {new Date(userData.updated_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>User data not found.</p>
      )}
    </section>
  );
};

export default App;
