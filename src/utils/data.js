import { nanoid } from 'nanoid'
import ac_1 from '../assets/ac-1.webp'
import ac_2 from '../assets/ac-2.webp'
import ac_3 from '../assets/ac-3.webp'
import ac_4 from '../assets/ac-4.webp'
import ac_5 from '../assets/ac-5.webp'
import ac_6 from '../assets/ac-6.webp'
import ac_7 from '../assets/ac-7.webp'
import ac_8 from '../assets/ac-8.webp'
import ac_9 from '../assets/ac-9.webp'


export const rooms = [
    {
        id: nanoid(),
        img: ac_1,
        title: 'Lekki, Lagos',
        ratings: 5,
        roomType: 'Standard',
        price: 20000,
        vat: 2000
    },
    {
        id: nanoid(),
        img: ac_2,
        title: 'PH, Rivers',
        ratings: 4,
        roomType: 'Deluxe',
        price: 15000,
        vat: 1000
    },
    {
        id: nanoid(),
        img: ac_3,
        title: 'Ikeja, Lagos',
        ratings: 3,
        roomType: 'Suite',
        price: 10000,
        vat: 500
    },
    {
        id: nanoid(),
        img: ac_4,
        title: 'Asa, Abia',
        ratings: 3,
        roomType: 'Suite',
        price: 7000,
        vat: 500
    },
    {
        id: nanoid(),
        img: ac_5,
        title: 'Oka, Anambra',
        ratings: 5,
        roomType: 'Standard',
        price: 23000,
        vat: 1500
    },
    {
        id: nanoid(),
        img: ac_6,
        title: 'Owerri, Imo',
        ratings: 4,
        roomType: 'Deluxe',
        price: 11000,
        vat: 1000
    },
    {
        id: nanoid(),
        img: ac_7,
        title: 'Benin, Edo',
        ratings: 4,
        roomType: 'Suite',
        price: 6000,
        vat: 400
    },
    {
        id: nanoid(),
        img: ac_8,
        title: 'Akure, Ondo',
        ratings: 5,
        roomType: 'Standard',
        price: 20000,
        vat: 2500
    },
    {
        id: nanoid(),
        img: ac_9,
        title: 'Uyo, Akwa Ibom',
        ratings: 4,
        roomType: 'Deluxe',
        price: 14000,
        vat: 1200
    },
]