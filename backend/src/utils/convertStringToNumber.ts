export default (hour: string) => {
    const [hours, minutes] = hour.split(":").map(Number)
    const newHour = (hours * 60) + minutes
    
    return newHour
}