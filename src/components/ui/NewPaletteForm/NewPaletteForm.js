import React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';

import { arrayMove } from 'react-sortable-hoc';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from '../DraggableColorList/DraggableColorList';
import seedColors from '../../../seed-data/seedColors';
import './NewPaletteForm.css';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NewPaletteForm(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState('teal');
  const [colors, setColors] = React.useState([...seedColors[0].colors]);
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const [newName, setNewName] = React.useState('');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const addNewColor = () => {
    const newColor = { color: currentColor, name: newName };
    setColors([...colors, newColor]);
    console.log(colors);
    setNewName('');
  };
  const handleChange = (evt) => {
    setNewName(evt.target.value);
  };
  const handleNameChange = (evt) => {
    setNewPaletteName(evt.target.value);
  };
  const handleSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: colors,
    };
    props.savePalette(newPalette);
    props.history.push('/');
  };
  const handleDeletion = (colorName) => {
    console.log(colors);
    let newColors = colors.filter((c) => c.name !== colorName);
    console.log(newColors);
    setColors(newColors);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };
  const clearColors = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      let randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
    }
    setColors([...colors, allColors[rand]]);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create a new palette
          </Typography>
          <div className="nav-btns">
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                label="New palette name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={handleNameChange}
                validators={['required']}
                errorMessages={['Enter palette name']}
              />

              <Button variant="contained" color="secondary" type="submit">
                Save palette
              </Button>
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Go back
                </Button>
              </Link>
            </ValidatorForm>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <Typography variant="h4">Make you own palette</Typography>
        <div className="picker-container">
          <div className="buttons">
            <Button variant="contained" color="secondary" onClick={clearColors}>
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            className="picker"
            color={currentColor}
            onChangeComplete={(newColor) => {
              setCurrentColor(newColor.hex);
            }}
          />

          <ValidatorForm className="color-form" onSubmit={() => addNewColor()}>
            <TextValidator
              className="colorName"
              value={newName}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <Button
              className="add-color-button"
              variant="contained"
              style={{ backgroundColor: currentColor }}
              type="submit"
            >
              Add Color
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>
      <Main className="main" open={open}>
        <DrawerHeader />
        <DraggableColorList
          onSortEnd={onSortEnd}
          distance={1}
          colors={colors}
          handleDeletion={handleDeletion}
          axis="xy"
        />
      </Main>
    </Box>
  );
}
