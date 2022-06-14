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
import Shipment from './pages/Shipment';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Run Formula" {...a11yProps(0)} />
          <Tab label="Log/Report" {...a11yProps(1)} />
          <Tab label="Stock" {...a11yProps(2)} />
          <Tab label="In/Out" {...a11yProps(3)} />
          <Tab label="Shipment" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Formulas />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LogReport />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Stock />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <InOut />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Shipment />
      </TabPanel>
    </Box>
  );
}