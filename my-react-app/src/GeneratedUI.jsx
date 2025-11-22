
import React,{useState} from 'react';
import Checkbox from './components/Checkbox.jsx';
import { PrimaryBackgroundButton, SecondaryBackgroundButton, ThirdBackgroundButton } from './components/Buttons.jsx';
import { Input } from './components/Input.jsx';
import { PrimaryBackgroundDropdown } from './components/Dropdowns.jsx';
import Card from './components/Card.jsx'
import Header from './components/Header.jsx';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'

function GeneratedUI() {
  const [isChecked, setIsChecked]=useState(false);
  const handleCheckbox = (event) => {
  setIsChecked(event.target.checked);
  };
  const [dropdownValue, setDropdownValue] = useState(''); 
  const handleDropdown = (event) => {
    setDropdownValue(event.target.value);
  };
  return (
    <Grid columns="12" className="Grid">
      <Card className="Main_Container" title="Main_Container" >
        <Input className="Input_Field_1" />
<Input className="Input_Field_2" label="Rectangle_3"/>
<Input className="Input_Field_3" />
<PrimaryBackgroundButton className="Button_1" />
      </Card>
    </Grid>
  );
}

export default GeneratedUI;
