import Box from '@mui/material/Box';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
export default App;
