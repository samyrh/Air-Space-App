import React from 'react';
import { Box, Typography, TextField, Button, Container, Grid, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MainSection = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
                color: '#333',
                py: 6,
                px: 3,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} justifyContent="space-between">
                    {/* Owner Services Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#444' }}>
                            Owner Services
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                            We provide exclusive services to property owners, ensuring optimal property management,
                            bookings, and customer satisfaction.
                        </Typography>
                        <Link
                            href="#"
                            underline="hover"
                            sx={{
                                fontSize: '1rem',
                                color: '#444',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: '#222',
                                    textDecoration: 'underline',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Learn more about our services →
                        </Link>
                        <Box mt={3}>
                            <Typography variant="body2" sx={{ color: '#777', fontStyle: 'italic' }}>
                                Services provided by Sami Rhalim and Mehdi L8.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Staybnb Services Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#444' }}>
                            Services by Staybnb
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                            We offer a variety of services to enhance your experience as a host, from property listings
                            to guest management and support.
                        </Typography>
                        <Link
                            href="#"
                            underline="hover"
                            sx={{
                                fontSize: '1rem',
                                color: '#444',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: '#222',
                                    textDecoration: 'underline',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Discover all our services →
                        </Link>
                    </Grid>

                    {/* Reclamation Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 3, color: '#444' }}>
                            Reclamation Section
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 4, color: '#666' }}>
                            Got an issue or a request? Send us your reclamation, and we'll make sure to handle it with
                            care.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <TextField
                                variant="outlined"
                                placeholder="Enter your email"
                                fullWidth
                                sx={{
                                    maxWidth: '500px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#ccc' },
                                        '&:hover fieldset': { borderColor: '#999' },
                                    },
                                    '& .MuiInputBase-input': { color: '#333' },
                                }}
                            />
                            <TextField
                                variant="outlined"
                                placeholder="Describe your reclamation"
                                multiline
                                rows={4}
                                fullWidth
                                sx={{
                                    maxWidth: '500px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#ccc' },
                                        '&:hover fieldset': { borderColor: '#999' },
                                    },
                                    '& .MuiInputBase-input': { color: '#333' },
                                }}
                            />
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                sx={{
                                    background: '#444',
                                    color: '#fff',
                                    px: 4,
                                    borderRadius: '20px',
                                    '&:hover': { background: '#222' },
                                }}
                            >
                                Send Reclamation
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Footer Section */}
                <Box mt={5} display="flex" justifyContent="center" gap={3}>
                    {['Privacy', 'Terms', 'Sitemap'].map((text, index) => (
                        <Link
                            key={index}
                            href="#"
                            underline="hover"
                            sx={{
                                fontSize: '0.875rem',
                                color: '#666',
                                '&:hover': { color: '#444' },
                            }}
                        >
                            {text}
                        </Link>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default MainSection;
