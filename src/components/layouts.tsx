import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Pokemon.module.css';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 240;
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Pokemon', href: '/pokemon' },
  // { label: 'Contact', href: '/contact' }
];

export default function Layouts({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
        <Image src={'/pokemon_logo.svg'} alt="logo" width={120} height={60} />
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, my: 2 }}>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} style={{ textDecoration: 'none', color: '#1976d2', fontSize: 18 }}>
            {item.label}
          </Link>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar component="nav" position="static" sx={{ bgcolor: '#FFDA27' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link href={'/'}>
              <Image src={'/pokemon_logo.svg'} alt="logo" width={180} height={90} />
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.label} sx={{ color: '#fff' }} component={Link} href={item.href}>
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={styles.nav}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        {children}
      </Box>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="body2">&copy; 2025 Pokémon Go</Typography>
      </Box>
    </Box>
  );
}