import FormControlLabel from '@mui/material/FormControlLabel';
import styled from 'styled-components';

const CommonFormLabel = styled(FormControlLabel)`
  margin-left: 0 !important;

  &:not(:last-child) {
    margin-right: 45px;
  }

  .MuiTypography-root {
    font-size: 14px;
  }
`;

export default CommonFormLabel;
