import { useState } from 'react';
import FormEntrega from './FormEntrega';
import { Button, ButtonGroup, Box, Dialog, DialogContent } from '@mui/material'

export default function MenuBar() {
    const [openInserir, setOpenInserir] = useState(false);
    const [openAlterar, setOpenAlterar] = useState(false);

    const handleOpenInserir = () => {
      setOpenInserir(true);
    };
  
    const handleCloseInserir = () => {
      setOpenInserir(false);
    };

    const handleOpenAlterar = () => {
        setOpenAlterar(true);
      };
    
    const handleCloseAlterar = () => {
        setOpenAlterar(false);
      };
    const forminserir = FormEntrega('cadastrar');
    const formalterar = FormEntrega('alterar');
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
        <Button onClick={handleOpenInserir}>Inserir</Button>
        <Button onClick={handleOpenAlterar}>Alterar</Button>
        <Button>Sair</Button>
      </ButtonGroup>

      <Dialog open={openInserir} onClose={handleCloseInserir} fullWidth maxWidth="sm">
        <DialogContent>
          {forminserir}<br></br>
          <Button onClick={handleCloseInserir} variant="contained">Cancelar</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={openAlterar} onClose={handleCloseAlterar} fullWidth maxWidth="sm">
        <DialogContent>
          {formalterar}<br></br>
          <Button onClick={handleCloseAlterar} variant="contained">Cancelar</Button>
        </DialogContent>
      </Dialog>

    </Box>
  );
}
