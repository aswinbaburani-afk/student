const express = require('express');
const router = express.Router();

// Simple in-memory store for demo
let guests = [
  { id: 1, name: 'keerthana', event_name: 'Conference', hall_no: '01' },
  { id: 2, name: 'akhil', event_name: 'birthday party', hall_no: '02' }
];
let nextId = 3;

const idFrom = req => Number(req.params.id);
const validGuest = g => g && g.name && g.event_name && g.hall_no;

router.get('/', (req, res) => res.json(guests));

router.get('/:id', (req, res) => {
  const guest = guests.find(g => g.id === idFrom(req));
  if (!guest) return res.status(404).json({ error: 'Guest not found' });
  res.json(guest);
});

router.post('/', (req, res) => {
  const { name, event_name, hall_no } = req.body || {};
  if (!name || !event_name || !hall_no) return res.status(400).json({ error: 'Invalid guest data' });
  const g = { id: nextId++, name, event_name, hall_no };
  guests.push(g);
  res.status(201).json(g);
});

router.put('/:id', (req, res) => {
  const id = idFrom(req);
  const idx = guests.findIndex(g => g.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Guest not found' });
  const { name, event_name, hall_no } = req.body || {};
  if (!name || !event_name || !hall_no) return res.status(400).json({ error: 'Invalid guest data' });
  guests[idx] = { id, name, event_name, hall_no };
  res.json(guests[idx]);
});

router.delete('/:id', (req, res) => {
  const id = idFrom(req);
  const idx = guests.findIndex(g => g.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Guest not found' });
  res.json(guests.splice(idx, 1)[0]);
});

module.exports = router;