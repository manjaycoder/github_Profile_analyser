import React, { useEffect, useState } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { FiGithub, FiSearch, FiUser, FiMapPin, FiBriefcase, FiLink, FiMail, FiUsers, FiCode, FiClock, FiCalendar, FiActivity, FiSun, FiMoon } from 'react-icons/fi';

// Define light and dark themes
const lightTheme = {
  body: '#ffffff',
  text: '#1e293b',
  secondaryText: '#64748b',
  cardBg: '#ffffff',
  cardBorder: '#e2e8f0',
  headerBg: 'linear-gradient(90deg, #f8fafc, #f1f5f9)',
  statBg: '#f8fafc',
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  errorBg: '#fff1f2',
  errorBorder: '#fda4af',
  contributionBg: '#f8fafc',
  contributionEmpty: '#e2e8f0',
};

const darkTheme = {
  body: '#1e293b',
  text: '#f8fafc',
  secondaryText: '#94a3b8',
  cardBg: '#334155',
  cardBorder: '#475569',
  headerBg: 'linear-gradient(90deg, #334155, #475569)',
  statBg: '#334155',
  inputBg: '#334155',
  inputBorder: '#475569',
  errorBg: '#7f1d1d',
  errorBorder: '#f87171',
  contributionBg: '#334155',
  contributionEmpty: '#475569',
};

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

const pulseSoft = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
  min-height: 100vh;
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
  color: ${props => props.theme.secondaryText};
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
  background-color: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};

  &::placeholder {
    color: ${props => props.theme.secondaryText};
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
  background: ${props => props.theme.cardBg};
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  border: 1px solid ${props => props.theme.cardBorder};
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme.headerBg};
  border-bottom: 1px solid ${props => props.theme.cardBorder};
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
  border: 4px solid ${props => props.theme.cardBg};
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
  color: ${props => props.theme.text};
  margin: 0 0 0.25rem;
`;

const Username = styled.a`
  display: inline-block;
  color: ${props => props.theme.secondaryText};
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #2563eb;
  }
`;

const Bio = styled.p`
  color: ${props => props.theme.secondaryText};
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
  background: ${props => props.theme.statBg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
`;

const MetaContent = styled.div``;

const MetaLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.secondaryText};
`;

const MetaValue = styled.div`
  font-weight: 600;
  color: ${props => props.theme.text};
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
  background: ${props => props.theme.statBg};
  border-top: 1px solid ${props => props.theme.cardBorder};
`;

const StatItem = styled.div`
  padding: 1.5rem;
  text-align: center;
  border-right: 1px solid ${props => props.theme.cardBorder};
  transition: all 0.3s ease;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${props => props.theme.headerBg};
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
  color: ${props => props.theme.secondaryText};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${props => props.theme.errorBg};
  color: #be123c;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.errorBorder};
`;

const ContributionsContainer = styled.div`
  padding: 2rem;
  border-top: 1px solid ${props => props.theme.cardBorder};
  background: ${props => props.theme.contributionBg};
`;

const ContributionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ContributionsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContributionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14px, 1fr));
  gap: 4px;
`;

const ContributionDay = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background-color: ${props => {
    if (props.level === 4) return '#1e3a8a';
    if (props.level === 3) return '#1e40af';
    if (props.level === 2) return '#1d4ed8';
    if (props.level === 1) return '#3b82f6';
    return props.theme.contributionEmpty;
  }};
  animation: ${pulseSoft} 2s infinite;
  animation-delay: ${props => props.index * 0.05}s;
`;

const ContributionLegend = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: ${props => props.theme.secondaryText};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.cardBorder};
  color: ${props => props.theme.text};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const App = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const fetchUserData = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("User not found");
      const result = await response.json();
      setUserData(result);
      
      // Fetch contributions data
      const contributionsResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
      if (contributionsResponse.ok) {
        const contributionsData = await contributionsResponse.json();
        setContributions(contributionsData.contributions);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setUserData(null);
      setContributions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username);
    }
  };

  // Generate mock contributions if API fails (for demo purposes)
  const generateMockContributions = () => {
    const mockContributions = [];
    for (let i = 0; i < 365; i++) {
      mockContributions.push({
        level: Math.floor(Math.random() * 5) // Random level between 0-4
      });
    }
    return mockContributions;
  };

  const displayContributions = contributions.length > 0 ? contributions : generateMockContributions();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <ThemeToggle onClick={toggleTheme}>
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </ThemeToggle>
        
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

            <ContributionsContainer>
              <ContributionsHeader>
                <ContributionsTitle>
                  <FiActivity size={20} />
                  Daily Contributions (Last Year)
                </ContributionsTitle>
              </ContributionsHeader>
              <ContributionsGrid>
                {displayContributions.map((day, index) => (
                  <ContributionDay 
                    key={index} 
                    level={day.level} 
                    index={index % 20} // For staggered animation
                    title={`${day.date || 'Date not available'}: ${day.count || 0} contributions`}
                  />
                ))}
              </ContributionsGrid>
              <ContributionLegend>
                <LegendItem>
                  <LegendColor color={darkMode ? darkTheme.contributionEmpty : lightTheme.contributionEmpty} />
                  <span>No contributions</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#3b82f6" />
                  <span>1-9</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#1d4ed8" />
                  <span>10-19</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#1e40af" />
                  <span>20-29</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#1e3a8a" />
                  <span>30+</span>
                </LegendItem>
              </ContributionLegend>
            </ContributionsContainer>
          </ProfileContainer>
        ) : (
          !error && <p style={{ textAlign: 'center', color: '#64748b' }}>Search for a GitHub user to see their profile</p>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;