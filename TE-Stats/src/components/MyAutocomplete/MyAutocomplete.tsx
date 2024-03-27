import { FC, memo, SyntheticEvent, useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export type MyAutocompleteProps = {
    title: string;
    options: string[];
    selectedValue: string | null;
    setSelectedValue: (value: string | null) => void;
};

export const MyAutocomplete: FC<MyAutocompleteProps> = memo(({ title, options, selectedValue, setSelectedValue }) => {
    const [inputValue, setInputValue] = useState("");

    const onSelect = useCallback(
        (_event: SyntheticEvent<Element, Event>, newValue: string | null) => {
            setSelectedValue(newValue);
        },
        [setSelectedValue],
    );

    const onInputChangeHandler = useCallback((_event: SyntheticEvent<Element, Event>, newInputValue: string) => {
        setInputValue(newInputValue);
    }, []);

    return (
        <Autocomplete
            value={selectedValue}
            onChange={onSelect}
            inputValue={inputValue}
            onInputChange={onInputChangeHandler}
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={title} />}
        />
    );
});
