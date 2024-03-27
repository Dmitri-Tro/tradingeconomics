import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page404.module.css";
import { Button } from "src/components/Button/Button.tsx";


export const Page404: FC = () => {
    const navigate = useNavigate();
    const onBackToMainClick = useCallback(() => {
        navigate("/");
    }, [navigate]);
    return (
        <div className={styles.wrapper}>
            <h1>404: PAGE NOT FOUND</h1>
            <Button title={"Back to main page"} onClickHandler={onBackToMainClick} classes={styles.backToMainBtn} />
        </div>
    );
};
