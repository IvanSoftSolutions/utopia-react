import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Formulas from './pages/Formulas';
import LogReport from './pages/LogReport';
import Stock from './pages/Stock';
import InOut from './pages/InOut';
// import Shipment from './pages/Shipment';
import HidesInv from './pages/HidesInv';
import Engrases from './pages/Engrases';
import Sales from './pages/Sales';
import ConceptosVentas from './pages/ConceptosVentas';
import Maquilas from './pages/Maquilas';
import ConceptosMaquilas from './pages/ConceptosMaquilas';
import Imports from './pages/Imports';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
      {/* <div style={{ display: value === index ? 'block' : 'none' }}>
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      </div> */}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [nestedValue, setNestedValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setNestedValue(0);
  };

  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Formulas" {...a11yProps(0)} />
          <Tab label="Chemicals" {...a11yProps(1)} />
          <Tab label="Hides Inventory" {...a11yProps(2)} />
          <Tab label="Imports" {...a11yProps(3)} />
          <Tab label="Ventas" {...a11yProps(4)} />
          <Tab label="Maquilas" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={nestedValue} onChange={handleNestedChange} aria-label="basic tabs example">
              <Tab label="Search/Run" {...a11yProps(0)} />
              <Tab label="Log/Report" {...a11yProps(1)} />
              <Tab label="Engrases" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={nestedValue} index={0}>
            <Formulas />
          </TabPanel>
          <TabPanel value={nestedValue} index={1}>
            <LogReport />
          </TabPanel>
          <TabPanel value={nestedValue} index={2}>
            <Engrases />
          </TabPanel>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={nestedValue} onChange={handleNestedChange} aria-label="basic tabs example">
              <Tab label="Stock" {...a11yProps(0)} />
              <Tab label="In/Out" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={nestedValue} index={0}>
            <Stock />
          </TabPanel>
          <TabPanel value={nestedValue} index={1}>
            <InOut />
          </TabPanel>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HidesInv />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Imports />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={nestedValue} onChange={handleNestedChange} aria-label="basic tabs example">
              <Tab label="Ventas" {...a11yProps(0)} />
              <Tab label="Conceptos" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={nestedValue} index={0}>
            <Sales />
          </TabPanel>
          <TabPanel value={nestedValue} index={1}>
            <ConceptosVentas />
          </TabPanel>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={nestedValue} onChange={handleNestedChange} aria-label="basic tabs example">
              <Tab label="Ventas" {...a11yProps(0)} />
              <Tab label="Conceptos" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={nestedValue} index={0}>
            <Maquilas />
          </TabPanel>
          <TabPanel value={nestedValue} index={1}>
            <ConceptosMaquilas />
          </TabPanel>
        </Box>
      </TabPanel>
    </Box>
  );
}