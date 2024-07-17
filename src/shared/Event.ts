import moment from 'moment'

export interface EventDetails {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    location: string;
    type: "Apple" | "Google";
}

export function generateEventQRCode(event: EventDetails): string {
  if(event.type === "Google") {
    return generateGoogleEventQRCode(event)
  }else{
    return generateAppleEventQRCode(event)
  }
}

function generateGoogleEventQRCode(event: EventDetails): string {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
}

function generateAppleEventQRCode(event: EventDetails): string {
  const startDate = moment(event.startDate).format("YYYYMMDDTHHmmssZ")
  const endDate = moment(event.endDate).format("YYYYMMDDTHHmmssZ")

  return `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${startDate}
DTEND:${endDate}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR
  `;
}
