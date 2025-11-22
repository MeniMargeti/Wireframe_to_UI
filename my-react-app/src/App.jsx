
import React,{useState} from 'react';
import Checkbox from './components/Checkbox.jsx';
import { PrimaryBackgroundButton, SecondaryBackgroundButton, ThirdBackgroundButton } from './components/Buttons.jsx';
import { Input } from './components/Input.jsx';
import { PrimaryBackgroundDropdown } from './components/Dropdowns.jsx';
import Card from './components/Card.jsx'
import Header from './components/Header.jsx';
import Switch from './components/Switch.jsx';
import Table from './components/Table.jsx'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import './App.css'
function App() {
  const [isChecked, setIsChecked]=useState(false);
  const handleCheckbox = (event) => {
  setIsChecked(event.target.checked);
  };
  const handleSwitch = (event) => {
  setIsChecked(event.target.checked);
  };
  const [dropdownValue, setDropdownValue] = useState(''); 
  const handleDropdown = (event) => {
    setDropdownValue(event.target.value);
  };
  return (
    <Grid columns="12" className="Grid">
      <Table className="Grid_Table" columns="6" data={[]}/>
    </Grid>
  );
}

export default App;
