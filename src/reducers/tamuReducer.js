import { 
    TAMBAH_TAMU_SUKSES, 
    SYSTEM_ERROR,
    LOADING } from '../actions/types';

const INITIAL_STATE = {
    id: "",
    nama: "",
    genderSelect: "",
    alamat: "",
    email: "",
    pesan: "",
    loading: false,
    error: "",
    status: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case LOADING: 
            return { ...state, loading: true}
        case SYSTEM_ERROR:
            return {...INITIAL_STATE, error: action.payload}
        case TAMBAH_TAMU_SUKSES:
            return {...INITIAL_STATE, status: action.payload}
        default:
            return state;
    }
}