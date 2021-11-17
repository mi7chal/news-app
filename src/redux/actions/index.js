export const signOut = () => {
    return {
        type: "SIGN_OUT"
    };
};

export const signIn = () => {
    return {
        type: "SIGN_IN"
    };
};

export const notificationsPush = ({x, color}) => {
    return {
        type: "PUSH",
        item:x,
        color:color,
    };
};

export const notificationsSplice = (x) => {
    return {
        type: "SPLICE",
        index:x,
    };
};


export const notificationsClean = () => {
    return {
        type: "CLEAN",
    };
};
