import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiGithub, FiSearch, FiUser, FiMapPin, FiBriefcase, FiLink, FiMail, FiUsers, FiCode, FiClock, FiCalendar } from 'react-icons/fi';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

const SearchForm = styled.form`
  display: flex;
  max-width: 600px;
  margin: 0 auto 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 999px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  color: white;
  border: none;
  padding: 0 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #1d4ed8, #6d28d9);
  }
`;

const ProfileContainer = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(90deg, #f8fafc, #f1f5f9);
  border-bottom: 1px solid #e2e8f0;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem;
`;

const Username = styled.a`
  display: inline-block;
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #2563eb;
  }
`;

const Bio = styled.p`
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MetaIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
`;

const MetaContent = styled.div``;

const MetaLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const MetaValue = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-top: 0.25rem;
  word-break: break-word;

  a {
    color: #2563eb;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
`;

const StatItem = styled.div`
  padding: 1.5rem;
  text-align: center;
  border-right: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: #f1f5f9;
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fff1f2;
  color: #be123c;
  border-radius: 0.5rem;
  border: 1px solid #fda4af;
`;

const App = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("Sorry you data is found");
      const result = await response.json();
      setUserData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setUserData(null);
    } finally {
      setLoading(false);
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
    <Container>
      <Header>
        <Title>GitHub Profile Viewer</Title>
        <Subtitle>Discover GitHub users and their contributions</Subtitle>
      </Header>

      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
        />
        <SearchButton type="submit" disabled={loading}>
          <FiSearch size={18} />
          {loading ? 'Searching...' : 'Search'}
        </SearchButton>
      </SearchForm>

      {error ? (
        <ErrorMessage>
          <p>Error: {error}</p>
          <p>Please try another username</p>
        </ErrorMessage>
      ) : userData ? (
        <ProfileContainer>
          <ProfileHeader>
            <Avatar src={userData.avatar_url} alt={userData.login} />
            <ProfileInfo>
              <Name>
                {userData.name || userData.login}
                {userData.hireable && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: '0.5rem',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '999px',
                    fontWeight: '600'
                  }}>
                    Hireable
                  </span>
                )}
              </Name>
              <Username href={userData.html_url} target="_blank" rel="noopener noreferrer">
                <FiGithub style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                {userData.login}
              </Username>
              <Bio>{userData.bio || 'No bio available'}</Bio>
            </ProfileInfo>
          </ProfileHeader>

          <MetaGrid>
            <MetaItem>
              <MetaIcon>
                <FiUser size={18} />
              </MetaIcon>
              <MetaContent>
                <MetaLabel>Full Name</MetaLabel>
                <MetaValue>{userData.name || 'Not specified'}</MetaValue>
              </MetaContent>
            </MetaItem>

            <MetaItem>
              <MetaIcon>
                <FiMapPin size={18} />
              </MetaIcon>
              <MetaContent>
                <MetaLabel>Location</MetaLabel>
                <MetaValue>{userData.location || 'Not specified'}</MetaValue>
              </MetaContent>
            </MetaItem>

            <MetaItem>
              <MetaIcon>
                <FiBriefcase size={18} />
              </MetaIcon>
              <MetaContent>
                <MetaLabel>Company</MetaLabel>
                <MetaValue>{userData.company || 'Not specified'}</MetaValue>
              </MetaContent>
            </MetaItem>

            <MetaItem>
              <MetaIcon>
                <FiLink size={18} />
              </MetaIcon>
              <MetaContent>
                <MetaLabel>Website/Blog</MetaLabel>
                <MetaValue>
                  {userData.blog ? (
                    <a href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`} target="_blank" rel="noopener noreferrer">
                      {userData.blog}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </MetaValue>
              </MetaContent>
            </MetaItem>

            <MetaItem>
              <MetaIcon>
                <FiMail size={18} />
              </MetaIcon>
              <MetaContent>
                <MetaLabel>Email</MetaLabel>
                <MetaValue>{userData.email || 'Not public'}</MetaValue>
              </MetaContent>
            </MetaItem>

            <MetaItem>
              <MetaIcon>
                <FiCalendar size={18} />
              </MetaIcon>
              <MetaContent>
                <MetaLabel>Joined GitHub</MetaLabel>
                <MetaValue>{new Date(userData.created_at).toLocaleDateString()}</MetaValue>
              </MetaContent>
            </MetaItem>
          </MetaGrid>

          <StatsGrid>
            <StatItem>
              <StatValue>{userData.followers}</StatValue>
              <StatLabel>Followers</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userData.following}</StatValue>
              <StatLabel>Following</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userData.public_repos}</StatValue>
              <StatLabel>Public Repos</StatLabel>
            </StatItem>
          </StatsGrid>
        </ProfileContainer>
      ) : (
        !error && <p style={{ textAlign: 'center', color: '#64748b' }}>Search for a GitHub user to see their profile</p>
      )}
    </Container>
  );
};

export default App;