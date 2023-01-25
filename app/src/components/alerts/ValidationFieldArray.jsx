import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { Box, Typography } from '@mui/material';

export const ValidationFieldArray = (props) => {
  const { field, errors, touched } = props;
  const touchedField = getIn(touched, field);
  const errorField = getIn(errors, field);
  return (
    <>
      {errorField && touchedField ? (
        <Box component="div" sx={{ display: 'block', mb: 2 }}>
          <Typography color="error">{errorField}</Typography>
        </Box>
      ) : null}
    </>
  );
};

ValidationFieldArray.propTypes = {
  field: PropTypes.string.isRequired,
  errors: PropTypes.any.isRequired,
  touched: PropTypes.any.isRequired,
};
