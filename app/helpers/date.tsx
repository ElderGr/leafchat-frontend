export function calculateTimeAgo(date: string) {
    const publicationDate: any = new Date(date);
    const currentDate: any = new Date();
  
    const timeDifferenceInMilliseconds  = currentDate - publicationDate;
    const seconds = Math.floor(timeDifferenceInMilliseconds  / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Assuming an average of 30 days per month
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `há ${years} ano${years !== 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `há ${months} mês${months !== 1 ? 'es' : ''}`;
    } else if (days > 0) {
      return `há ${days} dia${days !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `há ${hours} hora${hours !== 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `há ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else {
      return `há ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    }
}