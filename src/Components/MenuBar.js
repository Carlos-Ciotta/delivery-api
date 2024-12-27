import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function Navigate(tipo){
    const nav = useNavigate();
    if(tipo === 'inserir'){
        nav('/inserirform')
    }else if (tipo === 'alterar'){
        nav('/alterarform')
    }else if (tipo === 'logout'){

    }
}

export default function MenuBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button onClick={Navigate('inserir')}>Inserir</Button>
        <Button onClick={Navigate('alterar')}>Alterar</Button>
        <Button onClick={Navigate('logout')}>Sair</Button>
      </ButtonGroup>

    </Box>
  );
}
