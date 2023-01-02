import { useState } from "react";
import {
    addHours,
    addYears,
    differenceInSeconds,
    setHours,
    setMinutes,
} from "date-fns";


export const useModal = () => {

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const [formValues, setFormValues] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const difference = differenceInSeconds(formValues.end, formValues.start);

    const minTime = () => {
        setHours(
            setMinutes(new Date(), formValues.start.getMinutes()),
            formValues.start.getHours()
        )
    }

    const maxTime = () => {
        setHours(setMinutes(addYears(new Date(), 1000), 30), 23)
    }

    return {
        //Propiedades
        customStyles,
        formValues,
        setFormValues,
        difference,

        //Métodos
        minTime,
        maxTime
    }
}