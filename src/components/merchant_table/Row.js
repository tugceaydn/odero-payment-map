import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './MerchantTable.scss';

export default function Row({ merchant, entry, hasSubMerchants, subMerchants, handleRowClick }) {
    const [open, setOpen] = React.useState(false);
  
  
    const toggleOpen = () => {
      if(hasSubMerchants){
          setOpen(!open);
          if (!open) {
            handleRowClick(merchant);
          }
      }
    };
    
    return (
      <React.Fragment>
        <TableRow>
          <TableCell className="icon-cell">
            {hasSubMerchants && (
              <IconButton aria-label="expand row" size="small" onClick={toggleOpen}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>
          <TableCell component="th" scope="row">
            {merchant}
          </TableCell>
          <TableCell align="right">{entry.totalCount}</TableCell>
          <TableCell align="right">{entry.totalAmount}</TableCell>
        </TableRow>
        {hasSubMerchants && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div" className="collapsible-header" align="left">
                    {merchant} Alt Üye İş Yerleri
                  </Typography>
                  <Table size="small" aria-label="sub-merchants" className="collapsible-content">
                    <TableBody>
                      {subMerchants.map(([subMerchant, subEntry]) => (
                        <TableRow key={subMerchant}>
                          <TableCell component="th" scope="row">
                            {subEntry.merchantName}
                          </TableCell>
                          <TableCell align="right">{subEntry.totalCount}</TableCell>
                          <TableCell align="right">{subEntry.totalAmount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
      merchant: PropTypes.string.isRequired,
      entry: PropTypes.shape({
        totalCount: PropTypes.number.isRequired,
        totalAmount: PropTypes.number.isRequired,
      }).isRequired,
      subMerchants: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string, // For the subMerchant name
            PropTypes.shape({
              totalCount: PropTypes.number.isRequired,
              totalAmount: PropTypes.number.isRequired,
            })
          ])
        )
      ).isRequired,
      hasSubMerchants: PropTypes.bool.isRequired,
      handleRowClick: PropTypes.func.isRequired,
    };