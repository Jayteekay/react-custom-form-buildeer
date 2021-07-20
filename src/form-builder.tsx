import React, { FormEvent, useEffect, useState } from 'react';
import FBInput from './subcomponents/FBInput';
import FBSelect from './subcomponents/FBSelect/fb-select';
import FBTextArea from './subcomponents/FBTextArea/fb-text-area';
import {
    FBConfigElement,
    FBElement,
    FBElementTypes,
    IFBInput,
    FBProps,
    IFBSelect,
    IFBTextArea,
} from './types';

const FB = ({
    children,
    formElements,
    initialData,
    resetToken,
    onDataChange,
    onSubmit,
    containerStyle,
    containerClass,
    elementStyle,
    ...formProps
}: FBProps): JSX.Element => {
    const [fbData, setFbData] = useState<Record<string, unknown>>({});
    const updateData = (name: string, value: unknown) => {
        setFbData((oldData) => ({ ...oldData, [name]: value }));
    };
    const refreshData = () => {
        if (initialData) {
            setFbData(initialData);
        } else {
            setFbData({});
        }
    };
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(e);
    };
    useEffect(() => {
        if ((Object.keys(fbData).length as number) > 0) onDataChange(fbData);
    }, [fbData]);
    useEffect(refreshData, [resetToken]);
    const renderFormElement = (configElement: FBConfigElement) => {
        if (!configElement) {
            return;
        }
        if (React.isValidElement(configElement)) {
            return configElement;
        }
        if (configElement instanceof Function) {
            return configElement((overrideData) => setFbData((fbData) => ({ ...fbData, ...overrideData })), fbData);
        }
        const { element, name, ...properties } = configElement as FBElement;
        switch (element) {
            case FBElementTypes.Input:
                return (
                    <FBInput
                        {...(properties as IFBInput)}
                        containerStyle={containerStyle}
                        containerClass={containerClass}
                        elementStyle={elementStyle}
                        onUpdate={updateData}
                        key={element + name}
                        name={name}
                        value={(fbData[name] as string) || ''}
                    />
                );
            case FBElementTypes.Select:
                return (
                    <FBSelect
                        {...(properties as IFBSelect)}
                        containerStyle={containerStyle}
                        containerClass={containerClass}
                        elementStyle={elementStyle}
                        onUpdate={updateData}
                        key={element + name}
                        name={name}
                        value={(fbData[name] as string) || ''}
                    />
                );
            case FBElementTypes.TextArea:
                return (
                    <FBTextArea
                        {...(properties as IFBTextArea)}
                        containerStyle={containerStyle}
                        containerClass={containerClass}
                        elementStyle={elementStyle}
                        onUpdate={updateData}
                        key={element + name}
                        name={name}
                        value={(fbData[name] as string) || ''}
                    />
                );
        }
    };
    return (
        <form role="form" onSubmit={handleFormSubmit} {...formProps}>
            {formElements.map((el) => renderFormElement(el))}
            {children}
        </form>
    );
};

export default FB;
