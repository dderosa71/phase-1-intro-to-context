// Your code here
function createEmployeeRecord(empData){
    return {
        firstName: empData[0], 
        familyName: empData[1], 
        title: empData[2], 
        payPerHour: empData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayofArrays){
    return arrayofArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(object, timeInEvent){
    const type = 'TimeIn';
    let [date, hourText] = timeInEvent.split(" ")
    const hour = parseInt(hourText);
    object.timeInEvents.push({type, date, hour});
    return object
}
function createTimeOutEvent(object, timeOutEvent){
    const type = 'TimeOut';
    let [date, hourText] = timeOutEvent.split(" ")
    const hour = parseInt(hourText);
    object.timeOutEvents.push({type, date, hour});
    return object
}

function hoursWorkedOnDate(object, date){
    const timeIn = object.timeInEvents.filter(timeinEvents => timeinEvents.date === date)
    const timeOut = object.timeOutEvents.filter(timeoutEvents => timeoutEvents.date === date)
    return (parseInt(timeOut[0].hour)-parseInt(timeIn[0].hour))/100
}

function wagesEarnedOnDate(object, date){
    return hoursWorkedOnDate(object, date) * object.payPerHour
}

function allWagesFor(object){
    let allHours = object.timeInEvents.reduce((sum, event) => sum + hoursWorkedOnDate(object, event.date),0)
    return allHours * object.payPerHour
}

function calculatePayroll(arrayOfEmployees){
    return arrayOfEmployees.reduce((sum, employee) => sum + allWagesFor(employee),0)
}