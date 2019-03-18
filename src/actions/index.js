import axios from 'axios';
import { LOADING, SYSTEM_ERROR, TAMBAH_TAMU_SUKSES  } from './types';

export const tambahTamu = ({nama, genderSelect, email, alamat, pesan}) => {
    return dispatch => {
        dispatch({type: LOADING});
        console.log('masuk action')
        if(nama === "" || genderSelect === "" || alamat === ""  || pesan === ""){
            dispatch({
                type: SYSTEM_ERROR,
                payload: "Lengkapi masing2 Form"
            })
        } else {
            axios.post('http://localhost:1990/api/add_guest', {
                nama, genderSelect, email, alamat, pesan
            }).then(res => {
                console.log(res)
                dispatch({
                    type: TAMBAH_TAMU_SUKSES,
                    payload: "Data Anda masuk di Sistem"
                })
            }).catch(err => {
                console.log(err);
                console.log("gagal tambah tamu");
                dispatch({type: SYSTEM_ERROR, payload: "System Error"})
            })
        }
    }
}
