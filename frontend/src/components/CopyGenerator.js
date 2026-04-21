import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Fade, Chip, Stack, Collapse } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopySnackbar from './CopySnackbar.js';
import ProgressButton from './ProgressButton';
import LoadingSkeleton from './LoadingSkeleton';

const EDIT_TAGS = [
    { id: 'shorten', label: 'Shorten' },
    { id: 'no-emojis', label: 'No Emojis' },
    { id: 'no-hashtags', label: 'No Hashtags' },
    { id: 'no-special', label: 'No Special Characters' },
    { id: 'professional', label: 'Make Professional' },
    { id: 'happy', label: 'Make Happy' },
    { id: 'punchy', label: 'Punchy' },
];

const TONE_OPTIONS = [
    { label: 'Casual', value: 'casual' },
    { label: 'Formal', value: 'formal' },
    { label: 'Friendly', value: 'friendly' },
    { label: 'Exciting', value: 'exciting' },
    { label: 'Professional', value: 'professional' },
];

const CopyGenerator = () => {
    const [tone, setTone] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [generatedCopy, setGeneratedCopy] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleTagToggle = async (tagId) => {
        const isSelected = selectedTags.includes(tagId);
        const newTags = isSelected 
            ? selectedTags.filter(id => id !== tagId) 
            : [...selectedTags, tagId];
        
        setSelectedTags(newTags);

        // Trigger immediate transformation if we have copy to transform
        if (generatedCopy && !loading) {
            setLoading(true);
            setIsError(false);
            
            const tagLabel = EDIT_TAGS.find(t => t.id === tagId).label;
            const instruction = isSelected ? `Undo "${tagLabel}"` : `Apply "${tagLabel}"`;
            
            try {
                const response = await axios.post('/generate', { 
                    tone: tone || 'casual', 
                    industry: 'General Marketing', 
                    prompt: `Original Text: "${generatedCopy}"\n\nTask: ${instruction}. Rewrite the original text accordingly while maintaining the core message.` 
                });
                setGeneratedCopy(response.data.copy);
            } catch (error) {
                console.error('Refinement Error:', error);
                setIsError(true);
                setSnackbarMessage('Failed to apply refinement');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleGenerate = async () => {
        if (!prompt || !tone) {
            setSnackbarMessage('Please fill in the prompt and tone');
            setIsError(true);
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);
        setIsError(false);
        setGeneratedCopy('');
        
        // Construct refined prompt with tags
        const tagInstructions = selectedTags.map(id => EDIT_TAGS.find(t => t.id === id).label).join(', ');
        const finalPrompt = tagInstructions 
            ? `${prompt} (Additional requirements: ${tagInstructions})`
            : prompt;

        try {
            const response = await axios.post('/generate', { 
                tone, 
                industry: 'General Marketing', 
                prompt: finalPrompt 
            });
            setGeneratedCopy(response.data.copy);
            setSnackbarMessage('Generation succeeded!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Generation Error:', error);
            setIsError(true);
            const errorMessage = error.response?.data?.details?.error?.message || error.response?.data?.error || error.message || 'Generation failed';
            setSnackbarMessage(`Error: ${errorMessage}`);
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (generatedCopy) {
            navigator.clipboard.writeText(generatedCopy);
            setSnackbarMessage('Copied to clipboard!');
            setIsError(false);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: { xs: 1, sm: 2, md: 4 },
                width: "100%",
                maxWidth: '600px',
                margin: 'auto',
                gap: { xs: 2, md: 3 },
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    padding: { xs: 2.5, md: 4 },
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <TextField
                    multiline
                    rows={4}
                    label="What are we writing about?"
                    placeholder="Describe your product, post, or service..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    variant="outlined"
                    fullWidth
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="tone-select-label">Main Tone</InputLabel>
                        <Select
                            labelId="tone-select-label"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            label="Main Tone"
                        >
                            <MenuItem value="casual">Casual</MenuItem>
                            <MenuItem value="formal">Formal</MenuItem>
                            <MenuItem value="friendly">Friendly</MenuItem>
                            <MenuItem value="exciting">Exciting</MenuItem>
                            <MenuItem value="professional">Professional</MenuItem>
                        </Select>
                    </FormControl>

                    <Collapse in={!!generatedCopy} mountOnEnter unmountOnExit>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1.5, display: 'block', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Refinements
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                                {EDIT_TAGS.map((tag) => (
                                    <Chip
                                        key={tag.id}
                                        label={tag.label}
                                        onClick={() => handleTagToggle(tag.id)}
                                        variant={selectedTags.includes(tag.id) ? "filled" : "outlined"}
                                        sx={{
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            transition: 'all 0.2s ease',
                                            backgroundColor: selectedTags.includes(tag.id) 
                                                ? 'rgba(255, 95, 0, 0.2)' 
                                                : 'rgba(255, 255, 255, 0.03)',
                                            borderColor: selectedTags.includes(tag.id) 
                                                ? '#ff5f00' 
                                                : 'rgba(255, 255, 255, 0.1)',
                                            color: selectedTags.includes(tag.id) ? '#ff5f00' : 'text.secondary',
                                            '&:hover': {
                                                backgroundColor: selectedTags.includes(tag.id) 
                                                    ? 'rgba(255, 95, 0, 0.3)' 
                                                    : 'rgba(255, 255, 255, 0.08)',
                                                borderColor: '#ff5f00',
                                            },
                                            '& .MuiChip-label': {
                                                px: 1.5
                                            }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Collapse>
                </Box>

                <ProgressButton
                    loading={loading}
                    onClick={handleGenerate}
                    label="Generate Copy"
                />
            </Paper>

            <Fade in={loading || !!generatedCopy}>
                <Box sx={{ width: '100%' }}>
                    {loading ? (
                        <Paper
                            sx={{
                                padding: 4,
                                borderRadius: 4,
                                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                            }}
                        >
                            <LoadingSkeleton />
                        </Paper>
                    ) : (
                        generatedCopy && (
                            <Paper 
                                sx={{ 
                                    padding: 4, 
                                    borderRadius: 4, 
                                    backgroundColor: 'rgba(255, 95, 0, 0.03)', 
                                    border: '1px solid rgba(255, 95, 0, 0.1)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        lineHeight: 1.7, 
                                        color: '#eee',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {generatedCopy}
                                </Typography>
                                <Button 
                                    onClick={handleCopy} 
                                    sx={{ 
                                        marginTop: 3,
                                        color: '#ff5f00',
                                        borderColor: 'rgba(255, 95, 0, 0.3)',
                                        '&:hover': {
                                            borderColor: '#ff5f00',
                                            backgroundColor: 'rgba(255, 95, 0, 0.05)'
                                        }
                                    }} 
                                    variant="outlined"
                                    startIcon={<ContentCopyIcon />}
                                >
                                    Copy to Clipboard
                                </Button>
                            </Paper>
                        )
                    )}
                </Box>
            </Fade>

            <CopySnackbar 
                open={snackbarOpen} 
                onClose={handleSnackbarClose} 
                message={snackbarMessage} 
                severity={isError ? 'error' : 'success'}
            />
        </Box>
    );
};

export default CopyGenerator;
