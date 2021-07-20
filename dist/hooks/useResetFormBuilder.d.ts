declare type resetResponse = {
    handleReset: () => void;
    resetToken: string | number;
};
declare const useResetFB: () => resetResponse;
export default useResetFB;
