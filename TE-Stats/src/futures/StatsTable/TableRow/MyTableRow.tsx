import { FC, memo, useCallback } from "react";
import styles from "src/futures/StatsTable/TableRow/MyTableRow.module.css";
import { SelectedStats } from "src/types/types.ts";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "src/futures/StatsTable/StatsTable.tsx";

const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#d1e3f6",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

type TableRowProps = {
    pos: SelectedStats;
    comparisonStats: SelectedStats[];
    showPosition: (category: string) => void;
};
export const MyTableRow: FC<TableRowProps> = memo(({ pos, comparisonStats, showPosition }) => {
    const comparisonStatsPos = comparisonStats.find((s) => s.Category === pos.Category);
    const interestedPosValue = new Intl.NumberFormat("en-US").format(pos.LatestValue);
    const comparisonPosValue = comparisonStatsPos
        ? new Intl.NumberFormat("en-US").format(comparisonStatsPos.LatestValue)
        : "-";
    const onPosClick = useCallback(() => showPosition(pos.Category), [showPosition, pos.Category]);

    return (
        <StyledTableRow className={styles.container} onClick={onPosClick}>
            <StyledTableCell component="th" scope="row">
                <b>{pos.Category}</b> (in {pos.Unit})
            </StyledTableCell>
            <StyledTableCell align="right">{interestedPosValue}</StyledTableCell>
            <StyledTableCell align="right">{comparisonPosValue}</StyledTableCell>
        </StyledTableRow>
    );
});
