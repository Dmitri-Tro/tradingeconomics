import { FC, memo } from "react";
import { SelectedStats } from "src/types/types.ts";
import { MyTableRow } from "src/futures/StatsTable/TableRow/MyTableRow.tsx";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976d2",
        color: "#fff",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

type StatsTableProps = {
    interestedStats: SelectedStats[];
    comparisonStats: SelectedStats[];
    showPosition: (category: string) => void;
};

export const StatsTable: FC<StatsTableProps> = memo(({ interestedStats, comparisonStats, showPosition }) => {
    const tableStyles = {
        marginLeft: "auto",
        minWidth: 500,
        maxWidth: 1000,
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table sx={tableStyles} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Position (Last Values)</StyledTableCell>
                        <StyledTableCell align="right">{interestedStats[0].Country}</StyledTableCell>
                        <StyledTableCell align="right">{comparisonStats[0].Country}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {interestedStats.map((pos) => (
                        <MyTableRow
                            key={pos.Title}
                            pos={pos}
                            comparisonStats={comparisonStats}
                            showPosition={showPosition}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
