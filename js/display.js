

const today=new Date();


const currentMonth=today.getMonth()+1
const currentDay=today.getDate();
const currentYear=today.getFullYear();



const daysPerMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

function calculateOutput(){
    const { month , day , year}=inputDate;
   
    yearOutput=currentYear-year;

if (currentMonth>=month){
   
    monthOuput=currentMonth-month;
}else{
    
    yearOutput--;
    monthOuput=currentMonth+12-month;
}

if (currentDay>=day){
   
    dayOutput=currentDay-day;

}else{
        
    dayOutput=daysPerMonth[currentMonth-1]+currentDay-day;

   
    if (monthOuput<0){
        monthOuput=11;
        yearOutput --;
     };
}
 return {
    years: yearOutput,
    months: monthOuput,
    days: dayOutput,
 };
}

function displayOutput(){
    const { years, months , days }=calculateOutput();
    
    animateValue('year-result', 0 , years, 1500);
    animateValue('month-result', 0 , months , (2600 / 13)* ( months+1));
    animateValue('day-result', 0 , days , (3100/31) * (days|| 1));
}

function animateValue(element, start , end , duration){
    const currentElement=document.getElementById(element);
    let startTimestamp=null;

    const step= (timestamp)=>{
        if (!startTimestamp) startTimestamp=timestamp;
        const progress=Math.min((timestamp-startTimestamp)/duration , 1);
        currentElement.innerHTML=Math.floor(progress * (end - start ) + start);
        if (progress<1){
            window.requestAnimationFrame(step);
        }

    };
    window.requestAnimationFrame(step);
}

