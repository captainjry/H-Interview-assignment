import request from "supertest";
import { app } from "../src/app";

describe("Post Endpoints", () => {
  test("should create a new post", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello World!");
  });

  test("Find Doctor Strange record", async () => {
    const res = await request(app).get("/vaccine?doctor=Strange");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([
      {
        assignedDoctor: "Strange",
        patientName: "John",
        vaccineType: "Sinowarp",
        vaccineAppointmentDate: "2021-08-05T14:30:00.000Z",
        vaccineStatus: "READY",
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
    ]);
  });

  test("Return 404 when not found", async () => {
    const res = await request(app).get("/vaccine?doctor=Doom");
    expect(res.statusCode).toEqual(404);
  });

  test("Find Doctor Strange ready patient", async () => {
    const res = await request(app).get(
      "/vaccine?doctor=Strange&vaccineStatus=READY&vaccineTransactionStatus=PAID"
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([
      {
        assignedDoctor: "Strange",
        patientName: "John",
        vaccineType: "Sinowarp",
        vaccineAppointmentDate: "2021-08-05T14:30:00.000Z",
        vaccineStatus: "READY",
        vaccineTransactionStatus: "PAID",
      },
    ]);
  });

  test("Find Unpaid of ready vaccine", async () => {
    const res = await request(app).get(
      "/vaccine?vaccineStatus=READY&vaccineTransactionStatus=WAIT_FOR_PAYMENT"
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([
      {
        assignedDoctor: "Who",
        patientName: "Tuu",
        vaccineType: "Sinowarp",
        vaccineAppointmentDate: "",
        vaccineStatus: "READY",
        vaccineTransactionStatus: "WAIT_FOR_PAYMENT",
      },
    ]);
  });

  test("Find Lisa with Date Range", async () => {
    const res = await request(app).get(
      "/vaccine?start=2021-12-9&end=2021-12-11&patientName=Lisa"
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([
      {
        assignedDoctor: "Who",
        patientName: "Lisa",
        vaccineType: "Noderna",
        vaccineAppointmentDate: "2021-12-10T14:30:00.000Z",
        vaccineStatus: "IN_TRANSIT",
        vaccineTransactionStatus: "PAID",
      },
    ]);
  });

  test("Find 9-11 Date Range", async () => {
    const res = await request(app).get(
      "/vaccine?start=2021-12-9&end=2021-12-11"
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([
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
    ]);
  });

  test("Find Not in Date Range", async () => {
    const res = await request(app).get(
      "/vaccine?start=2021-12-20&end=2021-12-25"
    );
    expect(res.statusCode).toEqual(404);
  });

  test("Find Not in Date Range with other fields", async () => {
    const res = await request(app).get(
      "/vaccine?doctor=Strange&start=2021-12-20&end=2021-12-25"
    );
    expect(res.statusCode).toEqual(404);
  });
});
