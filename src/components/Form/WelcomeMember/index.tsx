import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { SubmitHandler, useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { useApp } from '../../../context/App';
import { WelcomeModuleType } from '../../../services/discord/modules/modules.types';
import FormElements from './Form';

const FORM_ELEMENT_ID = 'welcome-member-form';

export interface FormRefs {
    submit: () => void;
}

interface WelcomeMemberFormProps {
    onSubmitEnd?: () => void;
    onChangeFields?: (formData: WelcomeModuleType) => void;
    initialDataForm?: WelcomeModuleType;
}

const WelcomeMemberForm: ForwardRefRenderFunction<FormRefs, WelcomeMemberFormProps> = ({ onSubmitEnd, onChangeFields, ...props }, ref) => {
    const { locale } = useApp();
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const { watch, register, formState, setValue, getValues, handleSubmit, control } = useForm<WelcomeModuleType>({
        mode: 'all',
        defaultValues: props.initialDataForm
    });

    const { } = useFieldArray({
        control,
        name: 'messageEmbed.fields',
        rules: {
            // Remember to add in mongoose limit of 5 fields saved https://stackoverflow.com/questions/28514790/how-to-set-limit-for-array-size-in-mongoose-schema
            maxLength: 5
        }
    });

    useImperativeHandle(ref, () => ({
        submit: () => submitButtonRef.current?.click(),
    }));

    const onSubmit: SubmitHandler<WelcomeModuleType> = async (welcomeModuleFormData, e) => {
        console.log(welcomeModuleFormData);
        onSubmitEnd?.();
    }

    const onChange = useCallback(() => {
        onChangeFields?.(getValues());
    }, [onChangeFields, getValues])

    useEffect(() => { onChange() }, [onChange]);

    return (
        <form id={FORM_ELEMENT_ID} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
            <FormElements
                getValue={getValues}
                control={control}
                {...{ locale, register, formState, setValue, watch, }}
            />
            <button ref={submitButtonRef} type='submit' style={{ display: 'none' }}>Enviar</button>
        </form>
    );
}

export default forwardRef(WelcomeMemberForm);