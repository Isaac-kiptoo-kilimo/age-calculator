


let day_input=document.getElementById('day');
let month_input=document.getElementById('month');
let year_input=document.getElementById('year');

const btnCalc=document.getElementById('btn-calculate')


let monthInputValue= null;
let dayInputValue= null;
let yearInputValue= null;

let inputDate={
    fullDate: new Date(),
    month: null,
    day: null,
    year: null,

};

function calculateTimepassed(){
    clearErrors(['month','day','year']);
    validateInputDate();
}


function validateInputDate(){
    dayInputValue=+day_input.value;
    monthInputValue=+month_input.value;
    yearInputValue=+year_input.value;

    inputDate={
        fullDate: new Date(
            `${yearInputValue}, ${monthInputValue}, ${dayInputValue}`
        ),

        month: monthInputValue,
        day: dayInputValue,
        year: yearInputValue,
    };
    const {month, day , year}=inputDate

    
    let validMonth=true;
    let validDay=true;
    let validYear=true;

    
    (!(year % 4) && year % 100) || !(year % 400 )
    ? (daysPerMonth[1]=29)
    : (daysPerMonth[1]=28);

    // if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    //     daysPerMonth[1] = 29;
    // } else {
    //     daysPerMonth[1] = 28;
    // }
    

    
    if(!dayInputValue){
        validDay=false;
        showError('day-input-error', 'day-error', 'This field is required')
    }else if (
        day>daysPerMonth[month-1] ||
        day>31 || 
        day<1 ||
        (day> new Date().getDate() && month === new Date().getMonth()+1 && year=== new Date().getFullYear())
    ){
        validDay=false;
        showError('day-input-error', 'day-error' , 'Must be a valid day')
    }

    
    if(!monthInputValue){
        validMonth=false;
        showError('month-input-error', 'month-error', 'This field is required')
    }else if(
        (month>new Date().getMonth() + 1 && year === new Date().getFullYear()) ||
        month< 1 ||
        month > 12 ||
        (day> new Date().getDate() && 
        month === new Date().getMonth() + 1 && 
        year === new Date().getFullYear())
    ){
        validMonth=false;
        showError('month-input-error', 'month-error', 'Must be a valid Month')
    };

    

    if(!yearInputValue){
        validYear=false;
        showError('year-input-error', 'year-error', 'This field is required')
    }else if(year>new Date().getFullYear() || year< 1000){
        validYear=false;
        showError('year-input-error', 'year-error', 'Must be in the past')
    }

    if(validMonth && validDay && validYear){
        btnCalc.classList.add('slide-right');
        displayOutput();
    }else{
        btnCalc.classList.add('slide-left');
        return false
    }
}


month_input.addEventListener('input', function(){
    clearError('month');
});

day_input.addEventListener('input', function(){
    clearError('day');
});

year_input.addEventListener('input', function(){
    clearError('year');
});

function showError(errorElement, errorMessageElement, errorMessage){
document.getElementById(errorElement).classList.add('input-error');
document.getElementById(errorMessageElement).classList.add('display-error');
document.getElementById(errorMessageElement).innerHTML=errorMessage;
}

function clearErrors(fields){
    fields.forEach((field) => clearError(field));
}

function clearError(field){
    btnCalc.classList.remove('slide-right');
    btnCalc.classList.remove('slide-left');
    document.getElementById(`${field}-result`).innerHTML='--';
    document.getElementById(`${field}-input-error`).classList.remove('input-error');
    document.getElementById(`${field}-error`).classList.remove('display-error');
}

