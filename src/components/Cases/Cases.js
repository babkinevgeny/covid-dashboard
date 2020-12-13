import React from 'react';
import { Container } from '@material-ui/core';
import CasesTable from './CasesTable/CasesTable';

const Cases = () => (
  <Container>
    <CasesTable tableTitle="Cases by Province/State/Dependency" />
  </Container>
);

export default Cases;
