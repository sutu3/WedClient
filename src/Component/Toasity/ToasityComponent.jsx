import { toast } from "react-toastify";
export const StatusEnum = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',

});
export const toasityComponent = (Message, status) => {
    switch (status) {
        case StatusEnum.SUCCESS:
            return toast.success(Message, {
                position: "top-center",
            });
        case StatusEnum.ERROR:
            return toast.error(Message, {
                position: "top-center",
            });
        case StatusEnum.WARNING:
            return toast.warning(Message, {
                position: "top-center",
            });
        case StatusEnum.INFO:
            return toast.info(Message, {
                position: "top-center",
            });
        default:
            return toast.loading(Message, {
                position: "top-center",
            });
    }
};
