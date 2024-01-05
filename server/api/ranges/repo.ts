import { pool } from '../../db';

export async function getBeforeEvent(vehicleId: string, startDate: string) {
    const query = `
        SELECT *
        FROM vehicle_events
        WHERE timestamp < $2
        AND vehicleid = $1
        ORDER BY timestamp DESC
        LIMIT 1`;
    const {
        rows: [beforeEvent],
    } = await pool.query(query, [vehicleId, startDate]);
    return beforeEvent;
}

export async function getEventRanges(vehicleId: string, startDate: string, endDate: string) {
    const rangesQuery = `
        SELECT * FROM vehicle_events 
        WHERE vehicleid = $1 AND timestamp BETWEEN $2 AND $3
    `;
    const { rows } = await pool.query(rangesQuery, [vehicleId, startDate, endDate]);
    return rows;
}
