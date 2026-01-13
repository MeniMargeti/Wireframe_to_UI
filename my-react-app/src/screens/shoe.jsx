
import React,{useState} from 'react';
import Checkbox from '../components/Checkbox.jsx';
import { PrimaryBackgroundButton, PrimaryBorderButton, SecondaryBackgroundButton, ThirdBackgroundButton } from '../components/Buttons.jsx';
import { Input } from '../components/Input.jsx';
import { PrimaryBackgroundDropdown } from '../components/Dropdowns.jsx';
import Card from '../components/Card.jsx'
import Header from '../components/Header.jsx';
import Switch from '../components/Switch.jsx';
import Table from '../components/Table.jsx'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import './shoe.css'

import {ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Edit, Archive, Delete } from "@mui/icons-material";
import { dateOldToNew, stringAToZInsensitive } from "@iamnapo/sort";
import { isFuzzyMatch, dayjs } from "../utils/index.js";
const Table_1_2_columns = [{Header: <Typography variant='h6'>{'US Size'}</Typography>, accessor: 'size', id: 'size', filterable: true, minWidth: 150, sortMethod: (value1, value2) => stringAToZInsensitive()(value1, value2), filterMethod: ({ id, value }, row) => isFuzzyMatch(row[id], value), Cell: ({ value }) => (<Box sx={{ display: 'flex', ml: 1, alignItems: 'center' }}>{value}</Box>)}, {Header: <Typography variant='h6'>{'EU Size'}</Typography>, accessor: 'eu', id: 'eu', filterable: true, minWidth: 150, sortMethod: (value1, value2) => stringAToZInsensitive()(value1, value2), filterMethod: ({ id, value }, row) => isFuzzyMatch(row[id], value), Cell: ({ value }) => (<Box sx={{ display: 'flex', ml: 1, alignItems: 'center' }}>{value}</Box>)}, {Header: <Typography variant='h6'>{'UK Size'}</Typography>, accessor: 'uk', id: 'uk', filterable: true, minWidth: 150, sortMethod: (value1, value2) => stringAToZInsensitive()(value1, value2), filterMethod: ({ id, value }, row) => isFuzzyMatch(row[id], value), Cell: ({ value }) => (<Box sx={{ display: 'flex', ml: 1, alignItems: 'center' }}>{value}</Box>)}, {Header: <Typography variant='h6'>{'Length (in)'}</Typography>, accessor: 'length', id: 'length', filterable: true, minWidth: 150, sortMethod: (value1, value2) => stringAToZInsensitive()(value1, value2), filterMethod: ({ id, value }, row) => isFuzzyMatch(row[id], value), Cell: ({ value }) => (<Box sx={{ display: 'flex', ml: 1, alignItems: 'center' }}>{value}</Box>)}, {Header: <Typography variant='h6'>{'Width (in)'}</Typography>, accessor: 'width', id: 'width', filterable: true, minWidth: 150, sortMethod: (value1, value2) => stringAToZInsensitive()(value1, value2), filterMethod: ({ id, value }, row) => isFuzzyMatch(row[id], value), Cell: ({ value }) => (<Box sx={{ display: 'flex', ml: 1, alignItems: 'center' }}>{value}</Box>)}] 
 const Table_1_2_data = [{id: '1', size: 'US 6', eu: '36', uk: '3.5', length: '8.5', width: '3.2'}, {id: '2', size: 'US 7', eu: '37', uk: '4.5', length: '9.0', width: '3.3'}, {id: '3', size: 'US 8', eu: '38', uk: '5.5', length: '9.5', width: '3.4'}, {id: '4', size: 'US 9', eu: '39', uk: '6.5', length: '10.0', width: '3.5'}]
function Shoe() {
  const [isLoading, setIsLoading] = useState(false);
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
    <div>
      
<Grid className="Grid">
    <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=340&h=340&c=fill" alt="Avatar" className="Image_1" loading="lazy"/>

<img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=150&h=150&c=fill" alt="Avatar" className="Image_2" loading="lazy"/>

<img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&c=fill" alt="Avatar" className="Image_3" loading="lazy"/>

<div className="Text_1" >Premium Women's Running Shoes</div>

<div className="Text_2" >Experience ultimate comfort and style with our latest collection of women's athletic footwear. Designed for performance and everyday wear, these shoes feature breathable materials and cushioned support.</div>

<PrimaryBackgroundDropdown className="Dropdown_1" placeholder="Select Size"  items={[{text:'Size 6',value:'6'},{text:'Size 7',value:'7'},{text:'Size 8',value:'8'},{text:'Size 9',value:'9'},{text:'Size 10',value:'10'}]} value={dropdownValue} onChange={handleDropdown}/>

<PrimaryBorderButton className="Button_1" title="Add to Cart"/>
</Grid>


<Grid className="Grid">
    <div className="Text_1_2" >Size Chart</div>

<div className="Text_2_2" >Find your perfect fit with our comprehensive size guide. Our women's shoes are designed to provide comfort and style across all sizes. Please refer to the chart below for accurate measurements.</div>

<Table className="Table_1_2" 
		 columns={Table_1_2_columns} 
		 data={Table_1_2_data}
		 noDataText={isLoading ? "Fetching data..." : "No data available!"}  
		 defaultSorted={[{ id: "name", desc: true }]} />
</Grid>

    </div>
  );
}
export default Shoe;
