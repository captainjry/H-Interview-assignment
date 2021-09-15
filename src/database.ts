const data = [
  {
    assignedDoctor: "Strange",
    patientName: "John",
    vaccineType: "Sinowarp",
    vaccineAppointmentDate: "2021-08-05T14:30:00.000Z",
    vaccineStatus: "READY",
    vaccineTransactionStatus: "PAID",
  },
  {
    assignedDoctor: "Who",
    patientName: "Johny",
    vaccineType: "Sinowarp",
    vaccineAppointmentDate: "2021-08-06T14:30:00.000Z",
    vaccineStatus: "READY",
    vaccineTransactionStatus: "PAID",
  },
  {
    assignedDoctor: "Who",
    patientName: "Tuu",
    vaccineType: "Sinowarp",
    vaccineAppointmentDate: "",
    vaccineStatus: "READY",
    vaccineTransactionStatus: "WAIT_FOR_PAYMENT",
  },
  {
    assignedDoctor: "Who",
    patientName: "Lisa",
    vaccineType: "Noderna",
    vaccineAppointmentDate: "2021-12-10T14:30:00.000Z",
    vaccineStatus: "IN_TRANSIT",
    vaccineTransactionStatus: "PAID",
  },
  {
    assignedDoctor: "Strange",
    patientName: "Magna",
    vaccineType: "Noderna",
    vaccineAppointmentDate: "2021-12-10T15:30:00.000Z",
    vaccineStatus: "IN_TRANSIT",
    vaccineTransactionStatus: "WAIT_FOR_PAYMENT",
  },
];

export class Database {
  public static find(option: Record<string, any>) {
    let result: Record<string, any>[] = [];
    option.start = option.start ? new Date(option.start) : null;
    option.end = option.end ? new Date(option.end) : null;
    for (const row of data) {
      const vaccineAppointmentDate: Date = new Date(row.vaccineAppointmentDate);

      if (
        Object.entries(option).every(([key, value]) => {
          if (key !== "start" && key !== "end") {
            return row[key] === value;
          }
          return true;
        })
      ) {
        if (option.start && option.end) {
          const isInRange: Boolean =
            option.start < vaccineAppointmentDate &&
            option.end >= vaccineAppointmentDate;
          if (isInRange) {
            result.push(row);
          }
        } else {
          result.push(row);
        }
      }
    }

    return result;
  }
}
