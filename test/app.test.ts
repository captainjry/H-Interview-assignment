import request from 'supertest';
import { app } from '../src/app';


describe('Post Endpoints', () => {
    test('should create a new post', async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello World!');
    });

    test('Find Doctor Strange record', async () => {
        const res = await request(app).get('/vaccine?doctor=Strange');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual([
            {
                assignedDoctor: 'Strange',
                patientName: 'John',
                vaccineType: 'Sinowarp',
                vaccineAppointmentDate: '',
                vaccineStatus: 'READY',
                vaccineTransactionStatus: 'PAID',
            },
            {
                assignedDoctor: 'Strange',
                patientName: 'Magna',
                vaccineType: 'Noderna',
                vaccineAppointmentDate: '',
                vaccineStatus: 'IN_TRANSIT',
                vaccineTransactionStatus: 'WAIT_FOR_PAYMENT',
            },
        ]);
    });

    test('Return 404 when not found', async () => {
        const res = await request(app).get('/vaccine?doctor=Doom');
        expect(res.statusCode).toEqual(404);
    });

    test('Find Doctor Strange ready patient', async () => {
        const res = await request(app).get('/vaccine?doctor=Strange&vaccineStatus=READY&vaccineTransactionStatus=PAID');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual([
            {
                assignedDoctor: 'Strange',
                patientName: 'John',
                vaccineType: 'Sinowarp',
                vaccineAppointmentDate: '',
                vaccineStatus: 'READY',
                vaccineTransactionStatus: 'PAID',
            }
        ]);
    });

    test('Find Unpaid of ready vaccine', async () => {
        const res = await request(app).get('/vaccine?vaccineStatus=READY&vaccineTransactionStatus=WAIT_FOR_PAYMENT');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual([
            {
                assignedDoctor: 'Who',
                patientName: 'Tuu',
                vaccineType: 'Sinowarp',
                vaccineAppointmentDate: '',
                vaccineStatus: 'READY',
                vaccineTransactionStatus: 'WAIT_FOR_PAYMENT',
            }
        ]);
    });
});
