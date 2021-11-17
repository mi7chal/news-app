const notifications = (state = [], action) => {
    switch (action.type) {
        case 'PUSH':
            return state.concat({ x: action.item, color: action.color });

        case 'SPLICE': {
            delete state[action.index];
            return state;
        }


        case 'CLEAN':
            return [];

        default:
            return state;
    }
}



export default notifications;