import { Box } from '@mui/material';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      maxWidth="md"
      margin="0 auto"
    >
      <Header />
      <MainContent />
      <Footer />
    </Box>
  );
}

export default App;
