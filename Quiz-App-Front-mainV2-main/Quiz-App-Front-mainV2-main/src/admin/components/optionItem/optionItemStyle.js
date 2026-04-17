import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export const Item = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'correct',
})(({ correct }) => ({
  backgroundColor: correct ? '#d4edda' : '#f1e2e2ff', 
  padding: '8px',
  textAlign: 'left',
  borderRadius: 8,
  color: '#241d1dff',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  height:'30px',
}));