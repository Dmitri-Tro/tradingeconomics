import { FC } from "react";
import styles from "./Header.module.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "src/App/store.ts";


export const Header: FC = () => {
    const isLoading = useAppSelector((state) => state.app.status);

    return (
        <Box sx={{ width: "100%" }}>
            <div className={styles.header}>
                <span className={styles.logo}>TE-Stats</span>
            </div>
            {isLoading === "loading" && <LinearProgress />}
        </Box>
    );
};
