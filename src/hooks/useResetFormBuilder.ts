import { useState } from 'react';

type resetResponse = {
    handleReset: () => void;
    resetToken: string | number;
};

const useResetFB = (): resetResponse => {
    const [resetToken, setResetToken] = useState(0);
    const handleReset = () => {
        setResetToken(Math.random);
    };
    return { handleReset, resetToken };
};

export default useResetFB;
