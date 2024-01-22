import eyeIcon from '../assets/imgs/eye.svg'
import eyeOffIcon from '../assets/imgs/eye-off.svg'

export const togglePassword = (item)=> {
    const passwordInput = item.parentElement.querySelector('input')
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        item.src = eyeOffIcon
    } else {
        passwordInput.type = 'password';
        item.src = eyeIcon
    }
}


export  const formatBytes = (bytes) => {
    if(!+bytes) return '0 Bytes'

    const k = 1024
    const sizes = ['bytes','kb','mb','gb','tb','pb','eb','zb','yb']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k,i)).toFixed(0))}${sizes[i]}`
}


export  const btnAnimation = (form) => {
    const btnAnimationEl = form.querySelector("[type='submit'] img")
    btnAnimationEl.style = `
        transition: 1s;
        top:-300px;
        right: -300px;  
        width: 35px;
        height: 35px;`
    setTimeout(()=> btnAnimationEl.style = `
        top: 13px; 
        right: 13px;
        width: 27px;
        height: 27px;`,500)
}

export const converterTime = (originalTime) => {
    const date = new Date(originalTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedTime
}

let currentDate 

export const getDateMessages = (createdAt) => {

    const messageDate = new Date(createdAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let formattedDate;

    if (
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear()
    ) {
        formattedDate = "Сегодня";
    } else if (
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()
    ) {
        formattedDate = "Вчера";
    } else {
        const day = messageDate.getDate().toString().padStart(2, "0");
        const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
        const year = messageDate.getFullYear();

        formattedDate = `${day}.${month}.${year}`;
    }
   
    return formattedDate
}