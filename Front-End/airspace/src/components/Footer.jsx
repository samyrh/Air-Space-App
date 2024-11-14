import React from 'react';
import { Box, Typography, TextField, Button, Container, Grid, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MainSection = () => {
    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #eeaeca, #94bbe9, #ff6b6b, #fc5c7d)',
            backgroundSize: '400% 400%', // Makes the gradient large enough to animate
            animation: 'gradientAnimation 15s ease infinite', // Apply the animation
            color: 'white',
            py: 8,
            px: 3
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} justifyContent="space-between">
                    {/* Owner Services Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Owner Services
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                            We provide exclusive services to property owners, ensuring optimal property management, bookings, and customer satisfaction.
                        </Typography>
                        <Link
                            href="#"
                            color="inherit"
                            underline="hover"
                            sx={{
                                fontSize: '1rem',
                                '&:hover': {
                                    color: '#d4d4d4',
                                    textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                                    transform: 'scale(1.05)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Learn more about our services →
                        </Link>

                        <Box mt={3}>
                            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                                Feel free to reach out to us with any questions or suggestions.
                            </Typography>
                            {/* Adding Owner Names */}
                            <Typography variant="body2" sx={{ opacity: 0.9, fontStyle: 'italic' }}>
                                Services provided by Sami Rhalim and Mehdi L8.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Services by Staybnb Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Services by Staybnb
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                            We offer a variety of services to enhance your experience as a host, from property listings to guest management and support.
                        </Typography>
                        <Link
                            href="#"
                            color="inherit"
                            underline="hover"
                            sx={{
                                fontSize: '1rem',
                                '&:hover': {
                                    color: '#d4d4d4',
                                    textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                                    transform: 'scale(1.05)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Discover all our services →
                        </Link>

                        <Box mt={3}>
                            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                                Get in touch with us to learn more about our offerings.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Reclamation Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Reclamation Section
                        </Typography>

                        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                            Got an issue or a request? Send us your reclamation, and we'll make sure to handle it with care.
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 3,
                            }}
                        >
                            {/* Email input */}
                            <TextField
                                variant="outlined"
                                placeholder="Enter your email"
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    width: '100%',
                                    maxWidth: '500px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'transparent',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#fff',
                                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '12px',
                                        fontSize: '0.875rem',
                                        color: 'white',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            />

                            {/* Message Textarea */}
                            <TextField
                                variant="outlined"
                                placeholder="Describe your reclamation"
                                multiline
                                rows={4}
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    width: '100%',
                                    maxWidth: '500px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'transparent',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#fff',
                                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '12px',
                                        fontSize: '0.875rem',
                                        color: 'white',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            />

                            {/* Send Button */}
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #ff6b6b, #fc5c7d)',
                                    color: 'white',
                                    py: 1.25,
                                    px: 3,
                                    fontWeight: 'bold',
                                    borderRadius: '30px',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #fc5c7d, #ff6b6b)',
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Send Reclamation
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Footer Section */}
                <Box mt={1} display="flex" justifyContent="center" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} sx={{ padding: '4px 0' }}>
                    <Box display="flex" gap={2} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                        {['Privacy', 'Terms', 'Sitemap'].map((text, index) => (
                            <Link
                                key={index}
                                href="#"
                                color="inherit"
                                underline="hover"
                                sx={{
                                    fontSize: '1.25rem',  // Increased font size to 1.25rem
                                    '&:hover': {
                                        color: '#d4d4d4',
                                        textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
                                    },
                                    transition: 'color 0.3s ease',
                                }}
                            >
                                {text}
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default MainSection;
