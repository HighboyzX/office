import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import Axios from 'axios';
import Moment from 'moment';

import { Config } from './Config';
import { _msg } from '../messages/MsgTh';

// Authentication
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
}

// Alert
export const showAlert = (msg, mode, callback) => {
    let params = {
        title: '',
        html: msg,
        icon: mode,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: "#0069d9"
    };

    MySwal.fire(params).then((result) => {
        if (result.value === true) {
            if (typeof callback == 'function') {
                callback();
            }
        }
    })

}
export const showImageAlert = (url, alt) => {
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-close-button {
            position: absolute;
            top: -8px;
            right: -14px;
            background: transparent;
            cursor: pointer;
        }
        .custom-close-button:focus {
            box-shadow: none;
        }
        `;
    document.head.appendChild(style);
    MySwal.fire({
        imageUrl: url || '',
        imageAlt: alt || '',
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            closeButton: 'custom-close-button'
        },
        background: 'rgba(0,0,0,0.0)'
    });
}
export const showConfirm = async (message) => {
    const result = await MySwal.fire({
        title: '',
        html: message || 'คุณจะไม่สามารถเปลี่ยนกลับสิ่งนี้ได้',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: "#0069d9",
        cancelButtonText: 'ยกเลิก',
    })

    return result.isConfirmed
}
// Modal
export const hideModal = (selector) => {
    const modal = document.querySelector(selector)
    if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal)
        if (modalInstance) {
            modalInstance.hide()
        } else {
            console.error(`No modal instance found for selector: ${selector}`)
        }
    } else {
        console.error(`No element found for selector: ${selector}`)
    }
}
export const showModal = (selector) => {
    const modal = new window.bootstrap.Modal(document.querySelector(selector));
    modal.show();
}
export const closeModal = (selector) => {
    document.querySelector(selector).click();
}
// Page
export const reload = () => {
    window.location.reload();
}

// Axios method
export const axiosGET = async (path, headers) => {
    const response = await Axios.get(`${Config.localhost}${path}`, headers);
    return response.data;
}
export const axiosPOST = async (path, headers, data) => {
    const response = await Axios.post(`${Config.localhost}${path}`, data, headers);
    return response.data
}
export const axiosPUT = async (path, headers, data) => {
    const response = await Axios.put(`${Config.localhost}${path}`, data, headers);
    return response.data
}
export const axiosDELETE = async (path, headers) => {
    const response = await Axios.delete(`${Config.localhost}${path}`, headers);
    return response.data
}

// Request
export const getInfo = () => {
    const info = {
        user_id: parseInt(localStorage.getItem('user_id')),
        user_type_id: parseInt(localStorage.getItem('user_type_id')),
        username: localStorage.getItem('username'),
        name: localStorage.getItem('name'),
        profile_pic: localStorage.getItem('profile_pic'),
    };

    return info;
}
export const setLocal = (data) => {
    const userDetail = data.auth;

    localStorage.setItem('token', data.token);

    for (const key in userDetail) {
        localStorage.setItem(key, userDetail[key]);
    }
}

// Image
export const setImageToTable = (group, image) => {
    const imageUrl = `${Config.localhost}/image/${group}/${image}`;
    const notFoundUrl = `${Config.localhost}/image/notfound.jpg`;

    const handleError = (e) => {
        e.target.onerror = null;
        e.target.src = notFoundUrl;
    };

    if (image != null && image != '') {
        return (
            <img
                className="img-fluid"
                src={imageUrl}
                style={{
                    maxWidth: 60,
                    maxHeight: 60,
                    width: 'auto',
                    height: 'auto'
                }}
                onError={handleError}
                onClick={() => { showImageAlert(imageUrl, image) }}
            />
        );
    } else {
        return (
            <img
                className="img-fluid"
                src={notFoundUrl}
                style={{
                    maxWidth: 60,
                    maxHeight: 60,
                    width: 'auto',
                    height: 'auto'
                }}
            />
        );
    }
};

export const setImageToModal = (group, image) => {
    const imageUrl = `${Config.localhost}/image/${group}/${image}`;
    const notFoundUrl = `${Config.localhost}/image/notfound.jpg`;
    const handleError = (e) => {
        e.target.onerror = null;
        e.target.src = notFoundUrl;
    };

    if (image != null && image != '') {
        return (
            <img
                className="img-thumbnail"
                src={imageUrl}
                style={{
                    maxHeight: 200,
                    width: 'auto',
                    height: 'auto'
                }}
                onError={handleError}
                onClick={() => { showImageAlert(imageUrl, image) }}
            />
        );
    } else {
        return (
            <img
                className="img-thumbnail"
                src={notFoundUrl}
                style={{
                    maxHeight: 200,
                    width: 'auto',
                    height: 'auto'
                }}
            />
        );
    }
};

export const setImageLogo = (group, image) => {
    const imageUrl = `${Config.localhost}/image/${group}/${image}`;
    const notFoundUrl = `${Config.localhost}/image/notfound.jpg`;

    if (image != null && image != '') {
        return (
            <img
                className="brand-image img-circle mr-2"
                src={imageUrl}
                style={{
                    width: 33,
                    height: 33
                }}
            />
        );
    } else {
        return (
            <img
                className="brand-image img-circle mr-2"
                src={notFoundUrl}
                style={{
                    width: 33,
                    height: 33
                }}
            />
        );
    }
};

// File upload
export const handleFileInputChange = (setter) => (event) => {
    const file = event.target.files[0];
    if (file) {
        setter(file);
    }
};
export const resetFileInput = async (fileInput) => {
    if (fileInput.value) {
        fileInput.value = ''; // Clear the file input
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event); // Trigger change event
    }
}

// Datatables
export const setDataTables = (selector) => {
    if (!$.fn.DataTable.isDataTable(selector)) {
        $(selector).DataTable({
            "scrollX": true,
            "autoWidth": true,
            dom: '<"top"lBf>rt<"bottom"ip><"clear">',
            buttons: {
                dom: {
                    button: {
                        className: 'btn btn-sm btn-info' // ปรับแต่ง class ของปุ่ม
                    }
                },
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: 'Data export excel',
                        text: 'Excel'
                    },
                    {
                        extend: 'pdfHtml5',
                        title: 'Data export pdf',
                        text: 'PDF'
                    },
                    {
                        extend: 'print',
                        text: 'Print'
                    }
                ]
            },
            language: {
                search: '<span>'+_msg.title_search+' : </span> _INPUT_'
                ,lengthMenu: '<span>'+_msg.title_show+' : _MENU_  '+_msg.title_entries+'</span> '
                ,paginate: { 'first': _msg.title_page_first, 'last': _msg.title_page_last, 'next': _msg.title_next, 'previous': _msg.title_previous }
                ,emptyTable:   _msg.title_no_data
                ,info: _msg.title_showing + ' _START_ ' +_msg.title_to + ' _END_ ' +_msg.title_from_2 + ' _TOTAL_ ' +_msg.title_entries
                ,infoEmpty: _msg.title_showing + ' 0 ' +_msg.title_to + ' 0 ' +_msg.title_from_2 + ' 0 ' +_msg.title_entries
                ,loadingRecords: _msg.loading
                ,zeroRecords: _msg.title_data_not_found
                ,infoFiltered : '( '+_msg.title_search+_msg.title_from_2+_msg.title_all+' _MAX_ '+_msg.title_entries+' )'
            },
            lengthMenu: [ [3,10, 25, 50, 100, 200, 500, -1], [3,10, 25, 50, 100, 200, 500, _msg.title_all] ],
            pageLength : 10
        });
    }
}

// Format Data
export const setDateTimeFormat = (value) => {
    return !value ? '' : Moment(value).format('DD/MM/YYYY HH:mm:ss');
}
export const setDateFormat = (value) => {
    return !value ? '' : Moment(value).format('DD/MM/YYYY');
}
export const setDateFormatInput = (value) => {
    return !value ? '' : Moment(value).format('YYYY-MM-DD');
}
export const setStatus = (status) => {
    switch (status) {
        case 0:
            return <span className="badge-custome badge-dark-light">{_msg.status_disable}</span>;
        case 1:
            return <span className="badge-custome badge-success-light">{_msg.status_enable}</span>;
        default:
            return '';
    }
}
export const setGender = (genderId) => {
    switch (genderId) {
        case 1:
            return _msg.gender_male
        case 2:
            return _msg.gender_female
        default:
            return '';
    }
}
