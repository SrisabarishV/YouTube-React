export const API_KEY = 'AIzaSyDWkZUXgw5I78TTI3uJCPv_W2bPXmsnnJ8';

export const valueconverter = (value) => {
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + 'M';
    } else if (value >= 1000) {
        return Math.floor(value / 1000) + 'K';
    } else {
        return value;
    }   
};

