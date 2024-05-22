import type { Control, FieldValues, FormState, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { Locale } from "../../locale/index.type";

export interface FormProps<F extends FieldValues> {
    formState: FormState<F>;
    register: UseFormRegister<F>;
    watch: UseFormWatch<F>;
    setValue: UseFormSetValue<F>;
    getValue?: UseFormGetValues<F>;
    locale: Locale;
    control?: Control<F, any>;
}