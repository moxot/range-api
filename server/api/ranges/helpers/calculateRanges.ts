type VehicleEvent = {
    id: number;
    timestamp: string;
    vehicleId: string;
    event: string;
};
type EventsRange = {
    from: number;
    to: number;
    event: string;
};

function createRange(from: number, to: number, event: string) {
    return { from, to, event };
}

function timestampToMillis(timestamp: string) {
    return new Date(timestamp).getTime();
}

export default function calculateRanges(
    beforeEvent: VehicleEvent,
    events: Array<VehicleEvent>,
    startDate: string,
    endDate: string,
) {
    const ranges = [];
    let currentRange: EventsRange = null;

    if (events.length === 0 && !beforeEvent) {
        ranges.push(
            createRange(
                timestampToMillis(startDate),
                timestampToMillis(endDate),
                beforeEvent ? beforeEvent.event : 'no_data',
            ),
        );
        return ranges;
    }
    if (!beforeEvent && events.length > 0) {
        ranges.push(
            createRange(
                timestampToMillis(startDate),
                timestampToMillis(events[0].timestamp),
                'no_data',
            ),
        );
    } else if (beforeEvent) {
        ranges.push(
            createRange(
                timestampToMillis(startDate),
                events.length > 0
                    ? timestampToMillis(events[0].timestamp)
                    : timestampToMillis(endDate),
                beforeEvent.event,
            ),
        );
    }

    events.forEach((event, i) => {
        if (!currentRange) {
            currentRange = createRange(
                timestampToMillis(event.timestamp),
                timestampToMillis(event.timestamp),
                event.event,
            );
        } else if (event.event !== currentRange.event) {
            currentRange.to = timestampToMillis(event.timestamp);
            ranges.push(currentRange);
            currentRange = createRange(
                timestampToMillis(event.timestamp),
                timestampToMillis(event.timestamp),
                event.event,
            );
        }

        if (i === events.length - 1) {
            currentRange.to = timestampToMillis(endDate);
            ranges.push(currentRange);
        }
    });

    if (!events.length && beforeEvent) {
        ranges[0].to = timestampToMillis(endDate);
    }

    return ranges;
}
