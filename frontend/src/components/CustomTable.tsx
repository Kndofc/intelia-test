import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

interface Header {
  key: string;
  label: string;
}

interface CustomTableProps {
  headers: Header[];
  rows: Array<Record<string, any>>;
}

const CustomTable: React.FC<CustomTableProps> = ({ headers, rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1c1c1c',
        '@media (max-width: 600px)': {
          overflowX: 'auto',
        },
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: '#007BFF' }}>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  '@media (max-width: 600px)': {
                    fontSize: '12px',
                  },
                }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:hover': { backgroundColor: '#2a2a2a' },
                }}
              >
                {headers.map((header, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      color: '#FFFFFF',
                      textAlign: 'center',
                      borderBottom: '1px solid #444444',
                      '@media (max-width: 600px)': {
                        fontSize: '12px',
                        padding: '8px',
                      },
                    }}
                  >
                    {row[header.key] !== undefined && row[header.key] !== null
                      ? row[header.key]
                      : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                sx={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  padding: '20px',
                  '@media (max-width: 600px)': {
                    fontSize: '12px',
                    padding: '10px',
                  },
                }}
              >
                Nenhum dado disponível
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
